import serial.tools.list_ports
ports = list(serial.tools.list_ports.comports())

Arduino_ports = []
for p in ports:
    if 'Arduino' in p.description:
        Arduino_ports.append(p)
if len(Arduino_ports) == 0:
    print("no Arduino board detected")

if len(Arduino_ports) > 1:
    print('Multiple Arduinos found - using the first')
else:
    print("Arduino board detected")

print(Arduino_ports[0].device)




