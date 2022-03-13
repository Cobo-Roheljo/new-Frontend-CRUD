//non piu' file json
var data = [];
var nextID = 10006;

//crea tabella
function tabellaCodice(){
    var righe = "";
    $.each(data,function (key,value){
    righe = righe + "<tr>";
    righe = righe + "<th>" + value.id + "</th>";
    righe = righe + "<td>" + value.firstName + "</td>";
    righe = righe + "<td>" + value.lastName + "</td>";
    righe = righe + "<td>" + value.gender + "</td>";
    
    righe = righe + "<td>" + "<input type='button' class='btn btn-danger' value='RIMUOVI' onclick='elimina("+value.id+")' id='"+value.id+"'>";
    righe = righe + "</tr>";
 });
    $("#tbody").html(righe);
}

//tabella presa tramite il server
$(document).ready(function (){
      $.get("http://localhost:8080/employees", function(content){
          data = content["_embedded"]["employees"];
      tabellaCodice();
    });
});

//elimina 
function elimina(id){
    $("#"+id).closest("tr").remove();
}
function elimina(id){
    var elimina = "http://localhost:8080/employees" + "/" + id; //
  
    $.ajax({
      url: elimina,
      type: 'DELETE',
      success: function(result) {
        $("#"+id).closest("tr").remove();
      }
    });
  }



//inpaginazione
var serverData;
function linkFirst(){
    $.get("http://localhost:8080/employees/", function(msg){
        serverData = msg;
        data = msg._embedded.employees;
        Pag_Corente()
        tabellaCodice();
    });
};


function linkLast(){
    $.get(serverData["_links"]["last"]["href"], function(msg){
        serverData = msg;
        data = msg._embedded.employees;
        Pag_Corente()
        tabellaCodice();
    });
};
function linkNext(){
    $.get(serverData["_links"]["next"]["href"], function(msg){
        serverData = msg;
        data = msg._embedded.employees;
        Pag_Corente()
        tabellaCodice();
    });
};

function linkPrev(){
    $.get(serverData["_links"]["prev"]["href"], function(msg){
        serverData = msg;
        data = msg._embedded.employees;
        Pag_Corente()
        tabellaCodice();
    });
};

//http://localhost:8080/employees?page=

function link(num){
    $.get("http://localhost:8080/employees?page=" + num + "&size=20", function(msg){
        serverData.page.number = msg;
        data = msg._embedded.employees;
        Pag_Corente()
        tabellaCodice();
    });
};

function Pag_Corente(){
    $("#Pag-Corrente").text(serverData.page.number);
}


//aggiungi
$(document).ready(function (){
    $('#btn').click(function(){
        var righeadd = "";
        var firstName = $("#name").val();
        var lastName = $("#lastname").val();
        var gender = $("#gender").val();
        var birthDate = null;
        var hireDate = null;
        
        var json = 
        { 
        "birthDate": birthDate,
        "firstName": firstName,
        "gender": gender,
        "hireDate": hireDate,
        "lastName": lastName,
    }
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/employees",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(json),
        success: function(result) {
        }
      })
    
    });
});

//modifica
$(document).ready(function (){
    $('#btn-mod').click(function(){
        var righeadd = "";
        var firstName = $("#nameM").val();
        var lastName = $("#lastnameM").val();
        var gender = $("#genderM").val();
        var birthDate = null;
        var hireDate = null;
        var id = $("#id").val();
        
        var jsonM = 
        { 
        "birthDate": birthDate,
        "firstName": firstName,
        "gender": gender,
        "hireDate": hireDate,
        "lastName": lastName,
    }
    $.ajax({
        method: "PUT",
        url: "http://localhost:8080/employees" + "/" + id,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(jsonM),
        success: function(result) {
        }
      })
    
    });
});

	


