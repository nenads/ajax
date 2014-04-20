<?php

require '../AjaxResponse.php';

$ajax = new AjaxResponse();

$ajax->call('bar', 'args');

echo $ajax->get(true);
