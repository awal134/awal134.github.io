//https://youtube.com/shorts/IH6zczbUP90


int p1 = A1;  
int p2 = A2;
int ledPin1 = 10;     
int ledPin2 = 11;
int sensorValue1 = 0; 
int sensorValue2 = 0;

void setup() {
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
}

void loop() {
  sensorValue1 = analogRead(p1);
  sensorValue2 = analogRead(p2);
  int brightness1 = map(sensorValue1, 0, 1023, 0, 255);
  int brightness2 = map(sensorValue2, 0, 1023, 0, 255);
  analogWrite(ledPin1, brightness1);
  analogWrite(ledPin2, brightness2);

  if(brightness1 == 133 || brightness2 == 133) {
    brightness1 = 255;
    brightness2  = 255;
    analogWrite(ledPin1, brightness1);
    analogWrite(ledPin2, brightness2);
    delay(5000);
  }
}
