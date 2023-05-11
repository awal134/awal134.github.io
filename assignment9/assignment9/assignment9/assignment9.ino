/*
  Blink

  https://youtube.com/shorts/5NX0ol1f2gQ?feature=share

  Turns an LED on for one second, then off for one second, repeatedly.

  Most Arduinos have an on-board LED you can control. On the UNO, MEGA and ZERO
  it is attached to digital pin 13, on MKR1000 on pin 6. LED_BUILTIN is set to
  the correct LED pin independent of which board is used.
  If you want to know what pin the on-board LED is connected to on your Arduino
  model, check the Technical Specs of your board at:
  https://www.arduino.cc/en/Main/Products

  modified 8 May 2014
  by Scott Fitzgerald
  modified 2 Sep 2016
  by Arturo Guadalupi
  modified 8 Sep 2016
  by Colby Newman

  This example code is in the public domain.

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/Blink
*/
int buttonState1 =0;
int buttonState2 =0;
const int ledPin = LED_BUILTIN;  
int ledState = LOW;  
unsigned long previousMillis = 0; 
long interval = 1000; 
void setup() {
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(3, INPUT);
  pinMode(2, INPUT);
}

// the loop function runs over and over again forever
void loop() {
  unsigned long currentMillis = millis();
  buttonState1 = digitalRead(3);
  buttonState2 = digitalRead(2);
  if(buttonState1 == HIGH) {
    interval  = 500;
  }
  if(buttonState2 == HIGH) {
    interval = 2000;
  }
  if(buttonState1 == LOW && buttonState2 == LOW) {
    interval = 1000;
  }
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    if (ledState == LOW) {
      ledState = HIGH;
    } else {
      ledState = LOW;
    }
    digitalWrite(12, ledState);
    digitalWrite(11, ledState);
  }
}
