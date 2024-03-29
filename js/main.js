var contPart = 0;

/*variable auxiliar
  selected --> indica que objeto de la mochila se ha pulsado: para posteriormente decidir si lo queremos en mano derecha o izq
  obj1_d... --> indica si el obj1 o 2 ya esta asigando a la derecha o a la izq (util para no asignarlo 2 veces, o dos objetos a una misma mano)
*/ 
var objCogidos = {
  selected : 0, 
  obj1_d : false,
  obj2_d : false,
  obj1_i : false,
  obj2_i : false,
}


var luchar_huir = {
  turno_player : false,
  huir: false,
}
/*Contiene la información de los objetos que posee cada enemigo*/
function enemigoObjetos(ataque, defensa, img){
  this.ataque = ataque;
  this.defensa = defensa;
  this.img = img;
}
/*Cuando colocamos un enemigo en el mapa, lo inicializamos
  id: 0(no hay enemigo), 1: enemigo1 2:enemigo2
  ataque y defensa y xp: valores de ataque y defensa y experiencia
  img: source de la imagen correspondiente con el id del enemigo 
  objectos--> array de tipo enemigoObjeto
*/
function initEnemigo(vida, id, ataque, defensa, xpp, img, objetos){ //lleno player.mochila con objetosEncontrados
  this.vida = 5;
  this.id = id;
  this.ataque = ataque;
  this.defensa = defensa;
  this.xpp = xpp;
  this.img = img;
  this.objetos = objetos;
}
/*Llamar API*/ 
function httpGetRequest(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText)
    return xmlHttp.responseText;
}

function httpDeleteRequest(url) {
  // Delete a user
var xhr = new XMLHttpRequest();
xhr.open("DELETE", url, true);
xhr.onload = function () {
	//var users = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "200") {
	} else {
	}
}
xhr.send(null);
}

function httpPostRequest (theUrl, json) {
  var http = new XMLHttpRequest();
var params = "json="+json; //PARAMETROS
//Abres la conexion  la URL
http.open("POST", theUrl, true);
 
//Envias el header requerido para enviar parametros via POST
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.setRequestHeader("Connection", "close");

http.onreadystatechange = function() {//Llama a la funcion cuando el estado cambia
	if(http.readyState == 4 && http.status == 200) {
		//alert(http.responseText);
	}
}
http.send(params);
}

/*Variable con la informacion de cada objeto que tenemos en la mochila
  manoderecha / izquierda --> indica si se ha asignado a una de las dos manos
 */
function objectosEncontrados(obj, ataque, defensa){ //lleno player.mochila con objetosEncontrados
  this.obj = obj;
  this.ataque = ataque;
  this.defensa = defensa;
  this.manoderecha = false;
  this.manoizq = false;
}


function casillaMapa(x, y) {//objeto
  this.x = x;
  this.y = y;
  this.id = ""+x+""+y;
  this.oscuridad = false;
  this.obj = 0; //0:no object, 1: ax, 2:hammer, para saber si hay objeto en la casilla
  this.enemigo = 0;
}

/* Inicializar el juego */
function iniciarJuego() {
  
  //Deberiamos cargar ficheros. 
  
}

function pintarCasillaActual() {
  var imgPosActual = document.createElement("img");
  imgPosActual.setAttribute("src","./media/images/flecha" + player.estadoPartida.direccion+".png");//pinto la flecha
  imgPosActual.id = "posActual";
  document.getElementById("casilla" +player.estadoPartida.y + player.estadoPartida.x).appendChild(imgPosActual);
}
function comprobacionSexo(part) {
  var ok = 0;
  if(part == "mujer") {
    ok = 1;
    document.getElementById("homaimg").style.opacity= 0;
    document.getElementById("donaimg").style.opacity= 1;

  } else{
    if(part == "hombre"){
        ok = 1;
        
    document.getElementById("homaimg").style.opacity= 1;
    document.getElementById("donaimg").style.opacity= 0;
    }
  }
  
  return ok;
}

function inicializarJugador() {

  player.vida = 10;
  player.nivel= -2;
   //Controla las partidas que tiene guardadas el Usuario. 
  player.xp=6;//quan arribi a 10 passa a nivell -1
  player.ataque=2;
  player.defensa=2,
  player.manoderecha=0;//emepzamos sin objectos (ni en las manos, ni en la mochila)
  player.manoizquierda=0;
  player.estadoPartida.x = 0;
  player.estadoPartida.y = 9; //ASSIGNACION VALORES INICIALES 
  player.estadoPartida.nivel=-2;
  player.estadoPartida.direccion=1;  /* 0 Norte, 1 Este, 2 Sur, 3 Oeste*/


}

function comenzarPartida() {//button COMENZAR PARTIDA
  if(contPart == 0){
    var part = prompt("indique un nombre a la partida", "Introduzca el nombre de la partida");
    player.nombre = part;
   var good = 0;
    do{
     part = prompt("Indique de que sexo es su personage: mujer o hombre", "mujer o hombre");
     good = comprobacionSexo(part);
   }while(good = 0);

    inicializarJugador();
    inicializarMiniMapa();//y lleno mapa[]
    pintarCasillaActual();
    eliminarCasillaActual();
    pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
    playerModelToScreen();
}
else {
    var part = prompt("indique un nombre a la partida", "Introduzca el nombre de la partida");
    player.nombre = part;
   var good = 0;
    do{
     part = prompt("Indique de que sexo es su personage: mujer o hombre", "mujer o hombre");
     good = comprobacionSexo(part);
   }while(good = 0);
    eliminarCasillaActual();
    
    inicializarJugador();
    inicializarMiniMapa();//y lleno mapa[]
    pintarCasillaActual();
    eliminarCasillaActual();
    pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
    playerModelToScreen();
}
contPart++;
  
}




/**Preparacion valirables para POPUP  */
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];//la curz del popup

//podemos cerrar la popup con la cruz(span) o clicando en la zona translucida
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    
  }
  if (event.target == modal_lucha) {
    
    document.getElementById("luchar").style.opacity= 1;
    document.getElementById("huir").style.opacity= 1;
  
    modal_lucha.style.display = "none";
  }
}


var modal_lucha = document.getElementById('myModal_lucha');
var span_lucha = document.getElementsByClassName("close")[0];//la curz del popup

//podemos cerrar la popup con la cruz(span) o clicando en la zona translucida
span_lucha.onclick = function() {
  
  document.getElementById("luchar").style.opacity= 1;
  document.getElementById("huir").style.opacity= 1;
  modal_lucha.style.display = "none";
}


