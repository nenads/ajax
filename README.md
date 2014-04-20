Ajax Request/Response Library
====

## Installation
```html
<script src="/path/to/ajax-request.js"></script>
```

## Request
```javascript
var ajax = AjaxRequest();

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