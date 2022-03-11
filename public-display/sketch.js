//Create the socket




let socket = io();

/*let character = {
    x: 0,
    y: 0
};
let speed = 10;*/

//variables imagenes

let imgDisplay;

//Variable pantalla
let caseScreen;
let controllerOrder;
let myController;

//pre cargar imagen

function preload() {
    imgDisplay = new loadImage("data/Display.png");
   
}

function setup() {
    //frameRate(60);
    createCanvas(1000, 600);
    /*character.x = windowWidth / 2;
    character.y = windowHeight / 2;*/
    caseScreen = 1;
}


//recibe el texto


socket.on('myName',(controllerOrder)=>{

    myController = controllerOrder;
    // text(controllerOrder,20,80)
    console.log(controllerOrder);
 
     
     
 
     console.log('Conectado');
     //console.log(myName);
 });




function draw() {
    background(0);
    
    //image(imgDisplay,0,0);
    switch (caseScreen) {
        case 1:

        imgDisplay.resize(1000,0);
        image(imgDisplay,0,0);

        //Texto de puntajes altos
        fill(255);
       textSize(50);
        text(myController,520,250);
                    
            break;
    
        default:
            break;
    }
}



/*
Listen to the event and use the directions
You may want to use switch-case structure
*/