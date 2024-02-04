import requests


def test_server_endpoint():
    api_endpoint = "https://node.dondeestasyolanda.com/"
    test_message = "Hello from GET request!"

    try:
        response = requests.get(api_endpoint)
        data = response.json()
        print("GET request successful.")
        print("Server response:", data)
    except requests.exceptions.RequestException as error:
        print("Error sending test GET request:", error)


# Run the function
test_server_endpoint()
