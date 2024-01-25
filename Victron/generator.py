import requests
import json
import asyncio
import RPi.GPIO as GPIO

PROPANE_PIN = 17
START_PIN = 27
RUNNING_PIN = 23
DATA_URL = "https://node.dondeestasyolanda.com/api/victron/data"
STATUS_URL = "https://node.dondeestasyolanda.com/api/generator/status"
SLEEP_DURATION = 90

# Set GPIO numbering mode and disable warnings
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# Setup GPIO pins
GPIO.setup(START_PIN, GPIO.OUT)
GPIO.setup(RUNNING_PIN, GPIO.IN)
GPIO.setup(PROPANE_PIN, GPIO.OUT)

generatorRunning = False  # Define the variable here


async def start_generator():
    try:
        if not generatorRunning:
            open_gas_valve("open")
            for _ in range(5):
                GPIO.output(START_PIN, GPIO.HIGH)
                print("Attempting to start")
                await asyncio.sleep(5)
                GPIO.output(START_PIN, GPIO.LOW)
                print("Pausing Start")
                await asyncio.sleep(5)

                if generatorRunning:
                    break
                if i == 4:
                    print("DID NOT START, ERROR")
                    break

    except asyncio.CancelledError:
        pass
    except Exception as error:
        print("Error:", error)
    finally:
        GPIO.cleanup()


async def check_generator_running():
    try:
        global generatorRunning  # Use the global variable

        while True:
            voltage_state = GPIO.input(RUNNING_PIN)
            generatorRunning = voltage_state == GPIO.HIGH

            print(generatorRunning)
            await asyncio.sleep(1)

    except KeyboardInterrupt:
        GPIO.cleanup()


def open_gas_valve(state):
    try:
        current_state = GPIO.input(PROPANE_PIN)

        if state == "open" and current_state == GPIO.LOW:
            GPIO.output(PROPANE_PIN, GPIO.HIGH)
            print("Propane ON")
        elif state == "close" and current_state == GPIO.HIGH:
            GPIO.output(PROPANE_PIN, GPIO.LOW)
            print("Propane OFF")

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


async def send_status(status):
    try:
        with requests.Session() as session:
            response = session.get(STATUS_URL, params={"message": status})
            response.raise_for_status()
            data = response.json()
            print("Server response:", data)
    except requests.exceptions.RequestException as error:
        print("Error sending test GET request:", error)


async def main():
    try:
        await start_generator()

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

            await send_status(generatorRunning)
            await asyncio.sleep(60)

    except asyncio.CancelledError:
        pass
    except Exception as error:
        print("Error:", error)
    finally:
        GPIO.cleanup()


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    tasks = [main(), check_generator_running()]

    try:
        loop.run_until_complete(asyncio.gather(*tasks))
    except KeyboardInterrupt:
        print("\nExiting the script.")
    finally:
        loop.close()
