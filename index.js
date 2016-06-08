var http = require('http');
var Client = require('node-ssdp').Client;
function findIp(LOCATION) {
var i = LOCATION.slice(LOCATION.search('/')+2)
var i1 = i.slice(0, i.search('/'))
return i1
}
var Finder = module.exports = function () {
	Finder.list = []
	if (Finder.client === undefined) {
		Finder.client = new Client();
		Finder.devices = [];
		Finder.client.on('response', function (headers, statusCode, rinfo) {

			var Send = {
				'headers' : headers,
				'statusCode' : statusCode,
				'rinfo' : rinfo,
				'ip' : findIp(headers.LOCATION)
			};
			Send.getState = function () {
				var options = {
					"method" : "POST",
					"hostname" : this.ip.slice(0, this.ip.length - 6),
					"port" : this.ip.slice(this.ip.length - 5),
					"path" : "/upnp/control/basicevent1",
					"headers" : {
						"content-type" : "text/xml; \\\"charset=utf-8\\\"",
						"soapaction" : "\\\"urn:Belkin:service:basicevent:1#GetBinaryState\\\"",
						"cache-control" : "no-cache"
					}
				};

				var req = http.request(options, function (res) {
						var chunks = [];

						res.on("data", function (chunk) {
							chunks.push(chunk);
						});

						res.on("end", function () {
							var body = Buffer.concat(chunks);
							console.log(body.toString());
						});
					});

				req.write("<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\" s:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"><s:Body><u:GetBinaryState xmlns:u=\"urn:Belkin:service:basicevent:1\"></u:GetBinaryState></s:Body></s:Envelope>");
				req.end();
			}
			Send.on = function () {
				var http = require('http');
				var options = {
					"method" : "POST",
					"hostname" : this.ip.slice(0, this.ip.length - 6),
					"port" : this.ip.slice(this.ip.length - 5),
					"path" : "/upnp/control/basicevent1",
					"headers" : {
						"content-type" : "text/xml; \\\"charset=utf-8\\\"",
						"soapaction" : "\\\"urn:Belkin:service:basicevent:1#SetBinaryState\\\"",
						"cache-control" : "no-cache"
					}
				};

				var req = http.request(options, function (res) {
						var chunks = [];

						res.on("data", function (chunk) {
							chunks.push(chunk);
						});

						res.on("end", function () {
							var body = Buffer.concat(chunks);
							console.log(body.toString());
						});
					});

				req.write("<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\" s:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"><s:Body><u:SetBinaryState xmlns:u=\"urn:Belkin:service:basicevent:1\"><BinaryState>1</BinaryState></u:SetBinaryState></s:Body></s:Envelope>");
				req.end();

			}
			Send.off = function () {
				var http = require('http');
				var options = {
					"method" : "POST",
					"hostname" : this.ip.slice(0, this.ip.length - 6),
					"port" : this.ip.slice(this.ip.length - 5),
					"path" : "/upnp/control/basicevent1",
					"headers" : {
						"content-type" : "text/xml; \\\"charset=utf-8\\\"",
						"soapaction" : "\\\"urn:Belkin:service:basicevent:1#SetBinaryState\\\"",
						"cache-control" : "no-cache"
					}
				};

				var req = http.request(options, function (res) {
						var chunks = [];

						res.on("data", function (chunk) {
							chunks.push(chunk);
						});

						res.on("end", function () {
							var body = Buffer.concat(chunks);
							console.log(body.toString());
						});
					});

				req.write("<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\" s:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"><s:Body><u:SetBinaryState xmlns:u=\"urn:Belkin:service:basicevent:1\"><BinaryState>0</BinaryState></u:SetBinaryState></s:Body></s:Envelope>");
				req.end();

			}
			Finder.devices[Finder.devices.length] = Send;
			Finder.list[Finder.list.length] = {
				"ST": headers.ST,
				"ip": Send.ip
			};
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
