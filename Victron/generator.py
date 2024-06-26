import requests
import json
import asyncio
import RPi.GPIO as GPIO


PROPANE_PIN = 17  # GPIO PIN, board pin 6
START_PIN = 27  # GPIO PIN, board pin 7 ?
RUNNING_PIN = 23  # GPIO PIN, board pin 8 ?
SS_RELAY = 22  # GPIO PIN, board pin 28 ?
DATA_URL = "https://node.dondeestasyolanda.com/api/victron/data"
STATUS_URL = "https://node.dondeestasyolanda.com/api/status"
SLEEP_DURATION = 10  # seconds
GENERATOR_RUNTIME = 1800  # 60 sec x 30 min
CHECK_GENERATOR_STATUS = 2  # seconds
CLEAR_ERROR_STATE = 60  # seconds

# Global Variables
generatorRunning = False
requestToRun = False
errorState = False
variableSettings = None

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


async def start_generator():
    global generatorRunning, errorState
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
                errorState = False
                break
            if i == 4:
                print("DID NOT START, ERROR")
                errorState = True
                await stop_generator()
                break

    except asyncio.CancelledError:
        pass
    except Exception as error:
        print("Error: ", error)


async def stop_generator():
    global generatorRunning
    print("Generator stopped. Performing safety check functions.")
    await toggle_gas_valve("close")
    await toggle_SS_relays("off")
    generatorRunning = False


async def check_generator_running():
    try:
        global generatorRunning, errorState  # Use the global variable
        previous_state = generatorRunning

        while True:
            voltage_state = GPIO.input(RUNNING_PIN)
            generatorRunning = voltage_state == GPIO.HIGH

            print("Generator Running: ", generatorRunning)

            if previous_state and not generatorRunning:
                # Change from True to False detected
                errorState = True
                await stop_generator()

            await asyncio.sleep(CHECK_GENERATOR_STATUS)
            previous_state = generatorRunning

    except KeyboardInterrupt:
        await asyncio.sleep(1)
        GPIO.cleanup()


async def toggle_gas_valve(state):
    try:
        if state == "open":
            GPIO.output(PROPANE_PIN, GPIO.HIGH)
            print("Propane ON")
        elif state == "close":
            GPIO.output(PROPANE_PIN, GPIO.LOW)
            print("Propane OFF")

    except KeyboardInterrupt:
        await asyncio.sleep(1)
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
        await asyncio.sleep(1)
        GPIO.cleanup()


async def fetch_data(url):
    try:
        with requests.Session() as session:
            response = session.get(url)
            response.raise_for_status()
            return response.json()
    except (requests.exceptions.RequestException, json.JSONDecodeError) as error:
        print("Error: ", error)
        raise error


async def send_get_status(url):
    global generatorRunning, requestToRun, errorState, variableSettings

    try:
        status_data = {
            "generatorRunning": generatorRunning,
            "requestToRun": "",
            "errorState": errorState,
            "settings": None,
        }

        with requests.Session() as session:
            response = session.get(url, params={"message": json.dumps(status_data)})
            response.raise_for_status()
            data = response.json()

            # Extract the 'requestToRun' from the server response
            server_request_to_run = data.get("requestToRun")
            variableSettings = data.get("settings")

            print("Settings: ", variableSettings)

            # Update global variable 'requestToRun' if the server response has a value
            if server_request_to_run is not None:
                requestToRun = server_request_to_run

            print("Server response:")
            print("requestToRun: ", requestToRun)
            if (
                requestToRun == True
                and generatorRunning == False
                and errorState == False
            ):
                await start_generator()
            elif requestToRun == False and generatorRunning == True:
                await stop_generator()

    except requests.exceptions.RequestException as error:
        print("Error sending GET request: ", error)


async def clearErrorState():
    global errorState
    try:
        while True:
            if errorState:
                await asyncio.sleep(CLEAR_ERROR_STATE)
                errorState = False
            await asyncio.sleep(CHECK_GENERATOR_STATUS)

    except Exception as error:
        print("Error: ", error)


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
                print("Voltage: ", voltage_value)
            else:
                print("Voltage information not found in the data.")

            await send_get_status(STATUS_URL)

            if generatorRunning == False and float(voltage_value.split()[0]) <= 49.0:
                await start_generator()
                await asyncio.sleep(GENERATOR_RUNTIME)
                await stop_generator()

            await asyncio.sleep(SLEEP_DURATION)

    except asyncio.CancelledError:
        pass


if __name__ == "__main__":
    try:
        loop = asyncio.get_event_loop()
        tasks = [main(), check_generator_running(), clearErrorState()]

        loop.run_until_complete(asyncio.gather(*tasks))
    except KeyboardInterrupt:
        print("Exiting the script.")
    finally:
        # Run asynchronous cleanup before exiting

        loop.run_until_complete(toggle_gas_valve("close"))
        loop.run_until_complete(toggle_SS_relays("off"))
        generatorRunning = False
        loop.run_until_complete(send_get_status(STATUS_URL))
        print("Cleanup and safety checks completed.")

        GPIO.cleanup()
        loop.close()
