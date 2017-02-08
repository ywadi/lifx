var request = require('request');
var util = require('util');

function lifx(accessToken) {
	this.accessToken = accessToken;
}

lifx.prototype.listLights = function(selector, cb) {
	var url = createUri(this.accessToken, selector, "");
	cb = cb || function() {};
	sendRequest(url, "GET", null, function(err, res, body) {
		err = checkStatusError(err, res);
		return cb(err, body);
	});
};

lifx.prototype.togglePower = function(selector, cb) {
	var url = createUri(this.accessToken, selector, "/toggle");
	cb = cb || function() {};
	sendRequest(url, "POST", null, function(err, res, body) {
		err = checkForErrors(err, res, body);
		return cb(err, body);
	});
};

lifx.prototype.setPower = function(selector, _power, _duration, cb) {
	var url = createUri(this.accessToken, selector, "/state");
	cb = cb || function() {};
	var options = {
		power: _power || "on",
		duration: _duration || 1.0
	};
	sendRequest(url, "PUT", options, function(err, res, body) {
		err = checkForErrors(err, res, body);
		return cb(err, body);
	});
};

lifx.prototype.setColor = function(selector, _color, _duration, _power_on, cb) {
	var url = createUri(this.accessToken, selector, "/state");
	cb = cb || function() {};
	var options = {
		power: true,
		duration: _duration || 1.0,
		color: _color || "red"
	};
	sendRequest(url, "PUT", options, function(err, res, body) {
		err = checkForErrors(err, res, body);
		return cb(err, body);
	});
}



lifx.prototype.breatheEffect = function(selector, _color, _from_color, _period, _cycles, _persist, _power_on, _peak, cb) {
	var url = createUri(this.accessToken, selector, "/effects/breathe");
	cb = cb || function() {};
	var options = {
		color: _color || "red",
		from_color: _from_color || "blue",
		period: _period || 1.0,
		cycles: _cycles || 1.0,
		persist: _persist || false,
		power_on: _power_on || true,
		peak: _peak || 0.5
	};
	sendRequest(url, "POST", options, function(err, res, body) {
		err = checkForErrors(err, res, body);
		return cb(err, body);
	});
}

lifx.prototype.pulseEffect = function(selector, _color, _from_color, _period, _cycles, _persist, _power_on, cb) {
	var url = createUri(this.accessToken, selector, "/effects/pulse");
	cb = cb || function() {};
	var options = {
		color: _color || "red",
		from_color: _from_color || "blue",
		period: _period || 1.0,
		cycles: _cycles || 1.0,
		persist: _persist || false,
		power_on: _power_on || true
	}
	sendRequest(url, "POST", options, function(err, res, body) {
		err = checkForErrors(err, res, body);
		return cb(err, body);
	});
}

//--------------Private Functions----------------
function sendRequest(_url, _method, _data, _cb) {
	request({
		url: _url,
		method: _method,
		json: true,
		form: _data
	}, function(error, response, body) {
		_cb(error, response, body);
	});

}

function createUri(token, selector, path) {
	return util.format(
		'https://%s:@api.lifx.com/v1/lights/%s/%s',
		token,
		selector,
		path);
}

function checkForErrors(err, res, body) {

	if (err) {
		return err;
	}
	err = checkStatusError(err, res);

	if (err) {
		return err;
	}

	if (body && body.results && body.results instanceof Array) {
		if (body.results.length == 0) {
			return "No lights found.";
		} else {
			return null;
		}
	} else {
		return "Invalid object returned from lifx server";
	}

}


function checkStatusError(err, res) {

	if (err) {
		return err;
	}

	if (res.statusCode !== 200 && res.statusCode !== 207) {
		return "Invalid status code (" + res.statusCode + ") from lifx servers";
	} else {
		return null;
	}
}

module.exports = lifx;