#include <SoftwareSerial.h>
#include <math.h>

SoftwareSerial mySerial(10, 11); // RX, TX

const int relayPin = 3;          
const int currentPin = A0;       
const float calibrationFactor = 30.0;
const int sampleCount = 1000;
const float voltage = 230.0;
const float currentThreshold = 0.05; // Ignore small currents
unsigned long previousMillis = 0;
float totalEnergy = 0.0;

void setup() {
    Serial.begin(9600);
    mySerial.begin(9600);
    delay(2000); // Allow serial monitor to initialize

    pinMode(relayPin, OUTPUT);
    digitalWrite(relayPin, HIGH);  // Start with relay OFF (assuming active-low)
}

void loop() {
    // Handle Serial commands for relay control
    if (Serial.available() > 0) {  
        char command = Serial.read();
        switch (command) {
            case 'A':
                digitalWrite(relayPin, LOW); // Turn relay ON
                Serial.println("Relay ON");  
                break;
            case 'B':
                digitalWrite(relayPin, HIGH); // Turn relay OFF
                Serial.println("Relay OFF");  
                break;
        }
    }

    // Read and calculate RMS current
    float total = 0;
    for (int i = 0; i < sampleCount; i++) {
        int analogValue = analogRead(currentPin);
        float voltageReading = analogValue * (5.0 / 1023.0);
        float adjustedVoltage = voltageReading - 2.5;
        total += adjustedVoltage * adjustedVoltage;
        delayMicroseconds(500);
    }

    float rmsVoltage = sqrt(total / sampleCount);
    float rmsCurrent = ((rmsVoltage * calibrationFactor) / 15.0);

    // Ignore small currents (noise)
    if (rmsCurrent < currentThreshold) {
        rmsCurrent = 0.0;
    }

    float power = voltage * rmsCurrent;

    unsigned long currentMillis = millis();
    float elapsedTimeHours = (currentMillis - previousMillis) / 3600000.0;
    previousMillis = currentMillis;

    // Only update energy when relay is ON
    if (digitalRead(relayPin) == LOW) {
        totalEnergy += power * elapsedTimeHours;
    }

    float unitsConsumed = totalEnergy / 1000.0;

    // Send data to ESP8266 in JSON format
    String jsonData = "{";
    jsonData += "\"rmsCurrent\":" + String(rmsCurrent, 3) + ",";
    jsonData += "\"power\":" + String(power, 3) + ",";
    jsonData += "\"totalEnergy\":" + String(totalEnergy, 3) + ",";
    jsonData += "\"unitsConsumed\":" + String(unitsConsumed, 3);
    jsonData += "}";

    mySerial.println(jsonData);

    delay(1000);
}