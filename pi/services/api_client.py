# services/api_client.py
import requests
import time
import threading

class APIClient:
    def __init__(self, api_url):
        self.api_url = api_url

    def post_detection(self, cls, conf):
        threading.Thread(target=self._send_request, args=(cls, conf)).start()

    def _send_request(self, cls, conf):
        try:
            payload = {"class": cls, "confidence": conf}
            r = requests.post(self.api_url, json=payload, timeout=2)
            time.sleep(1)   
            if r.status_code == 200:
                print("Posted:", r.json())
            else:
                print("Error posting:", r.status_code, r.text)
        except Exception as e:
            print("POST failed:", e)
