
function casillaMapa(x, y) {
  this.x = x;
  this.y = y;
  this.id = ""+x+""+y;
  this.oscuridad = false;

}

/* Inicializar el juego */
function iniciarJuego() {
  /* TODO */
  
}

function comenzarPartida() {
  inicializarMiniMapa();

}

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  /* TODO */
}
/*Guille: Método que se encarga de pintar minimapa*/
function inicializarMiniMapa() {
  var minimapaDOM = document.getElementById("mapacanvas");
  /* Crea dinámicamente las casillas del minimapa */
  for (var i = 0; i<10; i++) {
    for (var j = 0; j <10;j++) {
      var casilla = document.createElement("div");
      casilla.style.border = "4px solid white";
      casilla.id = "casilla" + i + j;
      casilla.style.width = "20px";
      casilla.style.height = "20px"; 
      if(i == 0 && j == 9) {
        casilla.style.backgroundColor = "yellow";
      }
      var casillaMiniMapa = new casillaMapa(i,j);
      mapa.push(casillaMiniMapa);
      minimapaDOM.appendChild(casilla);
      
      //console.log(casilla.id);
    }
  }

  pintarMinimapa("00","80","columna");
  pintarMinimapa("00","05","fila");
  pintarMinimapa("19","99","columna");
  pintarMinimapa("58","98","columna");
  pintarMinimapa("95","99","fila");
  pintarMinimapa("35","37","fila");
  pintarMinimapa("05","65","columna");
  pintarMinimapa("55","56","fila");
  pintarMinimapa("40","43","fila");
  pintarMinimapa("33","53","columna");
  pintarMinimapa("70","72","fila");
  
  for(var j = 0; j < mapa.length; j++) {
    if(mapa[j].oscuridad)
    console.log(mapa[j].id)
  }
 
  
}
/* Guille: Método que se encarga de barrer tanto filas como columnas y pintar la oscuridad*/
/* tipo: fila o columna */ 
function pintarMinimapa(inicio, fin, tipo) {
  if(tipo == "columna") {
    for (var i = inicio.charAt(0); i <= fin.charAt(0); i++) {
      /*Lo guardamos en el modelo de datos*/
        for(var j = 0; j < mapa.length; j++) {
          if(mapa[j].id == i + "" + inicio.charAt(1)) {
            mapa[j].oscuridad = true;
          }
        }
        /* Lo pintamos por pantalla */
      document.getElementById("casilla"+ i +inicio.charAt(1)).style.backgroundColor = "black";
    }
  } else {
    for (var i = inicio.charAt(1); i <= fin.charAt(1); i++) {
      for(var j = 0; j < mapa.length; j++) {
        if(mapa[j].id == inicio.charAt(0)+ "" + i) {
          mapa[j].oscuridad = true;
        }
      }
      document.getElementById("casilla" +inicio.charAt(0) + i).style.backgroundColor = "black";
    }

  }

}