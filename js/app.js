//Obtener referencia al elemento
var btnActualizar= document.getElementById('btnActualizar');
var btnGuardar= document.getElementById('btnGuardar');


//Agregar un event listener para cada click
btnActualizar.addEventListener('click',actualizar);
btnGuardar.addEventListener('click',guardar);

actualizar();

//funciones
function actualizar(){
  var xhttp= new XMLHttpRequest();
  xhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      var response=JSON.parse(this.responseText);
      if(response.status=="ok")
      {
        document.getElementsByTagName('tbody')[0].innerHTML="";

        response.students.forEach(function(student){
          var row = document.createElement('tr');
          var idCell = document.createElement('td');
          var firstNameCell = document.createElement('td');
          var lastNameCell = document.createElement('td');

          var idText=document.createTextNode(student.id);
          var firstNameText=document.createTextNode(student.first_name);
          var lastNameText=document.createTextNode(student.last_name);


          idCell.appendChild(idText);
          firstNameCell.appendChild(firstNameText);
          lastNameCell.appendChild(lastNameText);

          row.appendChild(idCell);
          row.appendChild(firstNameCell);
          row.appendChild(lastNameCell);

          document.getElementsByTagName('tbody')[0].appendChild(row);

        });

      }
    }

  };
  xhttp.open("GET","http://nyc.pixan.io/ajax/public/api/students",true);
  xhttp.send();
}

function guardar(){
  var first_name = document.getElementById('nombre').value;
  var last_name = document.getElementById('apellido').value;
  var email = document.getElementById('correo').value;
  var phone_number = document.getElementById('telefono').value;

  var data=new FormData();
  data.append('first_name',first_name);
  data.append('last_name',last_name);
  data.append('email',email);
  data.append('phone_number',phone_number);

  var xhttp= new XMLHttpRequest();
  xhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      var response = JSON.parse(this.responseText);
      if(response.status=='error'){
        alert(response.errors[0]);
      }
      else{
        actualizar();

        document.getElementById('nombre').value="";
        document.getElementById('apellido').value="";
        document.getElementById('correo').value="";
        document.getElementById('telefono').value="";
      }
    }
  };
  xhttp.open("POST","http://nyc.pixan.io/ajax/public/api/students",true);
  xhttp.send(data);
}
