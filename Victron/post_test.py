import requests
import json


def test_server_endpoint():
    api_endpoint = "https://node.dondeestasyolanda.com/api/generator/data"
    test_payload = {"status": "test_status"}

    try:
        headers = {"Content-Type": "application/json"}
        response = requests.post(
            api_endpoint, headers=headers, data=json.dumps(test_payload)
        )
        response.raise_for_status()
        print("Test POST request successful.")
        print("Response status code:", response.status_code)
        print("Response content:", response.text)
    except requests.exceptions.RequestException as error:
        print("Error sending test POST request:", error)


# Run the function
test_server_endpoint()
