import pyfirmata
import time
from pynput.keyboard import Key, Controller
import serial.tools.list_ports
import eel

eel.init('web')
keyboard = Controller()
ports = list(serial.tools.list_ports.comports())


@eel.expose
def check_hw():
    arduino_ports = []
    ack = 0
    for p in ports:
        if 'Arduino' in p.description:
            arduino_ports.append(p)
    if arduino_ports:
        ack = 1
    else:
        ack = 2
    return ack, arduino_ports[0].device


@eel.expose
def execute(board, pin):
    it = pyfirmata.util.Iterator(board)
    it.start()

    board.digital[pin].mode = pyfirmata.INPUT

    while True:
        sw = board.digital[pin].read()
        if sw is True:
            board.digital[13].write(1)
            keyboard.press(Key.space)
            print("Pressed")
        else:
            board.digital[13].write(0)
            keyboard.release(Key.space)
        time.sleep(0.1)


@eel.expose
def go():
    ack, device = check_hw()
    board = pyfirmata.Arduino(str(device))
    execute(board, 7)


eel.start('index.html', size=(330, 300))
