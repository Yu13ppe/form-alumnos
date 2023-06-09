$(document).ready(function () {
    cargarAlumnos();
  
    $("#alumno-form").submit(function (event) {
      event.preventDefault();
  
      var cedula = $("#cedula").val();
      var nombre = $("#nombre").val();
      var matematicas = parseInt($("#matematicas").val());
      var fisica = parseInt($("#fisica").val());
      var programacion = parseInt($("#programacion").val());
  
      var alumno = {
        cedula: cedula,
        nombre: nombre,
        matematicas: matematicas,
        fisica: fisica,
        programacion: programacion
      };
      
        $("#exampleModal").modal("hide"); 
      guardarAlumno(alumno);
      limpiarFormulario();

      
    });
  });
  
  function cargarAlumnos() {
    $.ajax({
      url: "cargar_alumnos.php",
      type: "GET",
      success: function (response) {
        var alumnos = JSON.parse(response);
        var template = "";
  
        alumnos.forEach(function (alumno) {
          template += `
            <tr>
              <td>${alumno.cedula}</td>
              <td>${alumno.nombre}</td>
              <td>${alumno.matematicas}</td>
              <td>${alumno.fisica}</td>
              <td>${alumno.programacion}</td>
            </tr>
          `;
        });
  
        $("#tbody-alumnos").html(template);
        calcularTotales(alumnos);
        calcularPromedios(alumnos);
        calcularMaximasNotas(alumnos);
        contarAprobados(alumnos);
      }
    });
  }
  
  function guardarAlumno(alumno) {
    $.ajax({
      url: "registrar_alumno.php",
      type: "POST",
      data: alumno,
      success: function (response) {
        cargarAlumnos();
      }
    });
  }
  
  function limpiarFormulario() {
    $("#cedula").val("");
    $("#nombre").val("");
    $("#matematicas").val("");
    $("#fisica").val("");
    $("#programacion").val("");
  }
  
  function calcularTotales(alumnos) {
    var totalMatematicas = 0;
    var totalFisica = 0;
    var totalProgramacion = 0;
  
    alumnos.forEach(function (alumno) {
      totalMatematicas += parseInt(alumno.matematicas);
      totalFisica += parseInt(alumno.fisica);
      totalProgramacion += parseInt(alumno.programacion);
    });
  
    $("#total-matematicas").text(totalMatematicas);
    $("#total-fisica").text(totalFisica);
    $("#total-programacion").text(totalProgramacion);
  }
  
  function calcularPromedios(alumnos) {
    var promedioMatematicas = 0;
    var promedioFisica = 0;
    var promedioProgramacion = 0;
  
    if (alumnos.length > 0) {
      var totalMatematicas = parseInt($("#total-matematicas").text());
      var totalFisica = parseInt($("#total-fisica").text());
      var totalProgramacion = parseInt($("#total-programacion").text());
  
      promedioMatematicas = totalMatematicas / alumnos.length;
      promedioFisica = totalFisica / alumnos.length;
      promedioProgramacion = totalProgramacion / alumnos.length;
    }
  
    $("#promedio-matematicas").text(promedioMatematicas.toFixed(2));
    $("#promedio-fisica").text(promedioFisica.toFixed(2));
    $("#promedio-programacion").text(promedioProgramacion.toFixed(2));
  }
  
  function calcularMaximasNotas(alumnos) {
    var maximaMatematicas = 0;
    var maximaFisica = 0;
    var maximaProgramacion = 0;
  
    alumnos.forEach(function (alumno) {
      if (alumno.matematicas > maximaMatematicas) {
        maximaMatematicas = alumno.matematicas;
      }
  
      if (alumno.fisica > maximaFisica) {
        maximaFisica = alumno.fisica;
      }
  
      if (alumno.programacion > maximaProgramacion) {
        maximaProgramacion = alumno.programacion;
      }
    });
  
    $("#maxima-matematicas").text(maximaMatematicas);
    $("#maxima-fisica").text(maximaFisica);
    $("#maxima-programacion").text(maximaProgramacion);
  }
  
  function contarAprobados(alumnos) {
    var aprobadosTodas = 0;
    var aprobadosUna = 0;
    var aprobadosDos = 0;
    var aprobadosMatematicas = 0;
    var aprobadosFisica = 0;
    var aprobadosProgramacion = 0;
    var reprobadosMatematicas = 0;
    var reprobadosFisica = 0;
    var reprobadosProgramacion = 0;
  
    alumnos.forEach(function (alumno) {
      var notasAprobadas = 0;
  
      if (alumno.matematicas >= 10) {
        notasAprobadas++;
        aprobadosMatematicas++;
      } else {
        reprobadosMatematicas++;
      }
  
      if (alumno.fisica >= 10) {
        notasAprobadas++;
        aprobadosFisica++;
      } else {
        reprobadosFisica++;
      }
  
      if (alumno.programacion >= 10) {
        notasAprobadas++;
        aprobadosProgramacion++;
      } else {
        reprobadosProgramacion++;
      }
  
      if (notasAprobadas == 3) {
        aprobadosTodas++;
      } else if (notasAprobadas == 1) {
        aprobadosUna++;
      } else if (notasAprobadas == 2) {
        aprobadosDos++;
      }
    });
  
    $("#aprobados-todas").text(aprobadosTodas);
    $("#aprobados-una").text(aprobadosUna);
    $("#aprobados-dos").text(aprobadosDos);
    $("#aprobados-matematicas").text(aprobadosMatematicas);
    $("#aprobados-fisica").text(aprobadosFisica);
    $("#aprobados-programacion").text(aprobadosProgramacion);
    $("#reprobados-matematicas").text(reprobadosMatematicas);
    $("#reprobados-fisica").text(reprobadosFisica);
    $("#reprobados-programacion").text(reprobadosProgramacion);
  }
  