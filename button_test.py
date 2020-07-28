import pyfirmata
import time
from pynput.keyboard import Key, Controller
keyboard = Controller()
board = pyfirmata.Arduino('/dev/cu.usbmodem141101')

it = pyfirmata.util.Iterator(board)
it.start()

board.digital[2].mode = pyfirmata.INPUT

while True:
    sw = board.digital[2].read()
    if sw is True:
        board.digital[13].write(1)
        keyboard.press('b')
        print("Pressed")
    else:
        board.digital[13].write(0)
        keyboard.release('b')
    time.sleep(0.1)

