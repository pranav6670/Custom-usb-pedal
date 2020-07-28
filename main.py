import pyfirmata
import time
from pynput.keyboard import Key, Controller
import serial.tools.list_ports

pin = 7

keyboard = Controller()
ports = list(serial.tools.list_ports.comports())

def detect_ports():
    arduino_ports = []
    for p in ports:
        if 'Arduino' in p.description:
            arduino_ports.append(p)
    if len(arduino_ports) == 0:
        print("no Arduino board detected")
    if len(arduino_ports) > 1:
        print('Multiple Arduinos found - using the first')
    else:
        print("Arduino board detected")

    return arduino_ports

a = detect_ports()
print(a[0].device)

board = pyfirmata.Arduino(str(a[0].device))

it = pyfirmata.util.Iterator(board)
it.start()

board.digital[pin].mode = pyfirmata.INPUT

while True:
    sw = board.digital[pin].read()
    if sw is True:
        board.digital[13].write(1)
        keyboard.press('b')
        print("Pressed")
    else:
        board.digital[13].write(0)
        keyboard.release('b')
    time.sleep(0.1)
