var AjaxRequest = function(settings) {
	var $ajax = this;

	$ajax.fn = {};

	$ajax.options = {};

	$ajax.init = function() {

		if (typeof jQuery === "undefined") {
			alert("Ajax Init Error: jQuery not found!");
			return false;
		}

		$ajax.options = {
			url: false,
			async: true,
			debug: false,
			timeout: 10000,
			object: false,
			data: {},
			headers: {},
			auth: {
				username: '',
				password: ''
			},
			complete: null,
			success: null,
			error: null,
			statusCode: {},
			fn: $ajax.fn
		};

		$ajax.options = $.extend(true, $ajax.options, settings || {});
	};

	$ajax.request = function(options) {

		var $req = this;

		$req.requestStart = new Date().getTime();
		$req.requestEnd = 0;

		if (typeof options == 'undefined') {
			options = {};
		}

		if (typeof options != 'object') {
			$ajax.error("The passed 'options' param is invalid!");
		}

		$req.options = $.extend(true, $ajax.options, options);

		$req.object = function(req, obj) {
			if (obj) {
				return typeof obj == 'object' ? obj : $(obj);
			}
			if (typeof req.options.object == 'object') {
				return req.options.object;
			}
			return $(req.options.object);
		};

		$req.saveRequestEnd = function() {
			$req.requestEnd = new Date().getTime();
		};

		$req.onSuccess = function(data, status, jqXHR) {
			var json = {};

			if (data.length == 0) {
				$ajax.error("The response is empty");
				return false;
			}

//			if (!data.match(/^[\[\{].+[\]\}]$/i)) {
//				$ajax.throwError("The response syntax is invalid");
//				return false;
//			}

			try {
				json = jQuery.parseJSON(data);
			} catch (error) {
				$ajax.error("JSON error: " + error);
				return false;
			}

			$.each(json, function(i, command) {
				if (typeof $ajax.options.fn[command.fn] == "function") {
					try {
						$ajax.options.fn[command.fn].apply($req || window, command.args);
					} catch (error) {
						$ajax.error("'" + command.fn + "' error:\n" + error);
					}
				} else {
					$ajax.error("method '" + command.fn + "' not found");
				}
			});
		};

		$req.onError = function(jqXHR, status, error) {
			$ajax.error("Request error: " + error);
		};

		$req.onComplete = function(jqXHR, status) {
			if ($req.options.debug) {
				if (typeof console.log == 'function') {
					console.log("AjaxRequest - Status: " + status + "; Time: " + (($req.requestEnd - $req.requestStart) / 1000) + " sec;");
				}
			}
		};

		if (!$req.options.url) {
			$ajax.error("The request URL is not set!");
		}

		$.ajax({
			type: "POST",
			url: $req.options.url,
			dataType: 'html',
			data: $req.options.data,
			async: $req.options.async,
			headers: $req.options.headers,
			timeout: $req.options.timeout,
			error: [$req.saveRequestEnd, $req.onError, $req.options.error],
			success: [$req.saveRequestEnd, $req.onSuccess, $req.options.success],
			complete: [$req.onComplete, $req.options.complete],
			statusCode: $req.options.statusCode
		});

	};

	$ajax.error = function(message) {
		message = 'AjaxRequest - ' + message;
		if ($ajax.options.debug === true) {
			alert(message.toString());
		} else {
			if (console.error) {
				console.error(message.replace("\n", " ").toString());
			}
		}
	};

	$ajax.fn.alert = function(message) {
		alert(message);
	};

	$ajax.fn.exec = function(script) {
		var object = this.object(this, null);
		eval(script);
	};

	$ajax.fn.html = function(html, object) {
		this.object(this, object).html(html);
	};

	$ajax.fn.prepend = function(html, object) {
		this.object(this, object).prepend(html);
	};

	$ajax.fn.append = function(html, object) {
		this.object(this, object).append(html);
	};

	$ajax.fn.error = function(message) {
		$ajax.error("Error: " + message);
	};

	$ajax.fn.url = function(href) {
		document.location.replace(href);
	};

	$ajax.fn.reloadPage = function() {
		window.location.replace(window.location.href);
	};

	$ajax.fn.refreshPage = function() {
		window.location.reload(true);
	};

	$ajax.fn.nop = function() {
	};

	$ajax.fn.setcookie = function(c) {
		if ($.cookie) {
			$.cookie(c.name, c.value, {path: c.path ? c.path : '/',
				domain: c.domain,
				secure: c.secure,
				expires: c.value === null ? -1 : (c.expire === 0 ? null : c.expire)
			});
		} else {
			$ajax.error("The jQuery.cookie plugin is not found!");
		}
	};

	$ajax.fn.call = function(name, args) {
		var object = this.object(this, null);
		if (object[name]) {
			object[name].apply(object || window, args);
		} else {
			$ajax.error("The Object::" + name + "() method not found");
		}
	};

	$ajax.fn.urlencode = function(string) {
		return encodeURIComponent(string);
	};

	$ajax.fn.urldecode = function(string) {
		return decodeURIComponent((string + '').replace(/\+/g, ' '));
	};

	$ajax.init();
};


if (typeof ajax == 'undefined') {
	ajax = new AjaxRequest();
}
