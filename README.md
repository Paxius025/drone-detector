# Drone Detector (Demo Project) ![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-green) ![Python](https://img.shields.io/badge/Python-3.12%2B-blue) ![YOLO](https://img.shields.io/badge/YOLO-Ultralytics-yellow) ![License](https://img.shields.io/badge/license-MIT-lightgrey)

## Description

This project demonstrates **real-time drone detection** using YOLO on a Raspberry Pi (or any Python environment) with a Node.js backend for logging detected objects.

**System includes:**
- **Python (YOLO):** Real-time detection & video processing
- **Node.js (Express + SQLite):** Stores detection results via REST API
- **Jupyter Notebook:** (Optional) Analyze detection logs & visualize results

---

## Tech Stack

| Component      | Technology                                      |
| -------------- | ----------------------------------------------- |
| Backend        | Node.js, Express, SQLite, Sequelize             |
| Detection      | Python 3.10+, Ultralytics YOLO, OpenCV          |
| Frontend/Analysis | Jupyter Notebook, matplotlib, pandas         |
| OS             | Ubuntu 22.04 / Raspberry Pi OS / Windows        |

---

## Installation

### 1. Node.js Backend

```bash
# Install Node.js (v18+ recommended)

# Navigate to backend project folder
cd backend

# Install dependencies
npm install

# Run backend server
node src/index.js
```
API available at: [http://localhost:3000/drones](http://localhost:3000/drones)

---

### 2. Python (Raspberry Pi or Local)

#### 2.1 Create Virtual Environment

**Ubuntu / Linux:**
```bash
cd pi
python3 -m venv venv
source venv/bin/activate
```

**Windows:**
```cmd
cd pi
python -m venv venv
venv\Scripts\activate
```

#### 2.2 Install Python Dependencies

```bash
pip install  uv
uv pip install -r requirements.txt
```

> **Notes:**
> - Ensure `ultralytics`, `opencv-python`, and `requests` are in `requirements.txt`
> - Optional: install `uv` for faster processing

---

### 3. Jupyter Notebook (Optional)

```bash
pip install notebook jupyterlab

# Launch notebook
jupyter notebook
# or
jupyter lab
```
Open notebooks in the `notebooks/` directory to visualize or analyze detection logs.

---

## Folder Structure

```
.
├── backend
│   ├── database.sqlite
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── random_confidence.sh
│   └── src
│       ├── models
│       │   └── drone.js
│       └── routes
│           └── drone.js
├── frontend
│   ├── chart_page.html
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── script
│   │   └── script.js
│   └── style
│       ├── chart.css
│       └── index.css
├── pi
│   ├── detector
│   │   ├── best.pt
│   │   ├── detect.py
│   │   └── __pycache__
│   │       └── detect.cpython-312.pyc
│   ├── main.py
│   ├── requirements.txt
│   └── services
│       ├── api_client.py
│       └── __pycache__
│           └── api_client.cpython-312.pyc
├── REAME.md
└── train-model
    └── requirements.txt
```

---

## Running the System

**Start Backend API:**
```bash
node src/index.js
```

**Start Drone Detector (Python script):**
```bash
cd pi
python main.py
```

**View API logs:**
```http
GET http://localhost:3000/drones
```
Data includes: `class`, `confidence`, `datetime`

**Analyze with Jupyter Notebook:**
```bash
jupyter notebook notebooks/analysis.ipynb
```

---

## Notes & Troubleshooting

- Ensure Python script can access YOLO model (`detector/best.pt`)
- If video is lagging:
    - Run API requests in a separate thread
    - Reduce detection frequency or use a smaller YOLO model
- For Node.js, `database.sqlite` is created automatically in project root

---
