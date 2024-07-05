import requests
import urllib.parse
kwords = 'zoonose'
encoded_kwords = urllib.parse.quote(kwords)

url = (f'https://gnews.io/api/v4/search?q={encoded_kwords}&lang=pt&country=br&apikey=4bd31910d065b8001a7f16eace5ac9a4')
response = requests.get(url)
print(response.json())