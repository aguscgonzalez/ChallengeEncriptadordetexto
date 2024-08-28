var entradaTexto = document.querySelector(".entrada-texto");
var salidaTexto = document.querySelector(".salida-texto");
var seccionTexto1 = document.querySelector(".texto1");
var seccionTexto2 = document.querySelector(".texto2");
var btnCopiar = document.querySelector(".copiar");

function validar(textoValidar) {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚabcdefghijklmnopqrstuvwxyzáéíóú";
    return [...textoValidar].every(caracter => letras.includes(caracter));
}

function encriptar() {
    var texto = entradaTexto.value;
    var salida = "";
    if (!validar(texto)) {
        alert("Texto invalido, verifique su texto.");
        return;
    }
    const reemplazos = { "a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat" };
    salida = [...texto].map(caracter => reemplazos[caracter] || caracter).join("");
    entradaTexto.value = "";
    salidaTexto.value = salida;
    ocultar();
}

function desencriptar() {
    var texto = entradaTexto.value;
    var salida = "";
    if (!validar(texto)) {
        alert("Texto invalido, verifique su texto.");
        return;
    }
    const reemplazos = { "ai": "a", "enter": "e", "imes": "i", "ober": "o", "ufat": "u" };
    let i = 0;
    while (i < texto.length) {
        let encontrado = false;
        for (let [clave, valor] of Object.entries(reemplazos)) {
            if (texto.startsWith(clave, i)) {
                salida += valor;
                i += clave.length;
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            salida += texto[i++];
        }
    }
    entradaTexto.value = "";
    salidaTexto.value = salida;
    ocultar();
}

function ocultar() {
    salidaTexto.style.background = "white";
    seccionTexto1.style.display = "none";
    seccionTexto2.style.display = "none";
    btnCopiar.style.display = "";
}

function mostrar() {
    salidaTexto.style.background = "#FFF no-repeat center url(imagenes/buscar.png)";
    seccionTexto1.style.display = "";
    seccionTexto2.style.display = "";
    btnCopiar.style.display = "none";
}

function copiar() {
    var copia = salidaTexto.value;
    navigator.clipboard.writeText(copia);

    var anuncio = document.querySelector(".anuncio");
    anuncio.textContent = "Texto copiado";
    anuncio.style.display = "block";
    setTimeout(() => {
        anuncio.style.display = "none";
    }, 950);
    salidaTexto.value = "";
    mostrar();
}
