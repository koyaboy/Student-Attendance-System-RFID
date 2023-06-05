#include <WiFi.h>
#include <SPI.h>
#include <MFRC522.h>
#include <ArduinoJson.h>

// Replace with your Wi-Fi credentials
char ssid[] = "MARAZ-DEVV";
char password[] = "techrules.....";

// Replace with your MongoDB server details
const char* mongodbServer = "mongodb://localhost:27017";
const int mongodbPort = 27017;
const char* mongodbDatabase = "mydb";
const char* mongodbCollection = "attendances";

// Replace with your RFID reader (MFRC522) pins
#define RST_PIN   22   // RST Pin
#define SS_PIN    21   // SDA Pin

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance

String getRFIDTag();

void setup() {
  Serial.begin(115200);
  delay(10);

  // Connect to Wi-Fi network
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Reconnecting...");
  }
  Serial.println("");
  Serial.println("Wi-Fi connected");

  SPI.begin();        // Initialize SPI bus
  mfrc522.PCD_Init(); // Initialize MFRC522 RFID reader
  Serial.println("RFID reader initialized");
  mfrc522.PCD_DumpVersionToSerial();  // Show details of PCD - MFRC522 Card Reader details
}

void loop() {
  // Check for new RFID tag
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    String rfidTag = getRFIDTag();
    Serial.println("Card/Tag detected: " + rfidTag);

    // Create JSON payload
    DynamicJsonDocument jsonDocument(200);
    jsonDocument["rfidTag"] = rfidTag;

    // Serialize JSON to string
    String jsonString;
    serializeJson(jsonDocument, jsonString);

    // Send POST request to MongoDB server
    WiFiClient client;
    if (client.connect(mongodbServer, mongodbPort)) {
      client.print("POST /" + String(mongodbDatabase) + "/" + String(mongodbCollection) + " HTTP/1.1\r\n");
      client.print("Host: " + String(mongodbServer) + "\r\n");
      client.print("Content-Type: application/json\r\n");
      client.print("Content-Length: " + String(jsonString.length()) + "\r\n");
      client.print("\r\n");
      client.print(jsonString);
      client.print("\r\n");

      // Read the response
      while (client.connected()) {
        String line = client.readStringUntil('\n');
        if (line == "\r") {
          break;
        }
      }
      String responsePayload = client.readString();

      client.stop();

      Serial.println("Response Body: " + responsePayload);
    }
  }
}

String getRFIDTag() {
  String rfidTag = "";

  for (byte i = 0; i < mfrc522.uid.size; i++) {
    rfidTag.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
    rfidTag.concat(String(mfrc522.uid.uidByte[i], HEX));
  }

  mfrc522.PICC_HaltA();         // Halt PICC
  mfrc522.PCD_StopCrypto1();    // Stop encryption on PCD
  mfrc522.PICC_IsNewCardPresent(); // Check for new card

  return rfidTag;
}
