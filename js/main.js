
function casillaMapa(x, y) {
  this.x = x;
  this.y = y;
  this.id = ""+x+""+y;
  this.oscuridad = false;
}

/* Inicializar el juego */
function iniciarJuego() {
  /* TODO */
  //Deberiamos cargar ficheros. 
  
}

function pintarCasillaActual() {
  var imgPosActual = document.createElement("img");
  imgPosActual.setAttribute("src","./media/images/flecha" + player.estadoPartida.direccion+".png");
  imgPosActual.id = "posActual";
  document.getElementById("casilla" +player.estadoPartida.y + player.estadoPartida.x).appendChild(imgPosActual);
}

function comenzarPartida() {
  inicializarMiniMapa();
  pintarCasillaActual();
  pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
  
}
/*Guille: Función que verifica, que se haya pulsado el teclado*/
function arrow_clicked(boton) {
  var direcc = player.estadoPartida.direccion;
  if(boton == 'up' && direcc == 0 && player.estadoPartida.y != 0) {
    player.estadoPartida.y--;
  }
    else if (boton == 'down' && direcc == 1 && player.estadoPartida.y != 9)
     player.estadoPartida.y++;
    else if (boton == 'right' && direcc == 2 && player.estadoPartida.x != 9)
      player.estadoPartida.x++;
    else if (boton == 'left' && direcc == 3 && player.estadoPartida.x != 0)
     player.estadoPartida.x++;
  
  if(boton == 'rot_right') player.estadoPartida.direccion = (player.estadoPartida.direccion + 1)%4;
  else {
    if(player.estadoPartida.direccion == 0) {
      player.estadoPartida.direccion = 4;
    }
    player.estadoPartida.direccion = (player.estadoPartida.direccion - 1) % 4;
  
  }
  
  console.log("Direccion Partida   " + player.estadoPartida.direccion);
  pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
  

}
/*Guille: Funcion que en base a una coordenada encuentra la casilla asociada */
function localizarCasilla(x, y) {
  for(var i = 0; i<mapa.length;i++) {
    if(mapa[i].id == ""+x+""+y) {
      var cas = mapa[i];
    }
  }
  return cas;
} 

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {

  /*Actualizamos la posición de la casilla actual*/
  var cas = document.getElementById("casilla" +player.estadoPartida.y + player.estadoPartida.x);
  cas.removeChild(cas.firstChild);
  var imgActual = document.createElement("img");
  imgActual.setAttribute("src","./media/images/flecha" + player.estadoPartida.direccion+".png");
  imgActual.id = "posActual";
  document.getElementById("casilla" +player.estadoPartida.y + player.estadoPartida.x).appendChild(imgActual);

  /*Según el estado de la direción  */
  switch(player.estadoPartida.direccion) {
    case 0: /*norte*/
    if(x == 9 && y == 1) return "dungeon_door.png"; /*Si estamos delante dela puerta*/ 
      else {
        if(y == 0) {
          return "dungeon_wall.png" ;
        } else {
           if(localizarCasilla(x,y-1).oscuridad) return "dungeon_wall.png";
            else return "dungeon_step.png";
      }
    }
      break;
    case 2: /*sur*/
      if(y == 9) {
       return "dungeon_wall.png";
      } else {
        if(localizarCasilla(x,y+1).oscuridad) return "dungeon_wall.png";
        else return "dungeon_step.png";
       }
      break;  
    case 1: /*este*/
     if(x == 8 && y == 0) return "dungeon_door.png"; /*Si estamos delante dela puerta*/
      if(x == 9) {
        return "dungeon_wall.png";
      }
      else {
        if(localizarCasilla(x+1,y).oscuridad) return "dungeon_wall.png";
        else return "dungeon_step.png";
       }
       /* En caso de que hayamos encontrado la puerta */
      break;
    case 3: /*oeste*/
      if(x == 0) {
        return "dungeon_wall.png";
      }
      else {
        if(localizarCasilla(x-1,y).oscuridad) return "dungeon_wall.png";
        else return "dungeon_step.png";
       }
      break;   
  }
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

  pintarMinimapa("00","80","columna",0);
  pintarMinimapa("00","05","fila",0);
  pintarMinimapa("19","99","columna",0);
  pintarMinimapa("58","98","columna",0);
  pintarMinimapa("95","99","fila",0);
  pintarMinimapa("35","37","fila",0);
  pintarMinimapa("05","65","columna",0);
  pintarMinimapa("55","56","fila",0);
  pintarMinimapa("40","43","fila",0);
  pintarMinimapa("33","53","columna",0);
  pintarMinimapa("70","72","fila",0);
  
  for(var j = 0; j < mapa.length; j++) {
    if(mapa[j].oscuridad)
    console.log(mapa[j].id)
  }
 
  
}
/* Guille: Método que se encarga de barrer tanto filas como columnas y pintar la oscuridad*/
/* tipo: fila o columna */ 
function pintarMinimapa(inicio, fin, tipo, actual) {
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