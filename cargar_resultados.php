<?php
$alumnos = file_exists('alumnos.json') ? json_decode(file_get_contents('alumnos.json'), true) : [];

$totalMatematicas = 0;
$totalFisica = 0;
$totalProgramacion = 0;
$aprobadosMatematicas = 0;
$aprobadosFisica = 0;
$aprobadosProgramacion = 0;
$reprobadosMatematicas = 0;
$reprobadosFisica = 0;
$reprobadosProgramacion = 0;

foreach ($alumnos as $alumno) {
    $totalMatematicas += $alumno['matematicas'];
    $totalFisica += $alumno['fisica'];
    $totalProgramacion += $alumno['programacion'];

    if ($alumno['matematicas'] >= 10) {
        $aprobadosMatematicas++;
    } else {
        $reprobadosMatematicas++;
    }

    if ($alumno['fisica'] >= 10) {
        $aprobadosFisica++;
    } else {
        $reprobadosFisica++;
    }

    if ($alumno['programacion'] >= 10) {
        $aprobadosProgramacion++;
    } else {
        $reprobadosProgramacion++;
    }
}

$promedioMatematicas = $totalMatematicas / count($alumnos);
$promedioFisica = $totalFisica / count($alumnos);
$promedioProgramacion = $totalProgramacion / count($alumnos);

$resultados = [
    'promedio_matematicas' => round($promedioMatematicas, 2),
    'promedio_fisica' => round($promedioFisica, 2),
    'promedio_programacion' => round($promedioProgramacion, 2),
    'aprobados_matematicas' => $aprobadosMatematicas,
    'aprobados_fisica' => $aprobadosFisica,
    'aprobados_programacion' => $aprobadosProgramacion,
    'reprobados_matematicas' => $reprobadosMatematicas,
    'reprobados_fisica' => $reprobadosFisica,
    'reprobados_programacion' => $reprobadosProgramacion
];

header('Content-Type: application/json');
echo json_encode($resultados);
?>
