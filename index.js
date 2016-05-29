var Client = require('node-ssdp').Client;
var Finder = module.exports = function () {
	if (Finder.client === undefined) {
		Finder.client = new Client();
		Finder.devices = [];
		Finder.client.on('response', function (headers, statusCode, rinfo) {

				var Send = {
				'headers': headers,
				'statusCode': statusCode,
				'rinfo': rinfo,
				'ip': headers.LOCATION.slice(7, headers.LOCATION.length - 10)
			};

			Finder.devices[Finder.devices.length] = Send;
			console.log('\x1b[44m\x1b[33m<<<\x1b[32m WEMO DEVICE FOUND \x1b[33m>>>\x1b[0m');
			console.log('\x1b[44m\x1b[33m<<<\x1b[32m IP: ' + Send.ip + ' \x1b[33m>>>\x1b[0m');
		});

		// search for a service type
		Finder.client.search("urn:Belkin:device:controllee:1");
		console.log('\x1b[44m\x1b[33m<<<\x1b[32m LOADED FINDER \x1b[33m>>>\x1b[0m');
		return "made by puppy0cam A.K.A. Cameron";
	} else {
		Finder.devices = [];
		Finder.client.search("urn:Belkin:device:controllee:1");
	}
};
