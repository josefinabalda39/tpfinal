//alumnas: juana burgos y josefina balda
//comision 2

// Arreglo principal de pantallas y variables de control
let pantallas = [];
let pantallaActual = 0;

// Variable de estado para controlar los textos 
let estadoCocina = 0; 

// Variables para imágenes, sonido y tipografías 
let imagenes = [];
let sonidoClick;
let fuenteMenu;      
let fuenteGeneral; 

function preload() {
  // Cargamos las imágenes de fondo para cada pantalla 
  imagenes[0] = loadImage('menu.jpg');   
  imagenes[1] = loadImage('casa.jpg');   
  imagenes[2] = loadImage('cocina.jpg');  
  imagenes[4] = loadImage('sotano.jpg');  

  // Cargamos las tipografías (Asegúrate de tener ambos archivos en tu proyecto)
  fuenteMenu = loadFont("tipografia.ttf"); 
  fuenteGeneral = loadFont("letrageneral.ttf"); // <--- Tipografía para el resto de textos y botones
}

function setup() {
  createCanvas(800, 450); // Resolución
  rectMode(CENTER);
  
  // Iniciamos todas las pantallas 
  iniciarPantallas();
}

function draw() {
  background(10);
  
  // Si hay imagen para la pantalla actual, se dibuja de fondo
  if (imagenes[pantallaActual]) {
    image(imagenes[pantallaActual], 0, 0, width, height);
  }

  // Capa de atmósfera oscura sutil sobre la imagen para resaltar los textos de terror
  noStroke();
  fill(0, 75);
  rect(width / 2, height / 2, width, height);

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
    texto: "Una ciudad quedó abandonada después de la aparición de unas criaturas que detectan cualquier sonido. La protagonista Emma y su amigo Nicolás llevan días escondidos. Reciben por radio un mensaje: Hay un refugio al norte. Salgan antes del anochecer.",
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
  // Estética de terror: fondo oscuro semitransparente con tinte rojizo/grisáceo y borde sangriento sutil
  fill(12, 10, 14, 225);
  stroke(130, 25, 25, 200);
  strokeWeight(2);
  
  // Caja de texto centrada y un poco más estilizada
  rect(width / 2, 120, 720, 150, 6);
  
  fill(235, 230, 230); // Color de texto blanco hueso
  noStroke();
  
  // Aplicamos la tipografía general para los textos de la historia
  push();
  if (fuenteGeneral) {
    textFont(fuenteGeneral); 
  }
  textSize(15); 
  textAlign(LEFT, TOP);
  text(txt, 45, 52, 630, 130);
  pop();
}

function dibujarBotones(opciones) {
  let yInicio = 230;
  let bx = width / 2;
  let bw = 460;
  let bh = 38;

  for (let i = 0; i < opciones.length; i++) {
    let by = yInicio + (i * 50);
    
    // Detección de hover para cambiar el color del botón
    let sobreBoton = (mouseX > bx - bw / 2 && mouseX < bx + bw / 2 && mouseY > by - bh / 2 && mouseY < by + bh / 2);

    if (sobreBoton) {
      fill(70, 18, 18, 240); // Rojo sangre oscuro al pasar el mouse
      stroke(220, 50, 50);
    } else {
      fill(22, 18, 22, 210); // Fondo de botón oscuro normal
      stroke(110, 30, 30, 180);
    }
    
    strokeWeight(1.5);
    rect(bx, by, bw, bh, 4);
    
    fill(240);
    noStroke();
    
    // Aplicamos tipografía diferenciada y tamaños ajustados
    push();
    if (pantallaActual === 0) {
      if (fuenteMenu) textFont(fuenteMenu);
      textSize(18); // Tamaño para el menú principal
    } else {
      if (fuenteGeneral) textFont(fuenteGeneral);
      textSize(18); // <--- Tamaño agrandado a 18 para los botones de las demás pantallas
    }
    
    textAlign(CENTER, CENTER);
    text(opciones[i].texto, bx, by);
    pop(); 
  }
}

function verificarClicks(indice) {
  let yInicio = 230;
  let bx = width / 2;
  let bw = 460;
  let bh = 38;

  // Manejo de clics específico para la Cocina (índice 2)
  if (indice === 2) {
    if (estadoCocina === 0) {
      let by1 = yInicio;
      if (mouseX > bx - bw/2 && mouseX < bx + bw/2 && mouseY > by1 - bh/2 && mouseY < by1 + bh/2) {
        estadoCocina = 1; 
      }
      let by2 = yInicio + 50;
      if (mouseX > bx - bw/2 && mouseX < bx + bw/2 && mouseY > by2 - bh/2 && mouseY < by2 + bh/2) {
        estadoCocina = 2; 
      }
    } else {
      let by = yInicio;
      if (mouseX > bx - bw/2 && mouseX < bx + bw/2 && mouseY > by - bh/2 && mouseY < by + bh/2) {
        pantallaActual = 4; 
        estadoCocina = 0;   
      }
    }
  } else {
    let opciones = pantallas[indice].opciones;
    for (let i = 0; i < opciones.length; i++) {
      let by = yInicio + (i * 50);
      
      if (mouseX > bx - bw / 2 && mouseX < bx + bw / 2 && mouseY > by - bh / 2 && mouseY < by + bh / 2) {
        pantallaActual = opciones[i].siguiente;
      }
    }
  }
}
