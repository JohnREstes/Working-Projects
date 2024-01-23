import serial

ser = serial.Serial("/dev/ttyUSB0", 2400)

ser.close()
ser.open()

command3 = b"\x5E\x50\x30\x30\x35\x47\x53\x58\x14\x0D"

ser.write(command3)
print("reading")
s = ser.read(111)  # The response is 111 characters long string

print(s)