//detecta que objecto se ha clickado, lo marcamos como objCogidos.selected y esperamos a que pulsem btn mano derecha o mano izquierda
//marcamos como selecioando el objeto que se ha clickado
function object_clicked(obj){
  switch (obj) {
    case 1:
      if(document.getElementById("obj1n2").style.opacity= 1 && (objCogidos.obj1_d==false && objCogidos.obj1_i==false)){//comprobamos que tenemos el objeto en la mochila
        objCogidos.selected = 1;
      }   
      break;
    case 2:
      if(document.getElementById("obj2n2").style.opacity= 1 && (objCogidos.obj2_d==false && objCogidos.obj2_i==false) ){//comprobamos que tenemos el objeto en la mochila
        objCogidos.selected = 2;
      } 
      
      break;
  }

}

//cogemos el obj selecioando y lo colocamos en mano derecha/izq
function CogerObjMano(mano){ 
  switch (mano) {  //1:derecha, 2:izq
    case 1://derecha
    
      switch (objCogidos.selected) {
        case 1://martell
          document.getElementById("cogido_derecha_1").style.opacity= 1;
          document.getElementById("cogido_derecha_2").style.opacity= 0;
          objCogidos.selected = 0;
          objCogidos.obj1_d = true;
          objCogidos.obj2_d = false;
          player.manoderecha = 1;
         

          
          break;
        case 2://hacha
          document.getElementById("cogido_derecha_2").style.opacity= 1;
          document.getElementById("cogido_derecha_1").style.opacity= 0;
          objCogidos.selected = 0;
          objCogidos.obj1_d = false;
          objCogidos.obj2_d = true;
          player.manoderecha = 2;
        break;
      }
    
    break;


    case 2://izquierda
     
    switch (objCogidos.selected) {
      case 1:
        document.getElementById("cogido_izq_1").style.opacity= 1;
        document.getElementById("cogido_izq_2").style.opacity= 0;
        objCogidos.selected = 0;
        objCogidos.obj1_i = true;
        objCogidos.obj2_i = false;
        player.manoizquierda = 1;
        break;
      case 2:
        document.getElementById("cogido_izq_2").style.opacity= 1;
        document.getElementById("cogido_izq_1").style.opacity= 0;
        objCogidos.selected = 0;
        objCogidos.obj1_i = false;
        objCogidos.obj2_i = true;
        player.manoizquierda = 2  ;

      break;
    }
  
    break;
  }
  //CALCULO DEFENSA Y ATAQUE TOTAL DE PLAYER
  if(player.manoderecha == player.manoizquierda == 0){
    player.ataque = 2;
    player.defensa = 2;
  }
  if((player.manoderecha ==1 &&player.manoizquierda ==2 )||(player.manoderecha == 2 && player.manoizquierda == 1)){
    player.ataque = 10;
    player.defensa = 11;
  }
  if((player.manoderecha ==1 &&player.manoizquierda ==0 )||(player.manoderecha == 0 && player.manoizquierda == 1)){
    player.ataque = 7;
    player.defensa = 9;

  }
  if((player.manoderecha ==2 &&player.manoizquierda ==0 )||(player.manoderecha == 0 && player.manoizquierda == 2)){
    player.ataque = 5;
    player.defensa = 4;

  }
  
  //muestro en el popup de lucha los puntos de defensa y ataque total del player --> son los q iran en la url para peticion api ataque
  document.getElementById("total_defensa_player").innerHTML = "DEFENSA TOTAL: "+ player.defensa;
  document.getElementById("total_ataque_player").innerHTML = "ATAQUE TOTAL: "+ player.ataque;


}

function defensaEnemigo(id_enemigo) {
  for(var i=0; i<enemigo.length; i++){
    if(id_enemigo == enemigo[i].id){
     
      return enemigo[i].defensa + enemigo[i].objetos.defensa;
    }
  }

}
function ataqueEnemigo(id_enemigo) {
  for(var i=0; i<enemigo.length; i++){
    if(id_enemigo == enemigo[i].id){
      return enemigo[i].ataque +enemigo[i].objetos.ataque;
    }
  }
}

