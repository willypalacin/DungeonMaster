/* No tocar código */
var partida = {};

/*
  Dimensió: 10x10
*/
var mapa = [];


var enemigo = [];

var player = {
  nombre:"",
  vida:10,
  nivel:-2,
  pGuardadas: 2, //Controla las partidas que tiene guardadas el Usuario. 
  xp:6,//quan arribi a 10 passa a nivell -1
  ataque:2,
  defensa:2,
  manoderecha:0,//emepzamos sin objectos (ni en las manos, ni en la mochila)
  manoizquierda:0,
  mochila:[],
  estadoPartida: {//ASSIGNACION VALORES INICIALES
    x:0,
    y:9,
    nivel:-2,
    direccion:1, /* 0 Norte, 1 Este, 2 Sur, 3 Oeste*/
  }
};

/* Se llama al cargar todos los elementos de la página */
window.onload = function () {
  iniciarJuego();
}

/*  Pinta imagen en el visor */
function pintaImagen(src, x, y) {
  // Consigue el canvas
  var canvas = document.getElementById('visor');
  var context = canvas.getContext('2d');
  var base_image = new Image();
  base_image.src = "./media/images/"+src;
  base_image.onload = function () {
    // Pinta imagen en el canvas
    context.drawImage(this, x, y);
  }
}

/* Pinta al visor lo que hay en el mapa */
function pintaPosicion(x, y) {
  pintaImagen(mapaToImg(x, y), 0, 0);
}



