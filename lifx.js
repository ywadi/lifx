var request = require('request');
var util = require('util');

function lifx(accessToken) {
	this.accessToken = accessToken;
}

lifx.prototype.listLights = function(selector, cb) {
	var url = createUri(this.accessToken, selector, "");
	if (!cb) {
		return cb("Callback Function not defined after selector");
	}
	sendRequest(url, "GET", null, function(err, res, body) {
		return cb(err, body);
	});
};

lifx.prototype.togglePower = function(selector, cb) {
	var url = createUri(this.accessToken, selector, "/toggle");
	if (!cb) {
		return cb("Callback Function not defined after selector");
	}
	sendRequest(url, "POST", null, function(err, res, body) {
		return cb(err, body);
	});
};

lifx.prototype.setPower = function(selector, _state, _duration, cb) {
	var url = createUri(this.accessToken, selector, "/power");
	cb = cb || function() {};
	var options = {
		state: _state || "on",
		duration: _duration || "1.0"
	};
	sendRequest(url, "PUT", options, function(err, res, body) {
		cb(err, body);
	});
};

lifx.prototype.setColor = function(selector, _color, _duration, _power_on, cb) {
	var url = createUri(this.accessToken, selector, "/color");
    cb = cb || function() {};
    var options = {
        power_on: _power_on || true,
        duration: _duration || "1.0",
        color: _color || "red"
    };
	sendRequest(url, "PUT", options, function(err, res, body) {
		cb(err, body);
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
		cb(err, body);
	});
}

lifx.prototype.pulseEffect = function(selector, _color, _from_color, _period, _cycles, _persist, _power_on, cb) {
    var url = createUri(this.accessToken, selector, "/effects/pulse");
	cb = cb || function() {};
    var options = {
        color: _color || "red",
        from_color: _from_color || "blue",
        period: _period|| 1.0,
        cycles: _cycles || 1.0,
        persist: _persist || false,
        power_on: _power_on || true
    }
	sendRequest(url, "POST", options, function(err, res, body) {
		cb(err, body);
	});
}

//--------------Private Functions----------------
function sendRequest(_url, _method, _data, _cb) {
	request({
		url: _url,
		method: _method,
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

module.exports = lifx;