import requests

resp = requests.get('https://droneproxy.fly.dev/https://assignments.reaktor.com/birdnest/drones')
print(resp.text)