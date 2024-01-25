import RPi.GPIO as GPIO
import time

CHECK_PIN = 27


def check_voltage():
    # Set up GPIO
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(CHECK_PIN, GPIO.IN)

    try:
        while True:
            # Read the state of GPIO pin 27
            voltage_state = GPIO.input(CHECK_PIN)

            if voltage_state == GPIO.HIGH:
                print("5V is present on GPIO pin 27")
            else:
                print("No 5V signal on GPIO pin 27")

            # Add a 1-second pause
            time.sleep(1)

    except KeyboardInterrupt:
        # Clean up GPIO on script exit
        GPIO.cleanup()


if __name__ == "__main__":
    check_voltage()
