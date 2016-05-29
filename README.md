# Wemo Device Finder for Node.js

Hunts down all Belkin Devices on the network

## Supported Devices

all Belkin devices that support UPnP (urn:Belkin:device:controllee:1 is a UPnP urn used by most wemo devices)

## Install

open a command line and run:
```bash
npm install wemo-finder
```

## Usage
please note that console will be notified for Belkin device found
```javascript
var your_variable = require('wemo-finder');
new your_variable();
```

## API

device information for the first device found can be found under:
```javascript
your_variable._devices[0]
```

## Contributing

Contributing to the code is very welcome and will help for future versions

## License

Published without a license.
