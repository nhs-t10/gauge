Servo myservo;

int port = 0;

void setup() {
  myservo.attach(port);
  Particle.function("servo",servoMove);
}

int servoMove(String command) {
  myservo.write(command.toInt());
  return 1;
}
