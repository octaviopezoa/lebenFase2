$(document).ready(function() {
  $("#contacto").validate({
    rules: {
			nombre: "required",
			telefono: "required",
      email: {
        email: true,
        required: true
      },      
      // rut: {
      //   validateRut: true,
      //   required: true
      // },
      plazo: {
        selectedPlazo: true
      },
      planta: {
        selectedPlanta: true
      }
      // motivo: {
      //   selectedMotivo: true
      // }
    },
    messages: {
      nombre: "Por favor ingrese su nombre",
      email: {
        email: "Por favor ingrese un email válido",
        required: "Por favor ingrese un email"
      },
      telefono: "Por favor ingrese un teléfono",
      // rut: {
      //   validateRut: "Por favor ingrese un rut válido",
      //   required: "Por favor ingrese un rut"
      // },
      plazo: {
        selectedPlazo: "Por favor seleccione un plazo"
      },
      planta: {
        selectedPlanta: "Por favor seleccione una tipología"
      }
      // motivo: {
      //   selectedMotivo: "Por favor seleccione un motivo"
      // }
    },
    submitHandler: function(form) {
			let datosFormulario = new FormData(form);
			
      $.ajax({
        url: "assets/php/contacto.php",
        method: "POST",
        data: datosFormulario,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function() {
          Swal.fire({
            type: 'success',
            title: 'Estamos procesando su formulario',
            showConfirmButton: false,
            timer: 3000
          });
        },
        success: function(response) {

          if (response == "success") {
            Swal.fire({
              type: 'success',
              title: 'Formulario enviado exitosamente.',
              showConfirmButton: false,
              timer: 3000
            });
            
            $("#contacto").trigger("reset");
            
          } else {
            Swal.fire({
              type: 'error',
              title: 'No se pudo enviar su formulario.  Intente nuevamente.',
              showConfirmButton: false,
              timer: 3000
            });
            $("#contacto").trigger("reset");
            // console.log("reset form");
            
            console.log(response);
          }
        }
      });
    }
  });
});

// $.validator.addMethod("validateRut", function() {
//   if (validateR($("#rut").val())) {
//     let rutFormateado = format($("#rut").val());
//     $("#rut").val(rutFormateado);
//     return true;
//   } else {
//     return false;
//   }
// });

$.validator.addMethod("selectedPlazo", function() {
  if ($("#plazo").val() == "") {
    $("#control-plazo").css("height", "56px");
    return false;
  } else {
    $("#control-plazo").css("height", "28px");
    return true;
  }
});

$.validator.addMethod("selectedPlanta", function() {
  if ($("#planta").val() == "") {
    $("#control-planta").css("height", "56px");
    return false;
  } else {
    $("#control-planta").css("height", "28px");
    return true;
  }
});

// $.validator.addMethod("selectedMotivo", function() {
//   if ($("#motivo").val() == "") {
//     $("#control-motivo").css("height", "56px");
//     return false;
//   } else {
//     $("#control-motivo").css("height", "28px");
//     return true;
//   }
// });

//Función para Rut
function clean(elrut) {
  return typeof elrut === "string"
    ? elrut.replace(/^0+|[^0-9kK]+/g, "").toUpperCase()
    : "";
}

function validateR(elrut) {
  if (typeof elrut !== "string") {
    return false;
  }
  if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(elrut)) {
    return false;
  }

  elrut = clean(elrut);

  var t = parseInt(elrut.slice(0, -1), 10);
  var m = 0;
  var s = 1;

  while (t > 0) {
    s = (s + (t % 10) * (9 - (m++ % 6))) % 11;
    t = Math.floor(t / 10);
  }

  var v = s > 0 ? "" + (s - 1) : "K";
  return v === elrut.slice(-1);
}

function format(elrut) {
  elrut = clean(elrut);

  var result = elrut.slice(-4, -1) + "-" + elrut.substr(elrut.length - 1);
  for (var i = 4; i < elrut.length; i += 3) {
    result = elrut.slice(-3 - i, -i) + "." + result;
  }

  return result;
}
