import requests
import json
import asyncio
from gpiozero import InputDevice
from gpiozero import OutputDevice

READ_PIN_NUMBER = 17
DATA_URL = "https://node.dondeestasyolanda.com/api/victron/data"
STATUS_URL = "https://node.dondeestasyolanda.com/api/generator/status"
SLEEP_DURATION = 90


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


async def toggle_pin_and_send_status():
    try:
        while True:
            # Set pin 17 to on
            await activate_pin(17, "on")

            # Wait for 90 seconds
            await asyncio.sleep(SLEEP_DURATION)

            # Set pin 17 to off
            await activate_pin(17, "off")

            # Wait for 90 seconds
            await asyncio.sleep(SLEEP_DURATION)

    except asyncio.CancelledError:
        # This exception will be raised when the program is stopped
        pass


async def activate_pin(pin_number, power):
    # Create an OutputDevice object for the specified pin
    active_pin = OutputDevice(pin_number)

    if power == "on":
        active_pin.on()
        await send_status("ON")
    else:
        active_pin.off()
        await send_status("OFF")


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


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    tasks = [main(), toggle_pin_and_send_status()]

    try:
        loop.run_until_complete(asyncio.gather(*tasks))
    except KeyboardInterrupt:
        print("\nExiting the script.")
    finally:
        loop.close()
