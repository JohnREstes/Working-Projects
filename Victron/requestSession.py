import requests
import json

userName = "casaYolanda"
password = "casaYolanda14"

loginUrl = "https://web.shinemonitor.com/public/?sign=6ccff8270965e8096c6c1543db05ed1ddd54d80c&salt=1703284033715&action=authSource&usr=casaYolanda&source=1&company-key=bnrl_frRFjEz8Mkn"

# Make GET request
requestData = requests.get(loginUrl)

# Convert response text to JSON
jsonData = json.loads(requestData.text)

# Accessing data in the JSON response
err_code = jsonData["err"]
description = jsonData["desc"]
data = jsonData["dat"]

# Accessing nested data
secret = data["secret"]
expire = data["expire"]
token = data["token"]
role = data["role"]
user = data["usr"]
uid = data["uid"]

authUrl = (
    "https://web.shinemonitor.com/public/?sign=404ebba1b0762296da206210de2ffb67f76b363a&salt=1703284034241&token="
    + token
    + "&action=logoutVerifiction&source=1"
)

print(authUrl)

# requestPage = requests.get(authUrl)

# print(requestPage.text)
