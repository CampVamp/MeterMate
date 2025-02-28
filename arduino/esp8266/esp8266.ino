#include <WebSocketsClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>  // Include ArduinoJson library

const char* ssid = "Ajay";
const char* password = "shwetha2006";
const char* websocketServer = "192.168.29.224";  // WebSocket server IP

WebSocketsClient webSocket;
bool isWebSocketConnected = false;  // Flag to track WebSocket connection status

void setup() {
    Serial.begin(9600);  // Ensure this matches the Arduino baud rate
    WiFi.begin(ssid, password);

    // Wait for connection to WiFi
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");

    // Connect to WebSocket server
    webSocket.begin(websocketServer, 5000, "/");  // Use port 5000 for ws://
    webSocket.onEvent(webSocketEvent);            // Attach the event handler
    webSocket.setReconnectInterval(1000);         // Reconnect interval in case of disconnection
}

void loop() {
    // Keep WebSocket communication alive
    webSocket.loop();

    // Ensure WiFi is connected
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi not connected. Reconnecting...");
        WiFi.begin(ssid, password);
        delay(1000);
        return;
    }

    // Read JSON data from Arduino
    if (Serial.available()) {
        String jsonData = Serial.readStringUntil('\n');  // Read until newline
        jsonData.trim();  // Remove any extra whitespace

        // Send JSON data to WebSocket server
        if (isWebSocketConnected && jsonData.length() > 0) {
            Serial.println("Received JSON Data: " + jsonData);
            sendToWebSocket(jsonData);
        } else if (!isWebSocketConnected) {
            Serial.println("WebSocket not connected. Data not sent.");
        }
    }

    delay(100);  // Small delay to avoid overloading the loop
}

void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
    switch (type) {
        case WStype_DISCONNECTED:
            isWebSocketConnected = false;
            Serial.println("WebSocket Disconnected");
            break;
        case WStype_CONNECTED:
            isWebSocketConnected = true;
            Serial.println("WebSocket Connected");
            Serial.printf("Connected to: %s\n", payload);
            break;
        case WStype_TEXT:
            Serial.printf("Received: %s\n", payload);
            break;
        case WStype_ERROR:
            Serial.println("WebSocket Error Occurred");
            if (length > 0) {
                Serial.printf("Error payload: %s\n", payload);
            }
            break;
        case WStype_PING:
            Serial.println("WebSocket Ping Received");
            break;
        case WStype_PONG:
            Serial.println("WebSocket Pong Received");
            break;
        default:
            Serial.printf("Unknown WebSocket event type: %d\n", type);
            break;
    }
}

void sendToWebSocket(String jsonData) {
    // Send JSON data via WebSocket
    if (isWebSocketConnected) {
        webSocket.sendTXT(jsonData);
        Serial.println("Data sent to WebSocket: " + jsonData);
    } else {
        Serial.println("WebSocket not connected. Cannot send data.");
    }
}