function clickVisor(){
  //comprobamos si el jugador está viendo objeto o un enemigo
  switch (player.estadoPartida.direccion) {
    case 0://norte


      //miramos si hay objeto
      if(localizarCasilla(player.estadoPartida.x, player.estadoPartida.y-1).obj!=0){
        switch (localizarCasilla(player.estadoPartida.x, player.estadoPartida.y-1).obj) {
          case 1:
            var encontrado = new objectosEncontrados(1, 7, 5);//id_obj, defensa y ataque se debe cambiar, segun valores retorno api lucha
            player.mochila.push(encontrado); //afegim a la var mapa[]
            //pintaImagen("dungeon_step.png", 0, 0);

            document.getElementById("obj1n2").style.opacity= 1;
            break;
          case 2:
            var encontrado = new objectosEncontrados(2, 2, 3);//defensa y ataque se debe cambiar, segun valores retorno api lucha
            player.mochila.push(encontrado); //afegim a la var mapa[]
            document.getElementById("obj2n2").style.opacity= 1;
            
            
            break;
        
        }
        modal.style.display = "block";
        playerModelToScreen();
      }
    

      //miramos si hay enemigo
      if(localizarCasilla(player.estadoPartida.x, player.estadoPartida.y-1).enemigo!=0){
        switch (localizarCasilla(player.estadoPartida.x, player.estadoPartida.y-1).enemigo) {
          case 1://enemigo1 --> michy

            var defensa = defensaEnemigo(1);
            var ataque = ataqueEnemigo(1);
            document.getElementById("img_enemigo1n2").style.opacity= 1; 
            document.getElementById("img_enemigo2n2").style.opacity= 0; 



           document.getElementById("enemigo_defensa").innerHTML = "DEFENSA:  "+defensa;   
            document.getElementById("enemigo_ataque").innerHTML = "ATAQUE:  "+ataque;  
            document.getElementById("enemigo_vidas").innerHTML = "VIDAS:  "+enemigo[0].vida;     
            switch (player.manoderecha) {
              case 1:
              document.getElementById("player_defensa_derecha").innerHTML = "Defensa:  "+1;
              document.getElementById("player_ataque_derecha").innerHTML = "Ataque:  "+1;
              document.getElementById("img_mano_derecha1").style.opacity = 1;
              document.getElementById("img_mano_derecha2").style.opacity = 0;
              document.getElementById("img_mano_derecha3").style.opacity = 0;
              break;
            
              case 2:
              document.getElementById("player_defensa_derecha").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_derecha").innerHTML = "Ataque:  "+3;
              document.getElementById("img_mano_derecha1").style.opacity = 0;
              document.getElementById("img_mano_derecha2").style.opacity = 1;
              document.getElementById("img_mano_derecha3").style.opacity = 0;
              break;

              case 3:
              document.getElementById("player_defensa_derecha").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_derecha").innerHTML = "Ataque:  "+2;
              document.getElementById("img_mano_derecha1").style.opacity = 0;
              document.getElementById("img_mano_derecha2").style.opacity = 0;
              document.getElementById("img_mano_derecha3").style.opacity = 1;
              break;
            }
            switch (player.manoizquierda) {
              case 1:
              document.getElementById("player_defensa_izq").innerHTML = "Defensa:  "+1;
              document.getElementById("player_ataque_izq").innerHTML = "Ataque:  "+1;
              document.getElementById("img_mano_left1").style.opacity = 1;
              document.getElementById("img_mano_left2").style.opacity = 0;
              document.getElementById("img_mano_left3").style.opacity = 0;
              break;
            
              case 2:
              document.getElementById("player_defensa_izq").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_izq").innerHTML = "Ataque:  "+3;
              document.getElementById("img_mano_left1").style.opacity = 0;
              document.getElementById("img_mano_left2").style.opacity = 1;
              document.getElementById("img_mano_left3").style.opacity = 0;
              break;

              case 3:
              document.getElementById("player_defensa_izq").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_izq").innerHTML = "Ataque:  "+2;
              document.getElementById("img_mano_left1").style.opacity = 0;
              document.getElementById("img_mano_left2").style.opacity = 0;
              document.getElementById("img_mano_left3").style.opacity = 1;
              break;
            }
            break;
        
          case 2:
            document.getElementById("img_enemigo1n2").style.opacity= 2; 
            document.getElementById("img_enemigo2n2").style.opacity= 1;
            break;
        }
        
        
        modal_lucha.style.display = "block";
      }



    break;

    case 1://este




    if(localizarCasilla(player.estadoPartida.x+1, player.estadoPartida.y).obj!=0){
      //player.mochila.push(localizarCasilla(player.estadoPartida.x+1, player.estadoPartida.y).obj);//añadimos un 1 o 2, para saber q objeto hemos encontrado y añadido a la mochila
      switch (localizarCasilla(player.estadoPartida.x+1, player.estadoPartida.y).obj) {
        case 1:
        var encontrado = new objectosEncontrados(1, 1, 1);//defensa y ataque se debe cambiar, segun valores retorno api lucha
          player.mochila.push(encontrado); //afegim a la var mapa[]
          document.getElementById("obj1n2").style.opacity= 1;


          break;
        case 2:
          var encontrado = new objectosEncontrados(2, 2, 3);//defensa y ataque se debe cambiar, segun valores retorno api lucha
          player.mochila.push(encontrado); //afegim a la var mapa[]
          document.getElementById("obj2n2").style.opacity= 1;
          break;
      
      }
      modal.style.display = "block";
    }
      //miramos si hay enemigo
      if(localizarCasilla(player.estadoPartida.x+1, player.estadoPartida.y).enemigo!=0){
        switch (localizarCasilla(player.estadoPartida.x+1, player.estadoPartida.y).enemigo) {
          case 1://enemigo1 --> michy
            var defensa = defensaEnemigo(1);
            var ataque = ataqueEnemigo(1);
            document.getElementById("img_enemigo1n2").style.opacity= 1; 
            document.getElementById("img_enemigo2n2").style.opacity= 0; 



           document.getElementById("enemigo_defensa").innerHTML = "DEFENSA:  "+defensa;   
            document.getElementById("enemigo_ataque").innerHTML = "ATAQUE:  "+ataque;    
            console.log(player.manoizquierda+"muajjajaj");
            switch (player.manoderecha) {
              case 1:
              document.getElementById("player_defensa_derecha").innerHTML = "Defensa:  "+1;
              document.getElementById("player_ataque_derecha").innerHTML = "Ataque:  "+1;
              document.getElementById("img_mano_derecha1").style.opacity = 1;
              document.getElementById("img_mano_derecha2").style.opacity = 0;
              document.getElementById("img_mano_derecha3").style.opacity = 0;
              break;
            
              case 2:
              document.getElementById("player_defensa_derecha").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_derecha").innerHTML = "Ataque:  "+3;
              document.getElementById("img_mano_derecha1").style.opacity = 0;
              document.getElementById("img_mano_derecha2").style.opacity = 1;
              document.getElementById("img_mano_derecha3").style.opacity = 0;
              break;

              case 3:
              document.getElementById("player_defensa_derecha").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_derecha").innerHTML = "Ataque:  "+2;
              document.getElementById("img_mano_derecha1").style.opacity = 0;
              document.getElementById("img_mano_derecha2").style.opacity = 0;
              document.getElementById("img_mano_derecha3").style.opacity = 1;
              break;
            }
            switch (player.manoizquierda) {
              case 1:
              document.getElementById("player_defensa_izq").innerHTML = "Defensa:  "+1;
              document.getElementById("player_ataque_izq").innerHTML = "Ataque:  "+1;
              document.getElementById("img_mano_left1").style.opacity = 1;
              document.getElementById("img_mano_left2").style.opacity = 0;
              document.getElementById("img_mano_left3").style.opacity = 0;
              break;
            
              case 2:
              document.getElementById("player_defensa_izq").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_izq").innerHTML = "Ataque:  "+3;
              document.getElementById("img_mano_left1").style.opacity = 0;
              document.getElementById("img_mano_left2").style.opacity = 1;
              document.getElementById("img_mano_left3").style.opacity = 0;
              break;

              case 3:
              document.getElementById("player_defensa_izq").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_izq").innerHTML = "Ataque:  "+2;
              document.getElementById("img_mano_left1").style.opacity = 0;
              document.getElementById("img_mano_left2").style.opacity = 0;
              document.getElementById("img_mano_left3").style.opacity = 1;
              break;
            }
            break;
        
          case 2:
            document.getElementById("img_enemigo1n2").style.opacity= 2; 
            document.getElementById("img_enemigo2n2").style.opacity= 1;
            break;
        }
        
        
        modal_lucha.style.display = "block";
      }

    break;

    case 2://sur
    if(localizarCasilla(player.estadoPartida.x, player.estadoPartida.y+1).obj!=0){
      //player.mochila.push(localizarCasilla(player.estadoPartida.x, player.estadoPartida.y+1).obj);//añadimos un 1 o 2, para saber q objeto hemos encontrado y añadido a la mochila
      switch (localizarCasilla(player.estadoPartida.x, player.estadoPartida.y+1).obj) {
        case 1:
          var encontrado = new objectosEncontrados(1, 1, 1);//defensa y ataque se debe cambiar, segun valores retorno api lucha
          player.mochila.push(encontrado); //afegim a la var mapa[]
          document.getElementById("obj1n2").style.opacity= 1;
          break;
        case 2:
          var encontrado = new objectosEncontrados(2, 2, 3);//defensa y ataque se debe cambiar, segun valores retorno api lucha
          player.mochila.push(encontrado); //afegim a la var mapa[]
          document.getElementById("obj2n2").style.opacity= 1;
          break;
      
      }
      modal.style.display = "block";
    }
      //miramos si hay enemigo
      if(localizarCasilla(player.estadoPartida.x, player.estadoPartida.y+1).enemigo!=0){
        switch (localizarCasilla(player.estadoPartida.x, player.estadoPartida.y+1).enemigo) {
          case 1://enemigo1 --> michy
            var defensa = defensaEnemigo(1);
            var ataque = ataqueEnemigo(1);
            document.getElementById("img_enemigo1n2").style.opacity= 1; 
            document.getElementById("img_enemigo2n2").style.opacity= 0; 



           document.getElementById("enemigo_defensa").innerHTML = "DEFENSA:  "+defensa;   
            document.getElementById("enemigo_ataque").innerHTML = "ATAQUE:  "+ataque;    
            console.log(player.manoizquierda+"muajjajaj");
            switch (player.manoderecha) {
              case 1:
              document.getElementById("player_defensa_derecha").innerHTML = "Defensa:  "+1;
              document.getElementById("player_ataque_derecha").innerHTML = "Ataque:  "+1;
              document.getElementById("img_mano_derecha1").style.opacity = 1;
              document.getElementById("img_mano_derecha2").style.opacity = 0;
              document.getElementById("img_mano_derecha3").style.opacity = 0;
              break;
            
              case 2:
              document.getElementById("player_defensa_derecha").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_derecha").innerHTML = "Ataque:  "+3;
              document.getElementById("img_mano_derecha1").style.opacity = 0;
              document.getElementById("img_mano_derecha2").style.opacity = 1;
              document.getElementById("img_mano_derecha3").style.opacity = 0;
              break;

              case 3:
              document.getElementById("player_defensa_derecha").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_derecha").innerHTML = "Ataque:  "+2;
              document.getElementById("img_mano_derecha1").style.opacity = 0;
              document.getElementById("img_mano_derecha2").style.opacity = 0;
              document.getElementById("img_mano_derecha3").style.opacity = 1;
              break;
            }
            switch (player.manoizquierda) {
              case 1:
              document.getElementById("player_defensa_izq").innerHTML = "Defensa:  "+1;
              document.getElementById("player_ataque_izq").innerHTML = "Ataque:  "+1;
              document.getElementById("img_mano_left1").style.opacity = 1;
              document.getElementById("img_mano_left2").style.opacity = 0;
              document.getElementById("img_mano_left3").style.opacity = 0;
              break;
            
              case 2:
              document.getElementById("player_defensa_izq").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_izq").innerHTML = "Ataque:  "+3;
              document.getElementById("img_mano_left1").style.opacity = 0;
              document.getElementById("img_mano_left2").style.opacity = 1;
              document.getElementById("img_mano_left3").style.opacity = 0;
              break;

              case 3:
              document.getElementById("player_defensa_izq").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_izq").innerHTML = "Ataque:  "+2;
              document.getElementById("img_mano_left1").style.opacity = 0;
              document.getElementById("img_mano_left2").style.opacity = 0;
              document.getElementById("img_mano_left3").style.opacity = 1;
              break;
            }
            break;
        
          case 2:
            document.getElementById("img_enemigo1n2").style.opacity= 2; 
            document.getElementById("img_enemigo2n2").style.opacity= 1;
            break;
        }
        
        
        modal_lucha.style.display = "block";
        playerModelToScreen();
      }
    break;

    case 3://oeste
    if(localizarCasilla(player.estadoPartida.x-1, player.estadoPartida.y).obj!=0){
      //player.mochila.push(localizarCasilla(player.estadoPartida.x-1, player.estadoPartida.y).obj);//añadimos un 1 o 2, para saber q objeto hemos encontrado y añadido a la mochila
      switch (localizarCasilla(player.estadoPartida.x-1, player.estadoPartida.y).obj) {
        case 1:
          var encontrado = new objectosEncontrados(1, 1, 1);//defensa y ataque se debe cambiar, segun valores retorno api lucha
          player.mochila.push(encontrado); //afegim a la var mapa[]
          document.getElementById("obj1n2").style.opacity= 1;
          break;
        case 2:
          var encontrado = new objectosEncontrados(2, 2, 3);//defensa y ataque se debe cambiar, segun valores retorno api lucha
          player.mochila.push(encontrado); //afegim a la var mapa[]
          document.getElementById("obj2n2").style.opacity= 1;
          break;
      
      }
      modal.style.display = "block";
    }
      //miramos si hay enemigo
      if(localizarCasilla(player.estadoPartida.x-1, player.estadoPartida.y).enemigo!=0){
        switch (localizarCasilla(player.estadoPartida.x-1, player.estadoPartida.y).enemigo) {
          case 1://enemigo1 --> michy
            var defensa = defensaEnemigo(1);
            var ataque = ataqueEnemigo(1);
            document.getElementById("img_enemigo1n2").style.opacity= 1; 
            document.getElementById("img_enemigo2n2").style.opacity= 0; 



           document.getElementById("enemigo_defensa").innerHTML = "DEFENSA:  "+defensa;   
            document.getElementById("enemigo_ataque").innerHTML = "ATAQUE:  "+ataque;    
            console.log(player.manoizquierda+"muajjajaj");
            switch (player.manoderecha) {
              case 1:
              document.getElementById("player_defensa_derecha").innerHTML = "Defensa:  "+1;
              document.getElementById("player_ataque_derecha").innerHTML = "Ataque:  "+1;
              document.getElementById("img_mano_derecha1").style.opacity = 1;
              document.getElementById("img_mano_derecha2").style.opacity = 0;
              document.getElementById("img_mano_derecha3").style.opacity = 0;
              break;
            
              case 2:
              document.getElementById("player_defensa_derecha").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_derecha").innerHTML = "Ataque:  "+3;
              document.getElementById("img_mano_derecha1").style.opacity = 0;
              document.getElementById("img_mano_derecha2").style.opacity = 1;
              document.getElementById("img_mano_derecha3").style.opacity = 0;
              break;

              case 3:
              document.getElementById("player_defensa_derecha").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_derecha").innerHTML = "Ataque:  "+2;
              document.getElementById("img_mano_derecha1").style.opacity = 0;
              document.getElementById("img_mano_derecha2").style.opacity = 0;
              document.getElementById("img_mano_derecha3").style.opacity = 1;
              break;
            }
            switch (player.manoizquierda) {
              case 1:
              document.getElementById("player_defensa_izq").innerHTML = "Defensa:  "+1;
              document.getElementById("player_ataque_izq").innerHTML = "Ataque:  "+1;
              document.getElementById("img_mano_left1").style.opacity = 1;
              document.getElementById("img_mano_left2").style.opacity = 0;
              document.getElementById("img_mano_left3").style.opacity = 0;
              break;
            
              case 2:
              document.getElementById("player_defensa_izq").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_izq").innerHTML = "Ataque:  "+3;
              document.getElementById("img_mano_left1").style.opacity = 0;
              document.getElementById("img_mano_left2").style.opacity = 1;
              document.getElementById("img_mano_left3").style.opacity = 0;
              break;

              case 3:
              document.getElementById("player_defensa_izq").innerHTML = "Defensa:  "+2;
              document.getElementById("player_ataque_izq").innerHTML = "Ataque:  "+2;
              document.getElementById("img_mano_left1").style.opacity = 0;
              document.getElementById("img_mano_left2").style.opacity = 0;
              document.getElementById("img_mano_left3").style.opacity = 1;
              break;
            }
            break;
        
          case 2:
            document.getElementById("img_enemigo1n2").style.opacity= 2; 
            document.getElementById("img_enemigo2n2").style.opacity= 1;
            break;
        }
        
        
        modal_lucha.style.display = "block";
      }
    break;
  
  }
  console.log(player.mochila.length);
  
  for(var r=0; r<player.mochila.length; r++){
    console.log(player.mochila[r].obj);
    

  }
  playerModelToScreen();
  
}

