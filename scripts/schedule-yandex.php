<?php
$source = "https://calendar.yandex.ru/export/html.xml?private_token=073e91671b007918376f4e098f782916cf5c32f3&tz_id=Europe/Moscow&limit=50";
$destination = "./domains/hotyoga36.com/public_html/schedule-yandex.html";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $source);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//curl_setopt($ch, CURLOPT_SSLVERSION, 3);
$data = curl_exec($ch);
$error = curl_error($ch); 
curl_close ($ch);

$file = fopen($destination, "w+");
fputs($file, $data);
fclose($file);