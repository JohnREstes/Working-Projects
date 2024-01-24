from gpiozero import OutputDevice
from time import sleep


def toggle_pin(pin_number, power):
    active_pin = OutputDevice(pin_number)

    if power == "on":
        active_pin.on()
        print(f"Pin {pin_number} is ON")
    else:
        active_pin.off()
        print(f"Pin {pin_number} is OFF")


# Test the GPIO pin without asyncio
toggle_pin(17, "on")  # Check if the LED lights up
sleep(5)  # Wait for 5 seconds
toggle_pin(17, "off")  # Check if the LED turns off
