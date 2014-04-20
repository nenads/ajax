<!DOCTYPE html>
<html>
	<head>
		<script type="text/javascript" src="libs/js/jquery-1.11.0.min.js" ></script>
		<script type="text/javascript" src="libs/js/jquery.cookie.js" ></script>
		<script type="text/javascript" src="../ajax-request.js"></script>
	</head>
	<body>
		<table>
			<tr>
				<td>first</td>
				<td id="first"></td>
			</tr>
			<tr>
				<td>second</td>
				<td id="second"></td>
			</tr>
			<tr>
				<td>third</td>
				<td id="third"></td>
			</tr>
		</table>
		<script type="text/javascript">

			var foo = function() {
				var self = this;

				this.init = function() {

					ajax.request({
						url: 'ajax.php',
						object: self
					});

				};

				this.bar = function(text) {
					alert(['foo called', text]);
				};

				this.init();
			};

			$(document).on('ready', function() {
				ajax = new AjaxRequest({
					debug: true,
					fn: {
						foo: function() {
							alert();
						}
					}
				});

				new foo();
			});
		</script>
	</body>
</html>