function conQueEnemigoEstoyLuchando(id){
  //direccion
  switch (player.estadoPartida.direccion) {
    case 0://norte
      return localizarCasilla(player.estadoPartida.x, player.estadoPartida.y-1).enemigo;
   break;
   case 1://norte
      return localizarCasilla(player.estadoPartida.x, player.estadoPartida.y+1).enemigo;
   break;
   case 2://norte
      return localizarCasilla(player.estadoPartida.x+1, player.estadoPartida.y).enemigo;
   break;
   case 3://norte
      return localizarCasilla(player.estadoPartida.x-1, player.estadoPartida.y).enemigo;
   break;
   
  
    
  }


}
function crearUrlLucha(ataque, defensa) {
  var url = "http://puigpedros.salleurl.edu/pwi/pac4/ataque.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&ataque="+ataque+"&defensa="+defensa;
  console.log(url);
  return url;
}


function cuantasVidasEnemigo(id_enemigo) {
  for(var i=0; i<enemigo.length; i++){
    if(id_enemigo == enemigo[i].id){
      console.log(enemigo[i].vida+"vidadadada");
      return enemigo[i].vida;
    }
  }
}
function actualizaVidasDefensa(vida, id_enemigo) {
  for(var i=0; i<enemigo.length; i++){
    if(id_enemigo == enemigo[i].id){
      enemigo[i].vida = vida;
    }
  }
}

