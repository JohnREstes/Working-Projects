import selenium

import requests

loginurl = ('https://server-us.growatt.com/login')

payload = {
    'account': 'johnnie321',
    'password': '133Utica'
}

r = requests.post(loginurl, data=payload)

print(r.text)