var Client = require('node-ssdp').Client
var Finder = module.exports
Finder._client = new Client();
Finder._devices = []
Finder._client.on('response', function (headers, statusCode, rinfo) {
var Send = {
'headers' : headers,
'statusCode' : statusCode,
'rinfo' : rinfo
}
var Used = '"' + JSON.stringify(Send) + '"'

if(Used.includes("Belkin") === true) {
Finder._devices[Finder._devices.length] = Send
console.log('\x1b[44m\x1b[33m<<<\x1b[32m WEMO DEVICE FOUND \x1b[33m>>>\x1b[0m');
console.log('\x1b[44m\x1b[33m<<<\x1b[32m SAVED INFO \x1b[33m>>>\x1b[0m');
}
});
// search for a service type
Finder._client.search("ssdp:all");
Finder._client.search("upnp:rootdevice");
if (Finder._devices[1] === undefined) {
console.log('\x1b[44m\x1b[33m<<<\x1b[32m COULD NOT FIND ANY WEMO DEVICES: \x1b[33m>>>\x1b[0m');
}
console.log('\x1b[44m\x1b[33m<<<\x1b[32m LOADED FINDER \x1b[33m>>>\x1b[0m');
