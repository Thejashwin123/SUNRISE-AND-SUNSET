const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var hour;

var bg = "sunrise.png";

function preload() {
    getBackgroundImg()
}

function setup(){
    var canvas = createCanvas(1200,700);
    engine = Engine.create();
    world = engine.world;

}

 async function draw(){
      
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    console.log(datetime)
    var hour = datetime.slice(11,13);
    if(backgroundImg)
        background(backgroundImg);

    Engine.update(engine);

    fill("black");
    textSize(30);

    if(hour>=0 && hour<18 ){
        text("TIME : "+ hour%12 + " AM", 50,100);
    }else if(hour==0){
        text("TIME : 12 AM",100,100);
    }else{
        text("TIME : "+ hour%12 + " PM", 50,100);
    }
    
}




async function getBackgroundImg(){

   //fetching details from api
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    //responsejson
    var responseJSON = await response.json();
    //date and time from responce json
    var datetime = responseJSON.datetime;
    console.log(datetime)
    var hour = datetime.slice(11,13);
    

    //change background image code
    if(hour>=06 && hour<12 ){
        bg = "sunrise.png";
    }
    else if (hour>=12 && hour<16 ){
        bg = "sunrise5.png"
    }
    else if (hour>=16 && hour<18 ){
        bg = "sunset.png"
    }
    else if (hour>=18 && hour<0 ){
        bg = "sunset11.png"
    }
    else if (hour>=0 && hour<06 ){
        bg = "sunset12.png"
    }

    //load image
    backgroundImg = loadImage(bg);
}
