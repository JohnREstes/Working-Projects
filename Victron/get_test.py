import requests


def test_server_endpoint():
    api_endpoint = "https://node.dondeestasyolanda.com/api/generator/status"
    test_message = "Hello from GET request!"

    try:
        response = requests.get(api_endpoint, params={"message": test_message})
        response.raise_for_status()
        data = response.json()
        print("GET request successful.")
        print("Server response:", data)
    except requests.exceptions.RequestException as error:
        print("Error sending test GET request:", error)


# Run the function
test_server_endpoint()