function actualizaXpPlayer(id_enemigo) {
  for(var i=0; i<enemigo.length; i++){
    if(id_enemigo == enemigo[i].id){
      player.xp = enemigo[i].xpp + player.xp;
      console.log("xp player"+player.xp);
    }
  }
}
function actualizarObjPlayer(id_enemigo) {
  for(var i=0; i<enemigo.length; i++){
    if(id_enemigo == enemigo[i].id){
      //sabemos q enemigo solo tiene un objeto
      player.mochila.push(enemigo[i].objetos);
      console.log(player.mochila.length); 
      
      var encontrado = new objectosEncontrados(2, 2, 3);//defensa y ataque se debe cambiar, segun valores retorno api lucha
      player.mochila.push(encontrado); //afegim a la var mapa[]
      document.getElementById("obj2n2").style.opacity= 1;
         
      
      
    }
  }
}
//Se quitan 3 vidas al jugador cada vez q pulse huir
function huir() {
  alert("Has decido huir! Si no eres suficientemente fuerte... Ve y buscar objetos con los que atacar!. Pierdes 1 punto de XP"); 
  player.xp  = player.xp -1;
  document.getElementById("luchar").style.opacity= 0;
  document.getElementById("huir").style.opacity = 0;
  playerModelToScreen();
}




//Bucle de lucha (peticiones a la API ataque), hasta que jugador o enemigo mueren o jugador pulsa boton HUIR
function luchar(){
  
  document.getElementById("luchar").style.opacity= 1;
  luchar_huir.turno_player = true;
  var quitar_atacado = 0;
  var theUrl;
  var defensa, ataque, id_enemigo, vidasEnemigo, vidas_defensa = 0;
  var muerte = false;
  //while(!muerte){
    if(luchar_huir.turno_player){//ataca el player
      id_enemigo = conQueEnemigoEstoyLuchando();
      defensa = defensaEnemigo(id_enemigo);
      theUrl = crearUrlLucha(player.ataque, defensa);//ataque player, defensa enemigo
      quitar_atacado = httpGetRequest(theUrl);
      console.log(quitar_atacado + "quitaratacado");
      vidasEnemigo = cuantasVidasEnemigo(id_enemigo);
      console.log(vidasEnemigo+": vidas enemigo");
      vidas_defensa = vidasEnemigo - quitar_atacado;
      console.log("vidas defensa"+vidas_defensa);
      document.getElementById("enemigo_vidas").innerHTML = "VIDAS: "+vidas_defensa;
      actualizaVidasDefensa(vidas_defensa, id_enemigo);
      if(vidas_defensa <= 0){
        actualizaXpPlayer(id_enemigo);
        actualizarObjPlayer(id_enemigo);
        alert("Player has ganado la batalla! Se te han añadido los objetos y la xp del enemigo");
        document.getElementById("luchar").style.opacity= 0;
        muerte = true;
      }else{
        luchar_huir.turno_player = false;
        document.getElementById("luchar").style.opacity= 0;
        document.getElementById("huir").style.opacity= 0;
        alert("Ahora ataca el enemigo, espera hasta que se modifiquen las vidas!");
      


      //ataca el enemigo
        ataque = ataqueEnemigo(id_enemigo);
        theUrl = crearUrlLucha(ataque, player.defensa);
        quitar_atacado = httpGetRequest(theUrl);
        vidas_defensa = player.vida - quitar_atacado;
        document.getElementById("player_vidas").innerHTML = "VIDAS: "+vidas_defensa;
        player.vida = vidas_defensa;
        console.log(player.vida+"player.vida");
          
        if(vidas_defensa < 0){
          var part = prompt("Player has muerto --> que desea hacer ¿Cargar Partida o Comenzar Partida?", "comenzar o cargar");
          if (part.toLowerCase() == "cargar") cargarPartida();
          else if (part.toLowerCase() == "comenzar"){ 
            document.getElementById("luchar").style.opacity= 0;
            muerte = true;
            var creacionObjEnemigo = new enemigoObjetos(2,2,"media/images/obj2_opt.png",);//ataque, defensa, xp, img
            var creacionEnemigo = new initEnemigo(5,id_enemigo,2,2,5,"media/images/enemigo1.png", creacionObjEnemigo);//vidas,id,ataque, defensa, xp, img, obj
            enemigo[0] = creacionEnemigo;
            comenzarPartida();
            console.log("ENEMIGO VIDA: "+enemigo[0].vida);
            console.log("PLAYER "+player.vida);
            
          }
            else {
              alert("la opcion introducida no corresponde con las opciones, comenzando partida...");
              document.getElementById("luchar").style.opacity= 0;
              muerte = true;
              var creacionObjEnemigo = new enemigoObjetos(2,2,"media/images/obj2_opt.png",);//ataque, defensa, xp, img
              var creacionEnemigo = new initEnemigo(5,id_enemigo,2,2,5,"media/images/enemigo1.png", creacionObjEnemigo);//vidas,id,ataque, defensa, xp, img, obj
              enemigo[0] = creacionEnemigo;
              
              comenzarPartida();

              //HAY QUE CERRAR EL PANELILLO
            }

          

        }else{
          
          luchar_huir.turno_player = true;
          document.getElementById("luchar").style.opacity= 1;
          document.getElementById("huir").style.opacity= 1;
        
        }
    }

    }
    playerModelToScreen();
  }
