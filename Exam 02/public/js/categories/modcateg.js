// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtCodigo = document.querySelector('#txtCodigo');
const txtNombre = document.querySelector('#txtNombre');
const txtDescrip = document.querySelector('#txtDescrip');
const txtArchi = document.querySelector('#txtArchi');
const btnAdd  = document.querySelector('#btnAdd');

const urlParams = new URLSearchParams(valores);
const posic = urlParams.get('cod')

db.collection("categories").where('CategoryID', '==', ''+posic.value).get().then(function(query){
	categories.innerHTML="<h3>No hay datos disponibles</h3>";
	query.forEach(function(doc){
        document.getElementById("imgSalida").src = doc.data().Imagen;
        document.getElementById("txtCodigo").value = doc.data().CategoryID;
        document.getElementById("txtNombre").value = doc.data().CategoryName;
        document.getElementById("txtDescrip").value = doc.data().Description;
    })
})

function motcateg(){
    const archivo = txtArchi.files[0];
    const nomarch = archivo.name;
    if(archivo == null){
        db.collection("categories").update({
            "CategoryID" : txtCodigo.value,
            "CategoryName" : txtNombre.value,
            "Description" : txtDescrip.value
        }).where('CategoryID', '==', ''+posic.value).then(function(docRef) {
            alert("Cambio realizado");
            limpiar();
        }).catch(function(FirebaseError) {
            alert("Error al editar categoria: " + FirebaseError);
        });
    }else{
        const metadata = {
            contentType : archivo.type
        }
        const subir = container.child('Categoria/'+nomarch).put(archivo, metadata);
        subir.then(snapshot => snapshot.ref.getDownloadURL())
            .then( url =>{
                db.collection("categories").update({
                    "CategoryID" : txtCodigo.value,
                    "CategoryName" : txtNombre.value,
                    "Description" : txtDescrip.value,
                    "Imagen"   : url
                }).where('CategoryID', '==', ''+posic.value).then(function(docRef) {
                    alert("Cambio realizado");
                    limpiar();
                }).catch(function(FirebaseError) {
                    alert("Error al editar categoria:" + FirebaseError);
                });
            });
    }
};

function limpiar(){
    txtCodigo.value = ''
    txtNombre.value = '';
    txtDescrip.value = '';
    txtArchi.value = '';
    window.location.href="categories.html";
}
