var go = module.exports = function() {
var Client = require('node-ssdp').Client
client = new Client();
devices = []
client.on('response', function (headers, statusCode, rinfo) {
devices[devices.length] = {
'headers' : headers,
'statusCode' : statusCode,
'rinfo' : rinfo
}
console.log('\x1b[44m\x1b[33m<<<\x1b[32m DEVICE FOUND \x1b[33m>>>\x1b[0m');
});
// search for a service type 
client.search("urn:Belkin:device:socket:1");
client.search("urn:Belkin:device:insight:1");
client.search("urn:Belkin:device:lightswitch:1");
client.search("urn:Belkin:device:NetCamSensor:1");
client.search("urn:Belkin:device:sensor:1");
client.search("urn:Belkin:device:controllee:1");
client.search("urn:Belkin:device-1-0")
if (devices[0] === undefined) {
	client.search("ssdp:all");
	console.log('\x1b[44m\x1b[33m<<<\x1b[32m COULD NOT FIND ANY WEMO DEVICES: \x1b[33m>>>\x1b[0m');
	console.log('\x1b[44m\x1b[33m<<<\x1b[32m FINDING ALL DEVICES ON NETWORK INSTEAD! \x1b[33m>>>\x1b[0m')
}
return console.log('\x1b[44m\x1b[33m<<<\x1b[32m LOADED FINDER \x1b[33m>>>\x1b[0m');
}