//}
/*Guille: Función que verifica, que se haya pulsado el teclado*/
function arrow_clicked(boton) {
  eliminarCasillaActual();//borro flechita (minimapa)
  var direcc = player.estadoPartida.direccion;
  if(boton == 'up' && direcc == 0 && player.estadoPartida.y != 0) {
    if(localizarCasilla(player.estadoPartida.x, player.estadoPartida.y-1).oscuridad == false) player.estadoPartida.y--;
  }
    else if (boton == 'down' && direcc == 2 && player.estadoPartida.y != 9) {
      if(!localizarCasilla(player.estadoPartida.x,player.estadoPartida.y+1).oscuridad) player.estadoPartida.y++;
    }
    else if (boton == 'right' && direcc == 1 && player.estadoPartida.x != 9) {
      if(!localizarCasilla(player.estadoPartida.x+1,player.estadoPartida.y).oscuridad) player.estadoPartida.x++;
    }
    else if (boton == 'left' && direcc == 3 && player.estadoPartida.x != 0) {
     if(!localizarCasilla(player.estadoPartida.x-1,player.estadoPartida.y).oscuridad) player.estadoPartida.x--;
    }
    else if(boton == 'rot_right') {
      player.estadoPartida.direccion = (player.estadoPartida.direccion + 1)%4;}
    else if(boton == 'rot_left') {
      if(player.estadoPartida.direccion == 0)  player.estadoPartida.direccion = 4;
      player.estadoPartida.direccion = (player.estadoPartida.direccion - 1) % 4;
    
    }
  
  
  
  console.log("Direccion Partida   " + player.estadoPartida.direccion);
  console.log("POS_X: " + player.estadoPartida.x + "POS_Y: " + player.estadoPartida.y);
  pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
  comprobarSubirNivel(player.estadoPartida.x, player.estadoPartida.y, player.estadoPartida.direccion);
  

}

/*Comprueba si es hora de subir de nivel*/
function comprobarSubirNivel(x, y, dir) {
  var puntos = -1 * player.nivel * player.xp;
  var ok = 0;
  if(player.nivel == -2 && dir == 1 && x == 8 && y == 0 && puntos >= 20 ) {
    player.nivel = -1;
    ok = 1;
    eliminarCasillaActual();

  } else if(player.nivel == -2 && dir == 0 && x == 9 && y == 1 && puntos >= 20) {
    player.nivel = -1;
    ok = 1;
    eliminarCasillaActual();
  } else if(player.nivel == -1 && dir == 0 && x == 9 && y == 1 && puntos >= 49){
    alert("ENHORABUENA, HAS GANADO EL JUEGO");
  } else if(player.nivel == -1 && dir == 1 && x == 8 && y == 0 && puntos >= 49){
    alert("ENHORABUENA, HAS GANADO EL JUEGO");
  }

  if(ok == 1) {
    player.estadoPartida.x = 0;
    player.estadoPartida.y = 9;
    
    inicializarMiniMapa();//y lleno mapa[]
    pintarCasillaActual();
    eliminarCasillaActual();
    
    pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
    playerModelToScreen();

  }
} 

