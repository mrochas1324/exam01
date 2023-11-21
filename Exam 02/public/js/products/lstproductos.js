var db = firebase.apps[0].firestore();
const imagen = document.querySelector('#imagen');
const tabla = document.querySelector('#tabla');

const urlParams = new URLSearchParams(valores);
const posic = urlParams.get('cod')


db.collection("categories").where('CategoryID', '==', ''+posic.value).get().then(function(query){
	imagen.innerHTML="";
	var salida = "";
	query.forEach(function(doc){
        salida += '<img src="' + doc.data().Imagen +'" width="20%" />';
    })
	imagen.innerHTML = salida;
})


db.collection("products").where('CategoryID', '==', ''+posic.value)
.orderBy('ProductID', 'asc').get().then(function(query){
	tabla.innerHTML="<h3>No hay datos disponibles</h3>";
	var salida = "";
	query.forEach(function(doc){
        salida += '<tr>';
		salida += "<td>"+doc.data().ProductID+"</td>";
		salida += "<td>"+doc.data().ProductName+"</td>";
        salida += "<td align='center'><a href=''>Editar</a></td>";
		salida += "<td align='center'><a href=''>Borrar</a></td>";
		salida += '</tr>';
    })
	tabla.innerHTML = salida;
})