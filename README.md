Ajax Request/Response Library
====

## Installation
```html
<script src="/path/to/ajax-request.js"></script>
```

## Initialization
```javascript
var ajax = AjaxRequest();
```

## Request
```javascript
ajax.request({
	debug: true,
	url: 'path/to/ajax.php',
	data: {
		foo: 'bar'
	}
});
```

## Response
```php
$ajax = new AjaxResponse();

$ajax->alert('foo');

echo json_encode($ajax->get());
```