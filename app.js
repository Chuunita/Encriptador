
//declarar parametros generales
let level="-";
let idiom= "es";
let language="es-Es"; 
let characterToReplace="";
let regexvalidation ="";
let warning="";
let regexRemplace=""; 
let elementosOriginal = [];

// buscar valor de variables fontsize en css
const getFontSize = () =>
  parseFloat(getComputedStyle(document.documentElement)
    .getPropertyValue('--font-size'))

const diccionarioEncriptador = {
    a: 'ai', e: 'enter', i: 'imes', o: 'ober', u: 'ufat'
};


//funcion que asigna valores iniciales a variables globales
async function parameterinit(){

  level="leve1";  
  caracteresReemplazar =  "aeiou";
  regexRemplace = new RegExp(`[${caracteresReemplazar}]`, 'gi');
  regexvalidation = new RegExp("^[a-z ]+$");
  warning= "Solo letras minúsculas y sin tíldes";
}

//funcion que permite encriptar o desencriptar
async function accionBoton(accion){
   
    //asignar variables
    let textoEncriptado ="";
    const cadena = encontraValorElemento("message");

    //revisa si el mensaje digitado es valido para cada uno de los niveles    
    if(!regexvalidation.test(cadena)){ 
        document.getElementById("container_warning").style.color = "#ff0000";         
        asignarTextoElemento("warning", await traducirTexto( `Por favor debe Digitar ${warning}`, 'auto', idiom) );
        noresponse();
        return false;

    } else {

        if(accion=='encriptar'){
          // llama funcion para encriptar el mensaje y acciones en botones encriptar y desencriptar
            textoEncriptado = encriptar(cadena);             
            if(document.getElementById('response').innerHTML!=""){
              document.getElementById('desencriptar').removeAttribute('disabled');
            }else{
              document.getElementById('desencriptar').setAttribute('disabled','true');
            }
                      
        }else if(accion=='desencriptar'){
          // llama funcion para desencriptar el mensaje y acciones en botones encriptar y desencriptar
            textoEncriptado = desencriptar( cadena);
            if(document.getElementById('response').innerHTML!=""){
              document.getElementById('desencriptar').removeAttribute('disabled');
            }else{
              document.getElementById('desencriptar').setAttribute('disabled','true');
            }
                                             
        }
       
       siresponse();
           
       asignarTextoElemento("response",textoEncriptado);
       document.getElementById("container_warning").style.color = "#228B22"
       asignarTextoElemento("warning",  await traducirTexto( `Mensaje  ${(accion === "encriptar") ? 'encriptado' : 'desencriptado'} exitosamente`, 'auto', idiom));
  
    }
         
}

//Realiza acciones en etiquetas HTML cuando NO hay un mensaje encriptado o desencriptado
function noresponse() {
  
  document.getElementById('cajaNoResponse').removeAttribute('hidden');
  document.getElementById('cajaResponse').setAttribute('hidden','true');
  document.getElementById('desencriptar').setAttribute('disabled','true');
  document.getElementById('encriptar').removeAttribute('disabled');

}

 //Realiza acciones en etiquetas HTML cuando hay un mensaje encriptado o desencriptado
function siresponse() {
 
  document.getElementById('message').value = '';
  document.getElementById('cajaResponse').removeAttribute('hidden');        
  document.getElementById('copiar').removeAttribute('hidden');
  document.getElementById('cajaNoResponse').setAttribute('hidden','true'); 

}

function encriptar(cadena) {
  // Realizamos los reemplazos segun la expresion regular de cada nivel
  return cadena.replace(
    regexRemplace,
    (match) => diccionarioEncriptador[match]
  );
}

//funcion desencriptar 
function desencriptar(cadena) {
  // Creamos un nuevo objeto para almacenar los reemplazos inversos
  const reemplazosInversos = {};
  for (const vocal in diccionarioEncriptador) {
    reemplazosInversos[diccionarioEncriptador[vocal]] = vocal;
  }
  //console.log(reemplazosInversos);
  // Creamos una expresión regular para encontrar todos los reemplazos
  const regex = new RegExp(Object.keys(reemplazosInversos).join("|"), "gi");
  // Realizamos los reemplazos inversos
  return cadena.replace(regex, (match) => reemplazosInversos[match]);
}


//Funcion que asigna texto a una etiqueta html
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.getElementById(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

//Funcion que encuentra el valor de un elemento formulario
function encontraValorElemento(elemento) {
  return document.getElementById(elemento).value;    
}

// funcion que modificas las variables globales segun el nivel seleccionado
async function levelAccion() {
  if ( document.getElementById("level1").checked ) {

    parameterinit();   

  } else if ( document.getElementById("level2").checked ) {

    level = "level2";
    caracteresReemplazar = "aeioubcdfghjklmnopqrstuvwxyz";
    regexRemplace = new RegExp(`[${caracteresReemplazar}]`, "gi");
    regexvalidation = new RegExp("^[a-z0-9 ]+$");
    warning = "Solo letras en minusculas, sin tíldes y sin numeros";
    
  document.getElementById("container_warning").style.color = "#495057";    
  asignarTextoElemento("warning", await traducirTexto( warning, 'auto', idiom)  );
}     
}

//Funcion para copiar al portapapeles valor de texto en etiquetas html
async function copiarportapapeles() {

  const elementoHTML = document.getElementById("response");
  navigator.clipboard.writeText(elementoHTML.innerText);
  //Pegar texto copiado a campo input del mensaje
  try {
    const text = await navigator.clipboard.readText();
    console.log("Texto del portapapeles:", text);
    document.getElementById("message").value = text;
  } catch (err) {
    console.error("Error al leer del portapapeles:", err);
  }

}

  
// funcion que permite incrementar valor de la fuente asignando variable --font-size  a 1.5 
function fontUp() {

  const checkbox = document.getElementById("textplus");

  if (checkbox.checked) {
    document.documentElement.style.setProperty("--font-size", 1.5);
  } else {
    document.documentElement.style.setProperty("--font-size", 1);
  }

}


// llamar funcion para inicializar parametros generales
parameterinit();
