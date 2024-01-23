import serial

# Change "/dev/ttyUSB0" to the correct port on your system
ser = serial.Serial("/dev/ttyUSB0", 2400)

try:
    if not ser.is_open:
        ser.open()

    command3 = b"\x5E\x50\x30\x30\x35\x47\x53\x58\x14\x0D"
    ser.write(command3)

    # The response is 111 characters long string
    s = ser.read(111)
    print(s)

finally:
    ser.close()
