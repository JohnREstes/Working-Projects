import requests
import json
import asyncio
from gpiozero import InputDevice

READ_PIN_NUMBER = 17
DATA_URL = "https://node.dondeestasyolanda.com/api/victron/data"
STATUS_URL = "https://node.dondeestasyolanda.com/api/generator/status"


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
    print("Get to receive and send data")
    try:
        with requests.Session() as session:
            response = session.get(STATUS_URL, params={"message": status})
            response.raise_for_status()
            data = response.json()
            print("GET request successful.")
            print("Server response:", data)
    except requests.exceptions.RequestException as error:
        print("Error sending test GET request:", error)


input_pin = InputDevice(READ_PIN_NUMBER)


async def gpio_status_loop():
    print("Started GPIO loop")
    try:
        while True:
            current_status = input_pin.is_active
            await send_status(current_status)
            await asyncio.sleep(60)
    except KeyboardInterrupt:
        print("\nExiting the script.")
        # Add cleanup code if needed
    except Exception as error:
        print("Error:", error)


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

            await asyncio.sleep(60)
    except Exception as error:
        print("Error:", error)


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    tasks = [main(), gpio_status_loop()]

    try:
        loop.run_until_complete(asyncio.gather(*tasks))
    except KeyboardInterrupt:
        print("\nExiting the script.")
    finally:
        loop.close()