import requests
import json
import asyncio
import RPi.GPIO as GPIO
import time

PROPANE_PIN = 17
START_PIN = 27
AC_PIN = 22
RUNNING_PIN = 23
DATA_URL = "https://node.dondeestasyolanda.com/api/victron/data"
STATUS_URL = "https://node.dondeestasyolanda.com/api/generator/status"
SLEEP_DURATION = 90
generatorRunning = False

GPIO.setmode(GPIO.BCM)


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

            # Wait for 60 seconds before the next iteration
            await asyncio.sleep(60)

    except asyncio.CancelledError:
        # This exception will be raised when the program is stopped
        pass
    except Exception as error:
        print("Error:", error)


def start_generator():
    if not generatorRunning:
        return None


def check_generator_running():
    # Set up GPIO in
    GPIO.setup(RUNNING_PIN, GPIO.IN)

    try:
        while True:
            # Read the state of GPIO pin 27
            voltage_state = GPIO.input(RUNNING_PIN)
            global generatorRunning

            if voltage_state == GPIO.HIGH:
                print(f"5V is present on GPIO pin {RUNNING_PIN}")
                generatorRunning = True
            else:
                print(f"No 5V signal on GPIO pin {RUNNING_PIN}")
                generatorRunning = False

            # Add a 1-second pause
            time.sleep(1)

    except KeyboardInterrupt:
        # Clean up GPIO on script exit
        GPIO.cleanup()


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    tasks = [main(), toggle_pin_and_send_status()]

    try:
        loop.run_until_complete(asyncio.gather(*tasks))
    except KeyboardInterrupt:
        print("\nExiting the script.")
    finally:
        loop.close()
