import RPi.GPIO as GPIO
from time import sleep

# Set up GPIO
GPIO.setmode(GPIO.BCM)
LED_PIN = 17
GPIO.setup(LED_PIN, GPIO.OUT)


def toggle_led():
    try:
        while True:
            # Turn on the LED
            GPIO.output(LED_PIN, GPIO.HIGH)
            print("LED ON")
            sleep(5)

            # Turn off the LED
            GPIO.output(LED_PIN, GPIO.LOW)
            print("LED OFF")
            sleep(5)

    except KeyboardInterrupt:
        # Clean up GPIO on script exit
        GPIO.cleanup()


if __name__ == "__main__":
    toggle_led()
