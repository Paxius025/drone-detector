import cv2
from detector.detect import Detector
from services.api_client import APIClient

# config
API_URL = "http://localhost:3000/drones"

def main():
    detector = Detector()
    api_client = APIClient(API_URL)

    cap = cv2.VideoCapture(0)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # run detection
        result = detector.detect(frame)

        # annotate frame
        annotated_frame = result.plot()

        for box in result.boxes:
            cls = int(box.cls[0])
            conf = float(box.conf[0])
            label = detector.model.names[cls]

            print(f"Detected: {label}, Confidence: {conf:.2f}")
            api_client.post_detection(cls, conf)

            # overlay text
            x1, y1, x2, y2 = box.xyxy[0]
            cv2.putText(
                annotated_frame,
                f"{label} {conf:.2f}",
                (int(x1), int(y1) - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (0, 255, 0),
                2,
            )

        cv2.imshow("Detection", annotated_frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