/*Guille: Funcion que en base a una coordenada encuentra la casilla asociada */
function localizarCasilla(y, x) {
  for(var i = 0; i<mapa.length;i++) {
    if(mapa[i].id == ""+x+""+y) {
      var cas = mapa[i];
    }
  }
  return cas;
} 
/*Funcionq ue se encarga de eliminar la imagen de la casilla de la posicion actual*/
function eliminarCasillaActual() {
  var cas = document.getElementById("casilla" + player.estadoPartida.y + player.estadoPartida.x);
  cas.removeChild(cas.childNodes[0]);//cas.firstChild
  console.log("Eliminado");

}

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  
  /*Actualizamos la posición de la casilla actual*///flechita minimapa
  var imgActual = document.createElement("img");
  imgActual.setAttribute("src","./media/images/flecha" + player.estadoPartida.direccion+".png");
  imgActual.id = "posActual";
  document.getElementById("casilla" + player.estadoPartida.y + player.estadoPartida.x).appendChild(imgActual);

  /*Según el estado de la direción  */
  switch(player.estadoPartida.direccion) {
    case 0: /*norte*/
     if(x == 9 && y == 1) {
      return "dungeon_door.png";
      } /*Si estamos delante de la puerta*/ 
      else {
        if(y == 0) {
          return "dungeon_wall.png" ;
        } else {
            
            switch (localizarCasilla(x,y-1).obj) {
              
              case 1:
              if(localizarCasilla(x,y-1).oscuridad){
                return "martell1p.png"
              }else{
                return "martell1x.png"
              }
              break;
              case 2:if(localizarCasilla(x,y-1).oscuridad){
                return "espasa1p.png"
              }else{
                return "espasa1x.png"
              }
              break;
              default:
                switch (localizarCasilla(x,y-1).enemigo) {
                  case 1:
                    return "e1x.png"
                  break;
                
                  default:
                    if(localizarCasilla(x,y-1).oscuridad) return "dungeon_wall.png";
	                    else return "dungeon_step.png";
                    break;
                }
                return "dungeon_step.png";
              break;
            }

      }
    }
      break;
    case 2: /*sur*/
      if(y == 9) {
       return "dungeon_wall.png";
      } else {
        if(localizarCasilla(x,y+1).oscuridad){
          return "dungeon_wall.png";
        }else{
          switch (localizarCasilla(x,y+1).obj) {
            case 1:
              if(localizarCasilla(x,y+1).oscuridad){
                return "martell1p.png"
              }else{
                return "martell1x.png"
              }
              break;
              case 2:if(localizarCasilla(x,y+1).oscuridad){
                return "espasa1p.png"
              }else{
                return "espasa1x.png"
              }
            
              default:
                if(localizarCasilla(x,y+1).oscuridad) return "dungeon_wall.png";
                  else return "dungeon_step.png";
                break;
            }
              return "dungeon_step.png";
            break;
          }
        } 
       
      break;  
    case 1: /*este*/
     if(x == 8 && y == 0) return "dungeon_door.png"; /*Si estamos delante dela puerta*/
      if(x == 9) {
        return "dungeon_wall.png";
      }
      else {
        if(localizarCasilla(x+1,y).oscuridad){
          return "dungeon_wall.png";
        }else{
          switch (localizarCasilla(x+1,y).obj) {
            
            case 1:
            if(localizarCasilla(x+1,y).oscuridad){
              return "martell1p.png"
            }else{
              return "martell1x.png"
            }
            break;
            case 2:if(localizarCasilla(x+1,y).oscuridad){
              return "espasa1p.png"
            }else{
              return "espasa1x.png"
            }
            break;
            default:
            switch (localizarCasilla(x+1,y).enemigo) {
              case 1:
                return "e1x.png"
              break;
            
              default:
                if(localizarCasilla(x+1,y).oscuridad) return "dungeon_wall.png";
                break;
            }
            return "dungeon_step.png";
            break;
          }
        }
       }
       /* En caso de que hayamos encontrado la puerta */
      break;
    case 3: /*oeste*/
      if(x == 0) {
        return "dungeon_wall.png";
      }
      else {
        if(localizarCasilla(x-1,y).oscuridad){
          return "dungeon_wall.png";
        }else{
          switch (localizarCasilla(x-1,y).obj) {
            
            case 1:
            if(localizarCasilla(x-1,y).oscuridad){
              return "martell1p.png"
            }else{
              return "martell1x.png"
            }
            break;
            case 2:
            if(localizarCasilla(x-1,y).oscuridad){
              return "espasa1p.png"
            }else{
              return "espasa1x.png"
            }
            break;
            default:
            switch (localizarCasilla(x-1,y).enemigo) {
              case 1:
                return "e1x.png"
              break;
            
              default:
                if(localizarCasilla(x-1,y).oscuridad) return "dungeon_wall.png";
                  else return "dungeon_step.png";
                break;
            }
              return "dungeon_step.png";
            break;
          }
        } 
       }
      break;   
  }
}
/*Guille: Método que se encarga de pintar minimapa*/
function inicializarMiniMapa() {
  if(player.nivel==-2&&contPart==0) {
    var minimapaDOM = document.getElementById("mapacanvas");
  /* Crea dinámicamente las casillas del minimapa */
    for (var i = 0; i<10; i++) {
      for (var j = 0; j <10;j++) {
       var casilla = document.createElement("div");
       casilla.style.border = "4.5px solid white";
       casilla.id = "casilla" + i + j;
       casilla.style.width = "20px";
       casilla.style.height = "20px"; 
       if(i == 0 && j == 9) {//salida
          casilla.style.backgroundColor = "yellow";
        }
        var casillaMiniMapa = new casillaMapa(i,j);//poso x,y,oscuridad
        mapa.push(casillaMiniMapa); //afegim a la var mapa[]
     
        minimapaDOM.appendChild(casilla);//appendChild--> añadir item a una lista
      
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
    colocarObj("81",1); 
    colocarObj("61",2);
    colocarEnemigo("82",1);
  }
  else if(player.nivel == -1 ) {
    var minimapaDOM = document.getElementById("mapacanvas")
    for (var i = 0; i<100; i++) {
      
      minimapaDOM.removeChild(minimapaDOM.firstChild);
      
      mapa.splice(i, 1);

    } 
  /* Crea dinámicamente las casillas del minimapa */
    for (var i = 0; i<10; i++) {
      for (var j = 0; j <10;j++) {
       var casilla = document.createElement("div");
       casilla.style.border = "4.5px solid white";
       casilla.id = "casilla" + i + j;
       casilla.style.width = "20px";
       casilla.style.height = "20px"; 
       if(i == 0 && j == 9) {//salida
          casilla.style.backgroundColor = "yellow";
        }
        var casillaMiniMapa = new casillaMapa(i,j);//poso x,y,oscuridad
        mapa.push(casillaMiniMapa); //afegim a la var mapa[]
     
        minimapaDOM.appendChild(casilla);//appendChild--> añadir item a una lista
      
      //console.log(casilla.id);
      }
    }

    pintarMinimapa("00","90","columna",0);
    pintarMinimapa("01","81","columna",0);
    pintarMinimapa("10","13","fila",0);
    pintarMinimapa("80","87","fila",0);
    pintarMinimapa("19","99","columna",0);
    pintarMinimapa("44","47","fila",0);
    pintarMinimapa("34","54","columna",0);
    pintarMinimapa("33","34","fila",0);
    pintarMinimapa("77","87","columna",0);
    pintarMinimapa("16","36","columna",0);
    pintarMinimapa("16","19","fila",0);
    pintarMinimapa("47","57","columna",0);
    colocarObj("81",1); 
    //colocarObj("61",2);
    colocarEnemigo("82",1);



  }
}

//marco en la casilla correspondiente del mapa que hay un enemigo
function colocarEnemigo(donde, id_enemigo) {
  mapa[donde].enemigo = id_enemigo;
  document.getElementById("casilla"+donde).style.backgroundColor = "green";
  //está hecho para q los enemigos solo tengan 1 objeto; por lo tanto su defensa i ataque total es el mismo q el del objeto y punto
  var creacionObjEnemigo = new enemigoObjetos(2,2,"media/images/obj2_opt.png",);//ataque, defensa, xp, img
  var creacionEnemigo = new initEnemigo(5,id_enemigo,2,2,5,"media/images/enemigo1.png", creacionObjEnemigo);//vidas,id,ataque, defensa, xp, img, obj
  enemigo.push(creacionEnemigo); 


}
function colocarObj(donde, tipo){
  if(tipo == 1){
    
    mapa[donde].obj=1;
    document.getElementById("casilla"+donde).style.backgroundColor = "orange";//se sacará, solo es para ver donde tenemos objectos


  }else{
    mapa[donde].obj=2;
    document.getElementById("casilla"+donde).style.backgroundColor = "blue";//se sacará, solo es para ver donde tenemos objectos
  
  }
}
/* Método que se encarga de barrer tanto filas como columnas y pintar la oscuridad i decir si se encuentra objecto*/
/* tipo: fila o columna */ 
function pintarMinimapa(inicio, fin, tipo, actual) {
  if(tipo == "columna") {
    for (var i = inicio.charAt(0); i <= fin.charAt(0); i++) {// 00 80
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

function guardarPartida() {
  /*Se encarga de leer que hay en el HTML*/ 
  var partidasGuardadas = JSON.parse(httpGetRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8"));

    switch (partidasGuardadas.length) {
      case 0: 
        var url = "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=1";
        httpPostRequest(url,JSON.stringify(player));
        player.pGuardadas++;
        console.log("PARTIDA GUARDADA");
        break;
      case 1: 
        if(partidasGuardadas[0] == "2"){
         var url = "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=1";
         player.pGuardadas++;
         httpPostRequest(url,JSON.stringify(player));
          console.log("PARTIDA GUARDADA en slot 1");
        } else {
          var url = "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=2";
          player.pGuardadas++;
          httpPostRequest(url,JSON.stringify(player));
          console.log("PARTIDA GUARDADA en slot 2");
        }
        
        break;
      case 2:
        //ya estan llenos los dos slots 
        var p1 = JSON.parse(httpGetRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=1"));
        var p2 = JSON.parse(httpGetRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=2"));
        var ok = false;
        do {
          var part = prompt("Actualmente existen 2 partidas guardadas, seleccione cual quiere borrar " + p1.nombre + " o " + p2.nombre ,"Introduzca el nombre de la partida");
          var url = "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=1";
          ok = comprobacionNombre(part, p1,p2);
        } while(ok == false);
      break;
      
    }
}
function cargarPartida() {
  if(contPart==0){
    inicializarMiniMapa();//y lleno mapa[]
    
    
    contPart++;
  } else {eliminarCasillaActual();}
    
  
 
  var partidasGuardadas = JSON.parse(httpGetRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8"));
  console.log(partidasGuardadas.length);
  if(partidasGuardadas.length == 2) { 
    var p1 = JSON.parse(httpGetRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=1"));
    var p2 = JSON.parse(httpGetRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=2"));
    var part = prompt("Actualmente existen 2 partidas guardadas, seleccione cual quiere iniciar " + p1.nombre + " o " + p2.nombre ,"Introduzca el nombre de la partida");
    comprobacionPartida(part, p1, p2);
    //pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
    
    playerModelToScreen();
  } else {
    if(partidasGuardadas[0] == "2"){
      var p2 = JSON.parse(httpGetRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=2"));
      alert("Actualmente solo existe 1 partidas guardada, recuperando  partida: " + p2.nombre);
      player = p2;
      //pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
      
      playerModelToScreen();
     } else {
      var p1 = JSON.parse(httpGetRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=1"));
      alert("Actualmente solo existe 1 partidas guardada, recuperando  partida: " + p1.nombre);
      player = p1;
      //pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
      
      playerModelToScreen();
     }

  }
  
}

function comprobacionNombre(part, p1, p2) {
  /*Comprueba si el nombre introducido es correcto*/
  var ok = false;
  if(part == p1.nombre) {
    ok = true;
    httpDeleteRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=1");
    console.log("ELIMINADO SLOT 1");
    var url = "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=1";
    httpPostRequest(url,JSON.stringify(player));
  } else if(part == p2.nombre) {
    ok = true;
    httpDeleteRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=2");
    var url = "http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=2";
    httpPostRequest(url,JSON.stringify(player));
  } 
  console.log("PARTIDA GUARDADA"); 
  return ok;
}

function eliminarPartida() {
  var partidasGuardadas = JSON.parse(httpGetRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8"));
  switch (partidasGuardadas.length) {
    case 2:
      var p1 = JSON.parse(httpGetRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=1"));
      var p2 = JSON.parse(httpGetRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=2"));
      var part = prompt("Actualmente existen 2 partidas guardadas, seleccione cual quiere borrar " + p1.nombre + " o " + p2.nombre ,"Introduzca el nombre de la partida");
      if (part == p1.nombre) httpDeleteRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=1");
      else if(part == p2.nombre) httpDeleteRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=2");
      else alert("la partida introducida no corresponde con ninguna de las guardadas");
      break;
    case 1: 
      if (partidasGuardadas[0] == "2") {
        var p2 = JSON.parse(httpGetRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=2"));
        alert("Eliminando la única partida que existe " + p2.nombre); 
        httpDeleteRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=1");
      } else {
        var p1 = JSON.parse(httpGetRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=1"));
        alert("Eliminando la única partida que existe " + p1.nombre); 
        httpDeleteRequest("http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=6203a748-e182-4276-a910-9f00d83ff3e8&slot=1");
      }
      break;
    case 0:
      alert("No hay partidas almacenadas en el sistema");
      break;
  }

}

function comprobacionPartida(part, p1, p2) {
  if(part == p1.nombre) {
    player = p1;
    pintarCasillaActual();
  } else if(part == p2.nombre) {
    player = p2;
    pintarCasillaActual();
  } else {
    alert("La partida introducida no es correcta")
  }
  console.log("PARTIDA GUARDADA");
}

function playerModelToScreen(){
  document.getElementById("nombre").innerHTML = player.nombre;
  document.getElementById("nivel").innerHTML = player.nivel;
  document.getElementById("ataque").innerHTML = player.ataque;
  document.getElementById("defensa").innerHTML = player.defensa;
  document.getElementById("xp").innerHTML = player.xp;
  document.getElementById("vida").innerHTML = player.vida;
  for(var i = 0; i<player.mochila.length; i++) {
    if(player.mochila[i].obj == 1) {
      document.getElementById("martilloImg").style.opacity = 1;
    }
    if(player.mochila[i].obj == 2) {
      document.getElementById("espadaImg").style.opacity = 1;
    }
    console.log("PLAYER, MOCHILA   "+player.mochila[i].obj)

  }
}
  


