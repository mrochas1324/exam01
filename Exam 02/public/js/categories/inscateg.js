// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtCodigo = document.querySelector('#txtCodigo');
const txtNombre = document.querySelector('#txtNombre');
const txtDescrip = document.querySelector('#txtDescrip');
const txtArchi = document.querySelector('#txtArchi');
const btnAdd  = document.querySelector('#btnAdd');

function addcategoria(){
    const archivo = txtArchi.files[0];
    const nomarch = archivo.name;
    if(archivo == null){
        db.collection("categories").add({
            "CategoryID" : txtCodigo.value,
            "CategoryName" : txtNombre.value,
            "Description" : txtDescrip.value
        }).then(function(docRef) {
            alert("ID del registro: " + docRef.id);
            limpiar();
        }).catch(function(FirebaseError) {
            alert("Error al registrar categoria: " + FirebaseError);
        });
    }else{
        const metadata = {
            contentType : archivo.type
        }
        const subir = container.child('Categoria/'+nomarch).put(archivo, metadata);
        subir.then(snapshot => snapshot.ref.getDownloadURL())
            .then( url =>{
                db.collection("categories").add({
                    "CategoryID" : txtCodigo.value,
                    "CategoryName" : txtNombre.value,
                    "Description" : txtDescrip.value,
                    "Imagen"   : url
                }).then(function(docRef) {
                    alert("ID del registro: " + docRef.id);
                    limpiar();
                }).catch(function(FirebaseError) {
                    alert("Error al registrar categoria:" + FirebaseError);
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


//Meter datos en el firebase
