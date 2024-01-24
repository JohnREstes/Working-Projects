import RPi.GPIO as GPIO

# Set up GPIO
GPIO.setmode(GPIO.BCM)
CHECK_PIN = 27
GPIO.setup(CHECK_PIN, GPIO.IN)


def check_voltage():
    try:
        while True:
            # Read the state of GPIO pin 27
            voltage_state = GPIO.input(CHECK_PIN)

            if voltage_state == GPIO.HIGH:
                print("5V is present on GPIO pin 27")
            else:
                print("No 5V signal on GPIO pin 27")

    except KeyboardInterrupt:
        # Clean up GPIO on script exit
        GPIO.cleanup()


if __name__ == "__main__":
    check_voltage()
