#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include <ArduinoJson.h>

// Replace with your Wi-Fi credentials
char ssid[] = "BIG SLAUGHTER";
char password[] = "SUP3RSLIME";

// Replace with your MongoDB server details
const char* serverAddress = "172.16.120.174";
const int serverPort = 4000;
const char* mongodbDatabase = "mydb";
const char* mongodbCollection = "attendances";

// Replace with your RFID reader (MFRC522) pins
#define RST_PIN   22   // RST Pin
#define SS_PIN    21   // SDA Pin

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance

String getRFIDTag();
String getJWTToken(const String& rfidTag);  // Modified function signature

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

//    String token = getJWTToken(rfidTag);  // Retrieve the JWT token value

//    Serial.println("Token: " + token);
    
//    String recv_token = token; // Complete Bearer token
//     recv_token = "Bearer " + recv_token;  // Adding "Bearer " before token

      HTTPClient http;

      http.begin("https://student-attendance-system-backend.up.railway.app/markAttendance");
      http.addHeader("Content-Type", "application/json");
    

      // Create a JSON payload object
      StaticJsonDocument<200> jsonPayload;

      jsonPayload["rfidTag"] = rfidTag;

      // Serialize the JSON payload
      String payload;
      serializeJson(jsonPayload, payload);

      Serial.println("PAYLOAD FOR MARK ATTENDANCE: " + payload);

      int httpCode = http.POST(payload);

      if (httpCode > 0) { // Check for the returning code
        String responsePayload = http.getString();
        Serial.println(httpCode);
        Serial.println(responsePayload);
      } else {
        Serial.println(httpCode);
        Serial.println("Error on HTTP request");
      }

      http.end();
   
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

//String getJWTToken(const String& rfidTag) {
//  HTTPClient http;
//
//  http.begin("https://student-attendance-system-backend.up.railway.app/generateToken");
//  http.addHeader("Content-Type", "application/json"); // Set the content type to JSON
//
//  // Create a JSON payload object
//  StaticJsonDocument<200> jsonPayload;
//
//  jsonPayload["rfidTag"] = rfidTag;
//
//  // Serialize the JSON payload
//  String payload;
//  serializeJson(jsonPayload, payload);
//
//  Serial.println("PAYLOAD: " + payload);
//
//  int httpCode = http.POST(payload);
//
//  if (httpCode > 0) { // Check for the returning code
//    String responsePayload = http.getString();
//    Serial.println(httpCode);
//    Serial.println(responsePayload);
//
//    // Parse the JSON response
//    StaticJsonDocument<200> jsonResult;
//    DeserializationError error = deserializeJson(jsonResult, responsePayload);
//
//    // Check if parsing succeeded
//    if (error) {
//      Serial.println("Error parsing JSON");
//      return "";
//    }
//
//    // Extract the token value
//    const char* tokenValue = jsonResult["token"];
//
//    // Return the token value as a String
//    return String(tokenValue);
//  } else {
//    Serial.println(httpCode);
//    Serial.println("Error on HTTP request");
//  }
//
//  http.end();
//  return "";
//}
