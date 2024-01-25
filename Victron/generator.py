import requests
import json
import asyncio
import RPi.GPIO as GPIO
from time import sleep

PROPANE_PIN = 17
START_PIN = 27
AC_PIN = 22
RUNNING_PIN = 23
DATA_URL = "https://node.dondeestasyolanda.com/api/victron/data"
STATUS_URL = "https://node.dondeestasyolanda.com/api/generator/status"
SLEEP_DURATION = 90
generatorRunning = False

# Set GPIO numbering mode
GPIO.setmode(GPIO.BCM)
# Disable warnings
GPIO.setwarnings(False)


async def start_generator():
    try:
        GPIO.setup(START_PIN, GPIO.OUT)
        if not generatorRunning:
            open_gas_valve("open")
            for i in range(5):
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
    # Set up GPIO in
    GPIO.setup(RUNNING_PIN, GPIO.IN)

    try:
        while True:
            # Read the state of GPIO pin 27
            voltage_state = GPIO.input(RUNNING_PIN)
            global generatorRunning

            if voltage_state == GPIO.HIGH:
                generatorRunning = True
            else:
                generatorRunning = False

            # Add a 1-second pause
            print(generatorRunning)
            await asyncio.sleep(1)

    except KeyboardInterrupt:
        # Clean up GPIO on script exit
        GPIO.cleanup()


def open_gas_valve(state):
    try:
        # Check if PROPANE_PIN is already set up
        if not GPIO.getmode() or GPIO.gpio_function(PROPANE_PIN) != GPIO.OUT:
            # Set up GPIO for PROPANE_PIN as an output
            GPIO.setup(PROPANE_PIN, GPIO.OUT)

        # Check if the pin is already set to HIGH or LOW before changing
        current_state = GPIO.input(PROPANE_PIN)

        if state == "open" and current_state == GPIO.LOW:
            # Turn on the propane
            GPIO.output(PROPANE_PIN, GPIO.HIGH)
            print("Propane ON")
        elif state == "close" and current_state == GPIO.HIGH:
            # Turn off the propane
            GPIO.output(PROPANE_PIN, GPIO.LOW)
            print("Propane OFF")

    except KeyboardInterrupt:
        # Clean up GPIO on script exit
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
            response = session.get(STATUS_URL, params={"status": status})
            response.raise_for_status()
            data = response.json()
            print("Server response:", data)
    except requests.exceptions.RequestException as error:
        print("Error sending test GET request:", error)


async def main():
    try:
        # Set up GPIO for START_PIN
        GPIO.setup(START_PIN, GPIO.OUT)
        # Set up GPIO for RUNNING_PIN
        GPIO.setup(RUNNING_PIN, GPIO.IN)

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
            # Wait for 60 seconds before the next iteration
            await asyncio.sleep(60)

    except asyncio.CancelledError:
        # This exception will be raised when the program is stopped
        pass
    except Exception as error:
        print("Error:", error)
    finally:
        # Clean up GPIO on script exit
        GPIO.cleanup()


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    tasks = [main(), check_generator_running()]

    try:
        loop.run_until_complete(asyncio.gather(*tasks))
    except KeyboardInterrupt:
        print("\nExiting the script.")
    finally:
        GPIO.cleanup()
        loop.close()
