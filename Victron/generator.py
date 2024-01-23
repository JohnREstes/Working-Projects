import requests
import json
import asyncio
from gpiozero import InputDevice

READ_PIN_NUMBER = 17


async def get_data():
    headers = {}
    url = "https://node.dondeestasyolanda.com/api/victron/data"

    try:
        with requests.Session() as session:
            response = session.get(url, headers=headers)
            response.raise_for_status()

            result = response.text
            data = json.loads(result)
            return data
    except (requests.exceptions.RequestException, json.JSONDecodeError) as error:
        print("Error:", error)
        raise error


def get_send_status(data):
    print("Get to receive and send data")
    api_endpoint = "https://node.dondeestasyolanda.com/api/generator/status"
    test_message = data

    try:
        with requests.Session() as session:
            response = session.get(api_endpoint, params={"message": test_message})
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
            asyncio.create_task(get_send_status(current_status))
            await asyncio.sleep(60)
    except KeyboardInterrupt:
        print("\nExiting the script.")
        # Add cleanup code if needed
    except Exception as error:
        print("Error:", error)


async def main():
    while True:
        try:
            data = await get_data()

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


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    tasks = [main(), gpio_status_loop()]

    try:
        loop.run_until_complete(asyncio.gather(*tasks))
    except KeyboardInterrupt:
        print("\nExiting the script.")
    finally:
        loop.close()
