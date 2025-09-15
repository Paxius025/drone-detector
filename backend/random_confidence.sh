#!/bin/bash

URL="http://localhost:3000/drones"

while true; do
  # สุ่ม class ระหว่าง 0 - 5
  CLASS=$(( RANDOM % 3 ))

  # สุ่ม confidence ระหว่าง 0.0 - 1.0 แบบ 2 ตำแหน่งทศนิยม
  CONFIDENCE=$(awk -v seed=$RANDOM 'BEGIN { srand(seed); printf "%.2f", rand() }')

  # ส่ง POST request
  curl -s -X POST "$URL" \
    -H "Content-Type: application/json" \
    -d "{\"class\": $CLASS, \"confidence\": $CONFIDENCE}"

  echo " -> Sent: class=$CLASS, confidence=$CONFIDENCE"

  # หน่วงเวลา 30 วินาที
  sleep 30
done
