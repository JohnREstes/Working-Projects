import requests
import json
import asyncio
from gpiozero import InputDevice
from gpiozero import OutputDevice

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


async def toggle_pin_and_send_status():
    try:
        while True:
            # Set pin 17 to on
            await activate_pin(17, 0.1)  # Set a short duration for on state
            await send_status("ON")

            # Wait for 90 seconds
            await asyncio.sleep(90)

            # Set pin 17 to off
            await activate_pin(17, 0.1)  # Set a short duration for off state
            await send_status("OFF")

            # Wait for 90 seconds before the next iteration
            await asyncio.sleep(90)

    except asyncio.CancelledError:
        # This exception will be raised when the program is stopped
        pass


async def activate_pin(pin_number, duration_seconds):
    # Create an OutputDevice object for the specified pin
    active_pin = OutputDevice(pin_number)

    try:
        # Set the pin to an active state
        active_pin.on()

        # Add a delay to keep the pin active for the specified duration
        await asyncio.sleep(duration_seconds)

    finally:
        # Turn off the pin to deactivate it
        active_pin.off()


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
