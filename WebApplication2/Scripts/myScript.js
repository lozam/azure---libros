var url = "https://alumnos-mcsd2014.azure-mobile.net/tables/libros";

var leer = function () {

    $.ajax(url, {
        method: "GET",
        contentType: "application/json",
        crossDomain: true,
        datatype: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("header", "valor");
        },
        success: function(xhr) {
            console.log(xhr);
            cargarDatos(xhr);
        },
        error: function(err) {
            alert(err);

        }
    });
};

var cargarDatos = function (datos) {
    // $("#datosCargados").append("<table id='tablaDatos'></table>");
    //$("#datosCargados").remove();
    $("#datosCargados").empty();

    $.each(datos, function (i, dato) {
        var fila = "<tr id="+ dato.id +">";
        fila += "<td> <span class='soloLectura'>" + dato.isbn + "</span> <input type='text' value='" + dato.isbn + "' style='display:none;' placeholder='>> " + dato.isbn + "' class='form-control input-sm edicion isbn' /></td>";
        fila += "<td> <span class='soloLectura'>" + dato.titulo + "</span> <input type='text' value='" + dato.titulo + "' style='display:none;' placeholder='" + dato.titulo + "'  class='form-control input-sm edicion titulo' /></td>";
        fila += "<td> <span class='soloLectura'>" + dato.paginas + "</span> <input type='text' value='" + dato.paginas + "' style='display:none;' placeholder='" + dato.paginas + "'  class='form-control input-sm edicion paginas' /></td>";
        fila += "<td> <span class='soloLectura'>" + dato.unidades + "</span> <input type='text' value='" + dato.unidades + "' style='display:none;' placeholder='" + dato.unidades + "'  class='form-control input-sm edicion unidades' /></td>";
        fila += "<td><button class='btn btn-info btn-xs btnEditar' data-editar=" + dato.id + " onclick='editar(this)'> Editar </button>";
        fila += "<button class='btn btn-info btn-xs btnConfirmar' data-confirmar=" + dato.id + " onclick='confirmarDatos(this)' style='display:none'> Confirmar </button></td>";
        fila += "<td><button class='btn btn-warning btn-xs btnEliminar' data-eliminar=" + dato.id + " onclick='borrar(this)'> Eliminar </button></td>";
        fila += "</tr>";
        $("#datosCargados").append(fila);

    });

};

var borrar = function (evt) {
    var idelemento = evt.getAttribute("data-eliminar");
    //var urlFinal = url + "alumnos/" + idelemento.split("-")[1];
    console.log(idelemento);
    var urlFinal = url + "/" + idelemento;

    var ajax = new XMLHttpRequest();
    ajax.open("DELETE", urlFinal);

    ajax.onreadystatechange = function () {

        if (ajax.readyState != 4)
            return;

        if (ajax.status >= 200 && ajax.status < 300) {
            leer();

        } else {

            alert("Error borrando datos");
        }

    };

    ajax.send(null);

};

// api odata de azure mobile -->  $filter=substringof('texto', campo)

//este método añade datos ala tabla de la bbdd de azure
var escribirDatos = function () {
    var urlFinal = url;

    var ajax = new XMLHttpRequest();
    //var id = document.getElementById("isbn").value;
    var json = {
        isbn: document.getElementById("isbn").value,
        titulo: document.getElementById("titulo").value,
        paginas: document.getElementById("paginas").value,
        unidades: document.getElementById("vendidas").value
    };

    ajax.open("POST", urlFinal);

    ajax.setRequestHeader("Content-type", "application/json");
    ajax.onreadystatechange = function () {

        if (ajax.readyState != 4)
            return;
        if (ajax.status >= 200 && ajax.status < 300) {
            leer();
        } else {
            alert("Error escribiendo datos");
        }
    };

    var jsonText = JSON.stringify(json);
    ajax.send(jsonText);
};


var editar = function (boton) {
var idelemento = boton.getAttribute("data-editar");

    $(".soloLectura").css("display", "block");
    $(".edicion").css("display", "none");
    $(".btnEditar").css("display", "block");
    $(".btnConfirmar").css("display", "none");

    $("#" + idelemento + " td .soloLectura").css("display", "none");
    $("#" + idelemento + " td .edicion").css("display", "block");
    $("#" + idelemento + " td .btnEditar").css("display", "none");
    $("#" + idelemento + " td .btnConfirmar").css("display", "block");

    //$("#" + idelemento + " td span .soloLectura, #" + idelemento + " td input .edicion").toggle();



}

var confirmarDatos = function(boton) {
    var idelemento = boton.getAttribute("data-confirmar");
    var urlFinal = url + "/" + idelemento;

    var ajax = new XMLHttpRequest();

    var json = {
        isbn: $("#"+idelemento + " .isbn").val(),
        titulo: $("#" + idelemento + " .titulo").val(),
        paginas: $("#" + idelemento + " .paginas").val(),
        unidades: $("#" + idelemento + " .unidades").val(),
    };

    console.log(json);

    ajax.open("PATCH", urlFinal);

    ajax.setRequestHeader("Content-type", "application/json");
    ajax.onreadystatechange = function() {

        if (ajax.readyState != 4)
            return;

        if (ajax.status >= 200 && ajax.status < 300) {
            
            leer();

        } else {

            alert("Error escribiendo datos");
        }
    }

    var jsonText = JSON.stringify(json);

    console.log(jsonText);

    ajax.send(jsonText);
};


//var editar = function (evt) {

//    //escribirDatos();

//    var idelemento = evt.getAttribute("data-editar");

//    $("#" + idelemento).css("display", "block");

//    var idelemento4 = evt.parentNode.parentNode.childNodes;
//    //leer();

//    console.log(idelemento4);
//    $(idelemento4).css("background-color", "lightgray");
//    console.log(idelemento4.childNodes);
  
//    for (var i = 0; i < idelemento4.length-2; i++) {
//        var auxC = idelemento4[i].textContent;
//        $(idelemento4[i]).empty();
//        $(idelemento4[i]).append("<input type='text' class='form-control input-sm' value='" + auxC + "' placeholder='" + auxC + "' </ input>");
//    }

//    $(evt).css("display", "none");

//};

(function() {
    leer();
    $("#guardar").click(function () {
        escribirDatos();
        $('#cerrar').click();
    });

})();