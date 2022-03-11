


//Create the socket
let socket = io();

let canvas;

//Tratar un Input para el nombre del jugador
let nameInput;
let mailInput;

// Interfaces de movil

let imgInstructions;
let dataCollect;
let reward;


//Puntaje
let score;

//pantalla

let screen;

//Carga para tener las imagenes listas
function preload() {
    imgInstructions = new loadImage("data/Empezar Juego.png");
    dataCollect = new loadImage("data/Recoleccion datos.png");
    reward = new loadImage("data/Recompensa.png");

}


//variables del juego

var ship;
var flowers = [];
var drops = [];

//setup

function setup() {

    score = 0;
    screen = 1;

    //creando el metodo del cuadrado de Input
    nameInput = createInput('');

    mailInput = createInput('');

    //Creando boton para enviar la informacion
    button = createButton('Get my prize!');


    createCanvas(500, 700);

    //inicio juego

    ship = new Ship();
    for (var i = 0; i < 6; i++) {
        flowers[i] = new Flower(i * 80 + 80, 60);
    }
}

function draw() {
    background(0);
    //movementButton('UP', windowWidth / 2, windowHeight / 3);
    //movementButton('DOWN', windowWidth / 2, windowHeight / 1.5);
    //movementButton('RIGHT', windowWidth / 1.5, windowHeight / 2);
    //movementButton('LEFT', windowWidth / 3, windowHeight / 2);

    switch (screen) {
        case 1:
            //pantalla inicial con boton para jugar
            imgInstructions.resize(350, 0);
            image(imgInstructions, 0, 0)

            console.log(mouseX, mouseY)

            fill(244, 0, 0);

            nameInput.hide();
            mailInput.hide();
            button.hide();

            break;

        case 2:

            //Pantalla del juego
            ship.show();
            ship.move();

            for (var i = 0; i < drops.length; i++) {
                drops[i].show();
                drops[i].move();
                for (var j = 0; j < flowers.length; j++) {
                    if (drops[i].hits(flowers[j])) {
                        // flowers[j].grow();
                        drops[i].evaporate();
                        flowers.splice(j, 1);
                        // flowers[i].destroy();
                    }
                }
            }

            var edge = false;

            for (var i = 0; i < flowers.length; i++) {
                flowers[i].show();
                flowers[i].move();
                if (flowers[i].x > width || flowers[i].x < 0) {
                    edge = true;
                }
            }

            if (edge) {
                for (var i = 0; i < flowers.length; i++) {
                    flowers[i].shiftDown();
                }
            }

            for (var i = drops.length - 1; i >= 0; i--) {
                if (drops[i].toDelete) {
                    drops.splice(i, 1);
                }
            }

            /*for (var i = flowers.length - 1; i >= 0; i--) {
                if (flowers[i].toDelete) {
                    flowers.splice(i, 1);
                }
            }*/

            if (flowers.length == 0) {
                screen = 3;

            }


            break;

        case 3:
            //Pantalla de recoleccion de datos

            dataCollect.resize(350, 0);
            image(dataCollect, 0, 0)

            //Input para el nombre del jugador
            text('Name', 50, 320)

            nameInput.size(260);
            nameInput.show();

            nameInput.position(50, 350);


            //Input para el mail del jugador

            text('Mail', 50, 370)
            mailInput.size(260);
            mailInput.show();

            mailInput.position(50, 400);

            //boton para enviar

            button.position(130, 450)
            button.show();
            button.mouseClicked(sendInfo);

            console.log(mouseX, mouseY);

            /* if (button.mouseClicked(sendInfo)) {
                 screen=4;
             }*/

            break;

        case 4:

            //Pantalla de recompensa

            reward.resize(350, 0);
            image(reward, 0, 0)


            nameInput.hide();
            mailInput.hide();
            button.hide();

            break;
        default:
            break;
    }







}
//Enviar el input

function sendInfo() {



    myName = nameInput.value();
    myMail = mailInput.value();


    socket.emit('myName', myName);

    console.log(myName);
    console.log(myMail);
}


//enviar texto al display




//Aca se crearan las zonas sensibles de los botonoes
function mouseClicked() {
    switch (screen) {
        case 1:
            //Boton para pasar de instrucciones a juego 173,503

            if ((mouseX > 90) && (mouseX < 260) && (mouseY > 480) && (mouseY < 530)) {
                screen = 2
            }

            break;

        case 3:
            //Recoleccion de datos, boton para pasar a recompensa
            if ((mouseX > 125) && (mouseX < 212) && (mouseY > 422) && (mouseY < 444)) {
                screen = 4;

            }

            break;

        default:
            break;
    }
}


function keyReleased() {
    if (key != ' ') {
        ship.setDir(0);
    }
}

function keyPressed() {
    if (key === ' ') {
        var drop = new Drop(ship.x, height);
        drops.push(drop);
    }

    if (keyCode === RIGHT_ARROW) {
        ship.setDir(1);
    } else if (keyCode === LEFT_ARROW) {
        ship.setDir(-1);
    }
}

/*function movementButton(direction, posX, posY) {
    ellipse(posX, posY, 50, 50);
    if (dist(pmouseX, pmouseY, posX, posY) < 50) {
        //Send the direction to the server
    }
};*/