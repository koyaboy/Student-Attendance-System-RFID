//#include <WiFi.h>
//#include <SPI.h>
//#include <MFRC522.h>
////#include <ArduinoHttpClient.h>
//#include <ArduinoJson.h>
//#include <string.h>
//
//// Replace with your Wi-Fi credentials
//const char ssid[] = "CSIS_MH";
//const char password[] = "";
//
//// Replace with your MongoDB server details
//const char* mongodbServer = "your_mongodb_server.com";
//const int mongodbPort = 27017;
//const char* mongodbDatabase = "your_database_name";
//const char* mongodbCollection = "your_collection_name";
//
//// Replace with your RFID reader (MFRC522) pins
//#define RST_PIN   5   // RST Pin
//#define SS_PIN    4   // SDA Pin
//
//MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance
//
//WiFiClient wifiClient;
//HttpClient httpClient(wifiClient, mongodbServer, mongodbPort);
//
//String getRFIDTag();
//
//void setup() {
//  Serial.begin(115200);
//  delay(10);
//
//  // Connect to Wi-Fi network
//  Serial.print("Connecting to Wi-Fi...");
//  WiFi.begin(ssid, password);
//  while (WiFi.status() != WL_CONNECTED) {
//    delay(500);
//    Serial.print(".");
//  }
//  Serial.println("");
//  Serial.println("Wi-Fi connected");
//  
//  mfrc522.PCD_Init();  // Initialize MFRC522 RFID reader
//  Serial.println("RFID reader initialized");
//}
//
//void loop() {
//  // Check for new RFID tag
//  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
//    String rfidTag = getRFIDTag();
//
//    // Create JSON payload
//    StaticJsonDocument<200> jsonDocument;
//    jsonDocument["rfidTag"] = rfidTag;
//
//    // Serialize JSON to string
//    String jsonString;
//    serializeJson(jsonDocument, jsonString);
//
//    // Send POST request to MongoDB server
//    String url = "/" + String(mongodbDatabase) + "/" + String(mongodbCollection);
//    httpClient.beginRequest();
//    httpClient.post(url);
//    httpClient.sendHeader("Content-Type", "application/json");
//    httpClient.sendHeader("Content-Length", String(jsonString.length()));
//    httpClient.beginBody();
//    httpClient.print(jsonString);
//    httpClient.endRequest();
//
//    int httpResponseCode = httpClient.responseStatusCode();
//    String responsePayload = httpClient.responseBody();
//
//    Serial.println("Response Code: " + String(httpResponseCode));
//    Serial.println("Response Body: " + responsePayload);
// }
//}
//String getRFIDTag() {
//  String rfidTag = "";
//  
//  for (byte i = 0; i < mfrc522.uid.size; i++) {
//    rfidTag.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
//    rfidTag.concat(String(mfrc522.uid.uidByte[i], HEX));
//  }
//
//  mfrc522.PICC_HaltA();  // Halt PICC
//  mfrc522.PCD_StopCrypto1();  // Stop encryption on PCD
//  mfrc522.PICC_IsNewCardPresent();  // Check for new card
//
//  return rfidTag;
//}


//#include <WiFi.h>
//#include <SPI.h>
//#include <MFRC522.h>
//#include <ArduinoJson.h>
//
//// Replace with your Wi-Fi credentials
//const char* ssid = "your_wifi_ssid";
//const char* password = "your_wifi_password";
//
//// Replace with your MongoDB server details
//const char* mongodbServer = "your_mongodb_server.com";
//const int mongodbPort = 27017;
//const char* mongodbDatabase = "your_database_name";
//const char* mongodbCollection = "your_collection_name";
//
//// Replace with your RFID reader (MFRC522) pins
//#define RST_PIN   5   // RST Pin
//#define SS_PIN    4   // SDA Pin
//
//MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance
//
//String getRFIDTag();
//
//void setup() {
//  Serial.begin(115200);
//  delay(10);
//
//  // Connect to Wi-Fi network
//  Serial.print("Connecting to Wi-Fi...");
//  WiFi.begin(ssid, password);
//  while (WiFi.status() != WL_CONNECTED) {
//    delay(500);
//    Serial.print(".");
//  }
//  Serial.println("");
//  Serial.println("Wi-Fi connected");
//  
//  mfrc522.PCD_Init();  // Initialize MFRC522 RFID reader
//  Serial.println("RFID reader initialized");
//}
//
//void loop() {
//  // Check for new RFID tag
//  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
//    String rfidTag = getRFIDTag();
//
//    // Create JSON payload
//    StaticJsonDocument<200> jsonDocument;
//    jsonDocument["rfidTag"] = rfidTag;
//
//    // Serialize JSON to string
//    String jsonString;
//    serializeJson(jsonDocument, jsonString);
//
//    // Send POST request to MongoDB server
//    WiFiClient client;
//    if (client.connect(mongodbServer, mongodbPort)) {
//      client.print("POST /" + String(mongodbDatabase) + "/" + String(mongodbCollection) + " HTTP/1.1\r\n");
//      client.print("Host: " + String(mongodbServer) + "\r\n");
//      client.print("Content-Type: application/json\r\n");
//      client.print("Content-Length: " + String(jsonString.length()) + "\r\n");
//      client.print("\r\n");
//      client.print(jsonString);
//      client.print("\r\n");
//
//      // Read the response
//      while (client.connected()) {
//        String line = client.readStringUntil('\n');
//        if (line == "\r") {
//          break;
//        }
//      }
//      String responsePayload = client.readString();
//
//      client.stop();
//
//      Serial.println("Response Body: " + responsePayload);
//    }
//  }
//}
//
//String getRFIDTag() {
//  String rfidTag = "";
//  
//  for (byte i = 0; i < mfrc522.uid.size; i++) {
//    rfidTag.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
//    rfidTag.concat(String(mfrc522.uid.uidByte[i], HEX));
//  }
//
//  mfrc522.PICC_HaltA();  // Halt PICC
//  mfrc522.PCD_StopCrypto1();  // Stop encryption on PCD
//  mfrc522.PICC_IsNewCardPresent();  // Check for new card
//
//  return rfidTag;
//}

#include <WiFi.h>
#include <SPI.h>
#include <MFRC522.h>
#include <ArduinoJson.h>

// Replace with your Wi-Fi credentials
char ssid[] = "CSIS_MH";
char password[] = "";

// Replace with your MongoDB server details
const char* mongodbServer = "your_mongodb_server.com";
const int mongodbPort = 27017;
const char* mongodbDatabase = "your_database_name";
const char* mongodbCollection = "your_collection_name";

// Replace with your RFID reader (MFRC522) pins
#define RST_PIN   5   // RST Pin
#define SS_PIN    4   // SDA Pin

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance

String getRFIDTag();

void setup() {
  Serial.begin(115200);
  //delay(10);

  // Connect to Wi-Fi network
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Wi-Fi connected");
  
  SPI.begin();        // Initialize SPI bus
  mfrc522.PCD_Init(); // Initialize MFRC522 RFID reader
  Serial.println("RFID reader initialized");
}

void loop() {
  Serial.println("Test");
  // Check for new RFID tag
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    String rfidTag = getRFIDTag();

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
