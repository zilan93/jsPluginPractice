<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>抽奖</title>
</head>
<body>
<h3>
<?php
$name = $_REQUEST["name"];
$phone = $_REQUEST["mobile"];
$id = $_REQUEST["id"];
if(isset($name) && isset($phone) && isset($id)) {
echo "<h3>$name</h3>\n<p>您的获奖信息我们将发到您的手机$phone上，请注意查收。</p>";
};
?>
</body>
</html>