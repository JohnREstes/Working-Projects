import requests
import json
import asyncio
from gpiozero import InputDevice

READ_PIN_NUMBER = 17


async def get_data():
    headers = {}
    url = "https://node.dondeestasyolanda.com/api/victron/data"

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()

        result = response.text
        data = json.loads(result)
        return data
    except requests.exceptions.RequestException as error:
        print("error", error)
        raise error


def get_Send_status(data):
    api_endpoint = "https://node.dondeestasyolanda.com/api/generator/status"
    test_message = data

    try:
        response = requests.get(api_endpoint, params={"message": test_message})
        response.raise_for_status()
        data = response.json()
        print("GET request successful.")
        print("Server response:", data)
    except requests.exceptions.RequestException as error:
        print("Error sending test GET request:", error)


# Create an InputDevice object for the specified pin
input_pin = InputDevice(READ_PIN_NUMBER)


async def gpio_status_loop():
    try:
        while True:
            # Read the status of the GPIO pin
            current_status = input_pin.is_active

            # Post the status to the API endpoint asynchronously
            await get_Send_status(current_status)

            await asyncio.sleep(60)

    except KeyboardInterrupt:
        print("\nExiting the script.")
    except Exception as error:
        print("Error:", error)


async def main():
    while True:
        try:
            data = await get_data()

            # Extract the voltage value
            voltage_value = None
            for item in data:
                if item["description"] == "Voltage":
                    voltage_value = item["formattedValue"]
                    break

            if voltage_value is not None:
                print("Voltage:", voltage_value)
            else:
                print("Voltage information not found in the data.")

        except Exception as error:
            print("Error:", error)

        await asyncio.sleep(60)


# Run the event loop using asyncio.run()
asyncio.run(main())
asyncio.run(gpio_status_loop())
