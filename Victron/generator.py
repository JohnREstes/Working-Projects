import requests
import json
import asyncio
import atexit
import RPi.GPIO as GPIO


PROPANE_PIN = 17
START_PIN = 27
RUNNING_PIN = 23
SS_RELAY = 22
DATA_URL = "https://node.dondeestasyolanda.com/api/victron/data"
STATUS_URL = "https://node.dondeestasyolanda.com/api/generator/status"
SLEEP_DURATION = 90
GENERATOR_RUNTIME = 1800  # 60 sec x 30 min

# Set GPIO numbering mode and disable warnings
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# Setup GPIO pins
GPIO.setup(RUNNING_PIN, GPIO.IN)
GPIO.setup(START_PIN, GPIO.OUT)
GPIO.setup(PROPANE_PIN, GPIO.OUT)
GPIO.setup(SS_RELAY, GPIO.OUT)

# Set default pin state

GPIO.output(PROPANE_PIN, GPIO.LOW)
GPIO.output(START_PIN, GPIO.LOW)
GPIO.output(SS_RELAY, GPIO.LOW)

generatorRunning = False
requestToRun = False


async def start_generator():
    try:
        await toggle_gas_valve("open")
        for i in range(5):
            GPIO.output(START_PIN, GPIO.HIGH)
            print("Attempting to start")
            await asyncio.sleep(5)
            GPIO.output(START_PIN, GPIO.LOW)
            print("Pausing Start")
            await asyncio.sleep(5)

            if generatorRunning:
                await toggle_SS_relays("on")
                break
            if i == 4:
                print("DID NOT START, ERROR")
                await stop_generator()
                break

    except asyncio.CancelledError:
        pass
    except Exception as error:
        print("Error:", error)


async def check_generator_running():
    try:
        global generatorRunning  # Use the global variable
        previous_state = generatorRunning

        while True:
            voltage_state = GPIO.input(RUNNING_PIN)
            generatorRunning = voltage_state == GPIO.HIGH

            print(generatorRunning)

            if previous_state and not generatorRunning:
                # Change from True to False detected
                await stop_generator()

            await asyncio.sleep(2.5)
            previous_state = generatorRunning

    except KeyboardInterrupt:
        GPIO.cleanup()


async def stop_generator():
    print("Generator stopped. Performing safety check functions.")
    await toggle_gas_valve("close")
    await toggle_SS_relays("off")


async def toggle_gas_valve(state):
    try:
        if state == "open":
            GPIO.output(PROPANE_PIN, GPIO.HIGH)
            print("Propane ON")
        elif state == "close":
            GPIO.output(PROPANE_PIN, GPIO.LOW)
            print("Propane OFF")

    except KeyboardInterrupt:
        GPIO.cleanup()


async def toggle_SS_relays(state):
    try:
        if state == "on":
            GPIO.output(SS_RELAY, GPIO.HIGH)
            print("Power ON")
        elif state == "off":
            GPIO.output(SS_RELAY, GPIO.LOW)
            print("Power OFF")

    except KeyboardInterrupt:
        GPIO.cleanup()


async def fetch_data(url):
    try:
        with requests.Session() as session:
            response = session.get(url)
            response.raise_for_status()
            return response.json()
    except (requests.exceptions.RequestException, json.JSONDecodeError) as error:
        print("Error:", error)
        raise error


async def send_status(url):
    global generatorRunning, requestToRun

    try:
        status_data = {
            "generatorRunning": generatorRunning,
            "requestToRun": "",
        }

        with requests.Session() as session:
            response = session.get(url, params={"message": json.dumps(status_data)})
            response.raise_for_status()
            data = response.json()

            # Extract the 'requestToRun' from the server response
            server_request_to_run = data.get("requestToRun")

            # Update global variable 'requestToRun' if the server response has a value
            if server_request_to_run is not None:
                requestToRun = server_request_to_run

            print("Server response:")
            print("requestToRun:", requestToRun)

    except requests.exceptions.RequestException as error:
        print("Error sending GET request:", error)


# Function to clean up GPIO and perform safety checks
async def cleanup_and_safety_checks():
    global generatorRunning

    GPIO.cleanup()
    toggle_gas_valve("close")
    toggle_SS_relays("off")

    # tell server generator has stopped
    generatorRunning = False
    send_status(STATUS_URL)

    print("Cleanup and safety checks completed.")


async def main():
    try:
        while True:
            data = await fetch_data(DATA_URL)

            voltage_value = next(
                (
                    item["formattedValue"]
                    for item in data
                    if item["description"] == "Voltage"
                ),
                None,
            )

            if voltage_value is not None:
                print("Voltage:", voltage_value)
            else:
                print("Voltage information not found in the data.")

            await send_status(STATUS_URL)

            if generatorRunning == False and float(voltage_value.split()[0]) <= 49.0:
                await start_generator()
                await asyncio.sleep(GENERATOR_RUNTIME)
                await stop_generator()

            await asyncio.sleep(30)

    except asyncio.CancelledError:
        pass
    except Exception as error:
        print("Error:", error)


if __name__ == "__main__":
    try:
        loop = asyncio.get_event_loop()
        tasks = [main(), check_generator_running()]

        loop.run_until_complete(asyncio.gather(*tasks))
    except KeyboardInterrupt:
        print("\nExiting the script.")
    finally:
        # Run asynchronous cleanup before exiting
        # loop.run_until_complete(cleanup_and_safety_checks())
        GPIO.cleanup()

        loop.run_until_complete(toggle_gas_valve("close"))
        loop.run_until_complete(toggle_SS_relays("off"))
        generatorRunning = False
        loop.run_until_complete(send_status(STATUS_URL))
        print("Cleanup and safety checks completed.")
        loop.close()
