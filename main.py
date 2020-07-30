import pyfirmata
import time
from pynput.keyboard import Key, Controller
import serial.tools.list_ports
import eel

eel.init('web')


keyboard = Controller()
ports = list(serial.tools.list_ports.comports())


def detect_ports():
    arduino_ports = []
    for p in ports:
        if 'Arduino' in p.description:
            arduino_ports.append(p)

    return arduino_ports


a = detect_ports()


def check_hw():
    ack = 0
    if a:
        ack = 1
        print(ack)
        print("Board found")
        print(a[0].device)
        board = pyfirmata.Arduino(str(a[0].device))
    else:
        ack = 2
        print("No arduino found")
        print(ack)


def execute(board, pin):
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



eel.start('index.html', size=(330, 300))

