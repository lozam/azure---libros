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
        var fila = "<tr>";
        fila += "<td>" + dato.isbn + "</td>";
        fila += "<td>" + dato.titulo + "</td>";
        fila += "<td>" + dato.paginas + "</td>";
        fila += "<td>" + dato.unidades + "</td>";
        fila += "<td><button class='btn btn-info btn-xs' data-editar=" + dato.id + " onclick='editar(this)'> Editar </button>";
        fila += "<button class='btn btn-info btn-xs' id=" + dato.id + " onclick='confirmarDatos(this)' style='display:none'> Confirmar </button></td>";
        fila += "<td><button class='btn btn-warning btn-xs' data-eliminar=" + dato.id + " onclick='borrar(this)'> Eliminar </button></td>";
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


var editar = function (evt) {

    leer();

    
    
   

    var idelemento = evt.getAttribute("data-editar");
    
    $("#" + idelemento).css("display", "block");

    //$(evt).html("&nbsp;&nbsp;<span class='glyphicon glyphicon-cloud-upload'></span>&nbsp;&nbsp;");
    //var idelemento3 = evt.parentNode.parentNode;
    //console.log(idelemento3.childNodes);
    
    var idelemento4 = evt.parentNode.parentNode.childNodes;

    //$(idelemento4).css("background-color", "lightgray");

   

    for (var i = 0; i < idelemento4.length-2; i++) {
        var auxC = idelemento4[i].textContent;
        $(idelemento4[i]).empty();
        $(idelemento4[i]).append("<input type='text' class='form-control input-sm' value='" + auxC + "' placeholder='" + auxC + "' </ input>");
    }

    $(evt).css("display", "none");

   

};

var confirmarDatos = function() {
    console.log("confirmarDatos");
};

(function() {
    leer();
    $("#guardar").click(function () {
        escribirDatos();
        $('#cerrar').click();
    });

})();