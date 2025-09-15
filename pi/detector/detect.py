import cv2
from ultralytics import YOLO
import os

class Detector:
    def __init__(self, model_path="best .pt"):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        full_path = os.path.join(base_dir, model_path)
        self.model = YOLO(full_path)


    def detect(self, frame):
        # รัน detection
        results = self.model(frame, verbose=False)
        return results[0]