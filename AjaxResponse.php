<?php

class AjaxResponse {

	private $buffer;

	public function __construct() {
		$this->clearBuffer();
	}

	public function __call($name, $arguments) {
		$this->push($name, $arguments);
	}

	public function fn($function, $args = null) {
		$this->push($function, array_slice(func_get_args(), 1));
	}

	public function pop() {
		return array_shift($this->buffer);
	}

	public function clearBuffer() {
		$this->buffer = array();
	}

	public function bufferSize() {
		return count($this->buffer);
	}

	public function getBuffer($jsonEncode = false) {
		$this->get($jsonEncode);
	}

	public function get($jsonEncode = false) {
		if ($jsonEncode === true) {
			return json_encode($this->buffer);
		}
		return $this->buffer;
	}

	public function alert($message) {
		$this->fn('alert', $message);
	}

	public function error($message) {
		$this->fn('error', $message);
	}

	public function exec($script) {
		$this->fn('exec', $script);
	}

	public function reloadPage() {
		$this->fn('reloadPage');
	}

	public function refreshPage() {
		$this->fn('refreshPage');
	}

	public function url($url) {
		$this->fn('url', $url);
	}

	public function html($html, $elem = null) {
		$this->fn('html', $html, $elem);
	}

	public function prepend($html, $elem = null) {
		$this->fn('prepend', $html, $elem);
	}

	public function append($html, $elem = null) {
		$this->fn('append', $html, $elem);
	}

	public function dump($expression) {
		$this->alert(var_export($expression, true));
	}

	public function setcookie($name, $value, $expire = 0, $path = null, $domain = null, $secure = false) {
		$this->fn('setcookie', $name, $value, $expire, $path, $domain, $secure);
	}

	public function call($function, $args = null) {
		$this->fn('call', $function, array_slice(func_get_args(), 1));
	}

	protected function push($name, $arguments = array()) {
		$this->buffer[] = array('fn' => $name, 'args' => $arguments);
	}

}
