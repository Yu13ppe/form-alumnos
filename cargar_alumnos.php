<?php
$alumnos = file_exists('alumnos.json') ? json_decode(file_get_contents('alumnos.json'), true) : [];

echo json_encode($alumnos);
?>
