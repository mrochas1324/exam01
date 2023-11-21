var db = firebase.apps[0].firestore();
const categories = document.querySelector('#categories');

function borrar(valor){
    db.collection("categories").delete(''+valor).then(function(docRef) {
		alert("Categoria se elimino");
		limpiar();
	}).catch(function(FirebaseError) {
		alert("Categoria no se pudo eliminar por:" + FirebaseError);
	});;
}

db.collection("categories").orderBy('CategoryID', 'asc').get().then(function(query){
	categories.innerHTML="<h3>No hay datos disponibles</h3>";
	var salida = "";
	query.forEach(function(doc){
        salida += '<tr>';
		salida += "<td><a href='lstproductos.html?cod="+doc.data().CategoryID+"'>"+doc.data().CategoryID+"</a></td>";
		salida += "<td>"+doc.data().CategoryName+"</td>";
		salida += "<td>"+doc.data().Description+"</td>";
        salida += "<td align='center'><a href='modcateg.php?cod="+doc.data().CategoryID+"'>Editar</a></td>";
		salida += "<td align='center'><a onclick= 'borrar("+doc.data().CategoryID+")'>Borrar</a></td>";
		salida += '</tr>';
    })
	categories.innerHTML = salida;
})