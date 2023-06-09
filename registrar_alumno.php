<?php

if (isset($_POST['cedula']) && isset($_POST['nombre']) && isset($_POST['matematicas']) && isset($_POST['fisica']) && isset($_POST['programacion'])) {
    $cedula = $_POST['cedula'];
    $nombre = $_POST['nombre'];
    $matematicas = $_POST['matematicas'];
    $fisica = $_POST['fisica'];
    $programacion = $_POST['programacion'];

    $alumno = [
        'cedula' => $cedula,
        'nombre' => $nombre,
        'matematicas' => $matematicas,
        'fisica' => $fisica,
        'programacion' => $programacion
    ];

    
    $alumnos = file_exists('alumnos.json') ? json_decode(file_get_contents('alumnos.json'), true) : [];


    $alumnos[] = $alumno;

    file_put_contents('alumnos.json', json_encode($alumnos));
 


    echo "Alumno registrado exitosamente.";
} else {
    echo "Error al registrar el alumno. Por favor, complete todos los campos.";
}
?>
