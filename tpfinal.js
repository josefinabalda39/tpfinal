//alumnas: juana burgos y josefina balda
//comision 2

// Arreglo principal de pantallas y variables de control
let pantallas = [];
let pantallaActual = 0;

// Variable de estado para controlar los textos 
let estadoCocina = 0; 

// Variables para imágenes y sonido 
let imagenes = [];
let sonidoClick;

function preload() {
  // Cargamos las imágenes de fondo para cada pantalla 
  imagenes[0] = loadImage('menu.jpg');   
  imagenes[1] = loadImage('casa.jpg');   
  imagenes[2] = loadImage('cocina.jpg'); 
  imagenes[4] = loadImage('sotano.jpg'); 
}

function setup() {
  createCanvas(800, 450); // Resolución
  rectMode(CENTER);
  
  // Iniciamos todas las pantallas 
  iniciarPantallas();
}

function draw() {
  background(20);
  
  // Si hay imagen para la pantalla actual, se dibuja de fondo
  if (imagenes[pantallaActual]) {
    image(imagenes[pantallaActual], 0, 0, width, height);
  }

  // Mostramos el texto y los botones de la pantalla activa
  mostrarPantalla(pantallaActual);
}

function mousePressed() {
  // Verificamos si se hizo clic en las opciones de la pantalla activa
  verificarClicks(pantallaActual);
}

function iniciarPantallas() {
  
  // PANTALLA 0: MENÚ / INICIO
  pantallas.push({
    texto: "Una ciudad quedó abandonada después de la aparición de unas criaturas que detectan cualquier sonido. La protagonista Emma y su amigo Nicolás llevan días escondidos. Reciben por radio un mensaje: Hay un refugio al norte. Salgan antes del anochecer",
    opciones: [
      { texto: "COMENZAR AVENTURA", siguiente: 1 }
    ]
  });

  // PANTALLA 1: La casa abandonada
  pantallas.push({
    texto: "P2 - La casa abandonada\nEmma y Nico necesitan provisiones antes de irse. En la casa encuentran dos lugares que todavía no revisaron.",
    opciones: [
      { texto: "Opción A: Cocina", siguiente: 2 },
      { texto: "Opción B: Sótano", siguiente: 4 }
    ]
  });

  // PANTALLA 2: Cocina
  pantallas.push({
    texto: "P3 - Cocina\nEncuentran comida y una botella de agua. Mientras buscan, escuchan un ruido proveniente del patio.",
    opciones: [
      { texto: "Opción A: Mirar por la ventana", siguiente: 2 },
      { texto: "Opción B: Alejarse y esconderse", siguiente: 2 }
    ]
  });

  // PANTALLA 4: Sótano
  pantallas.push({
    texto: "P4 - Sótano\nEncuentran pilas, una linterna y una vieja radio portátil. De repente escuchan pasos sobre la casa.",
    opciones: [
      { texto: "Opción A: Quedarse en silencio", siguiente: 5 },
      { texto: "Opción B: Salir por la puerta trasera", siguiente: 6 }
    ]
  });

  

}

function mostrarPantalla(indice) {
  let datosPantalla = pantallas[indice];
  
  // Lógica especial para la Pantalla de la Cocina (índice 2)
  if (indice === 2) {
    if (estadoCocina === 0) {
      dibujarCajaTexto(datosPantalla.texto);
      dibujarBotones(datosPantalla.opciones);
    } else if (estadoCocina === 1) {
      dibujarCajaTexto("Descubren que hay una criatura afuera.");
      dibujarBotones([{ texto: "Continuar hacia el Sótano" }]);
    } else if (estadoCocina === 2) {
      dibujarCajaTexto("Evitan que la criatura los detecte.");
      dibujarBotones([{ texto: "Continuar hacia el Sótano" }]);
    }
  } else {
    // Funcionamiento normal para el resto de pantallas
    dibujarCajaTexto(datosPantalla.texto);
    dibujarBotones(datosPantalla.opciones);
  }
}

function dibujarCajaTexto(txt) {
  fill(0, 220);
  stroke(255, 180);
  strokeWeight(2);
  
  // Caja de texto centrada
  rect(width / 2, 125, 740, 170, 10);
  
  fill(255);
  noStroke();
  textSize(13);
  
  // Dibujamos el texto alineado arriba a la izquierda dentro de los márgenes de la caja
  push();
  textAlign(LEFT, TOP);
  text(txt, 55, 55, 690, 140);
  pop();
}

function dibujarBotones(opciones) {
  let yInicio = 250;
  for (let i = 0; i < opciones.length; i++) {
    let bx = width / 2;
    let by = yInicio + (i * 55);
    
    fill(40, 90, 160);
    stroke(255);
    strokeWeight(1);
    rect(bx, by, 480, 40, 6);
    
    fill(255);
    noStroke();
    textSize(13);
    textAlign(CENTER, CENTER);
    text(opciones[i].texto, bx, by);
  }
}

function verificarClicks(indice) {
  let yInicio = 250;
  let bx = width / 2;

  // Manejo de clics específico para la Cocina (índice 2)
  if (indice === 2) {
    if (estadoCocina === 0) {
      let by1 = yInicio;
      if (mouseX > bx - 240 && mouseX < bx + 240 && mouseY > by1 - 20 && mouseY < by1 + 20) {
        estadoCocina = 1; 
      }
      let by2 = yInicio + 55;
      if (mouseX > bx - 240 && mouseX < bx + 240 && mouseY > by2 - 20 && mouseY < by2 + 20) {
        estadoCocina = 2; 
      }
    } else {
      let by = yInicio;
      if (mouseX > bx - 240 && mouseX < bx + 240 && mouseY > by - 20 && mouseY < by + 20) {
        pantallaActual = 4; 
        estadoCocina = 0;   
      }
    }
  } else {
    let opciones = pantallas[indice].opciones;
    for (let i = 0; i < opciones.length; i++) {
      let by = yInicio + (i * 55);
      let bw = 480;
      let bh = 40;
      
      if (mouseX > bx - bw / 2 && mouseX < bx + bw / 2 && mouseY > by - bh / 2 && mouseY < by + bh / 2) {
        pantallaActual = opciones[i].siguiente;
      }
    }
  }
}
