Ajax Request/Response Library
====

## Installation
```html
<script src="/path/to/ajax-request.js"></script>
```

## Basic Usage
### Request
```javascript
var ajax = AjaxRequest();

ajax.request({
	url: 'path/to/ajax.php',
	data: {
		foo: 'bar'
	}
});
```

### Response
```php
include 'AjaxResponse.php';

$ajax = new AjaxResponse();

$ajax->alert('foo');

echo json_encode($ajax->get());
```