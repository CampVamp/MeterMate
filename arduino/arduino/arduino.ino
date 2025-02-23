#include <SoftwareSerial.h>
#include <math.h>

SoftwareSerial mySerial(10, 11); // RX, TX

const int currentPin = A0;       // Analog pin connected to ZMCT103C
const float calibrationFactor = 30.0;  // Calibration factor (adjust based on your setup)
const int sampleCount = 1000;    // Number of samples for RMS calculation
const float voltage = 230.0;     // Voltage in Volts (assumed constant for AC mains)
unsigned long previousMillis = 0;  // For time tracking
float totalEnergy = 0.0;         // Total energy in Watt-hours

void setup() {
    Serial.begin(9600);
    mySerial.begin(9600);
    delay(2000);  // Wait for serial monitor to initialize
    pinMode(3, OUTPUT);
    digitalWrite(3, HIGH);  // Ensure the bulb starts OFF
}

void loop() {
    float total = 0;

    // Handle Serial commands for bulb control
    while (Serial.available()) {
        char rcv = Serial.read();
        if (rcv == 'A') {
            digitalWrite(3, LOW);
            Serial.println("Bulb turned ON");
        } else if (rcv == 'B') {
            digitalWrite(3, HIGH);
            Serial.println("Bulb turned OFF");
        } else {
            Serial.println("Unknown command");
        }
    }

    // Take multiple readings to calculate RMS
    for (int i = 0; i < sampleCount; i++) {
        int analogValue = analogRead(currentPin);

        // Ensure the reading is valid
        if (analogValue < 0 || analogValue > 1023) {
            Serial.println("Invalid analog reading");
            continue;
        }

        // Convert analog reading to voltage
        float voltageReading = analogValue * (5.0 / 1023.0);

        // Remove DC offset (Assuming midpoint voltage is 2.5V)
        float adjustedVoltage = voltageReading - 2.5;

        // Square the voltage to calculate RMS
        total += adjustedVoltage * adjustedVoltage;

        delayMicroseconds(500);  // Sampling delay
    }

    // Calculate RMS voltage
    float rmsVoltage = sqrt(total / sampleCount);

    // Convert RMS voltage to RMS current using calibration factor
    float rmsCurrent = ((rmsVoltage * calibrationFactor) / 15.0);

    // Calculate power in Watts
    float power = voltage * rmsCurrent;

    // Calculate time elapsed in seconds
    unsigned long currentMillis = millis();
    float elapsedTimeHours = (currentMillis - previousMillis) / 3600000.0;
    previousMillis = currentMillis;

    // Accumulate energy in Watt-hours
    totalEnergy += power * elapsedTimeHours;

    // Calculate Units Consumed (kWh)
    float unitsConsumed = totalEnergy / 1000.0;

    // Display the current, power, and units consumed
    Serial.print("RMS Current: ");
    Serial.print(rmsCurrent, 3);
    Serial.println(" A");

    Serial.print("Power: ");
    Serial.print(power, 3);
    Serial.println(" W");

    Serial.print("Total Energy: ");
    Serial.print(totalEnergy, 3);
    Serial.println(" Wh");

    Serial.print("Units Consumed: ");
    Serial.print(unitsConsumed, 3);
    Serial.println(" kWh");

    // Create JSON string with all calculated values
    String jsonData = "{";
    jsonData += "\"rmsCurrent\":" + String(rmsCurrent, 3) + ",";
    jsonData += "\"power\":" + String(power, 3) + ",";
    jsonData += "\"totalEnergy\":" + String(totalEnergy, 3) + ",";
    jsonData += "\"unitsConsumed\":" + String(unitsConsumed, 3);
    jsonData += "}";

    // Send JSON data to ESP8266
    mySerial.println(jsonData);  // Add newline for ESP8266 parsing

    delay(1000);  // Update every second
}