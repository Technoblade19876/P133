x = 0;
y = 0;

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function setup(){
    canvas = createCanvas(900, 600);
}

function preload(){
    apple = loadImage("apple.png")
}

function start() {
    document.getElementById("status").innerHTML = "System is listening please speak";
    recognition.start();
}

recognition.onresult = function(event){
    console.log(event);

    var content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognised as: " + content
    to_number = Number(content);
    if(Number.isInteger(to_number)){
        document.getElementById("status").innerHTML = "Started drawing apple";
        draw_apple = "set";
    }else{
        document.getElementById("status").innerHTML = "The speech has not recognised a number ";
    }
    
}

function draw(){
if(draw_apple == "set"){
    for(var i = 0; i < to_number; i++) {
        x = Math.round(Math.random() * 700);
        y = Math.round(Math.random() * 400);
        image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number+ "Apples Drawn";
    draw_apple = "";



    var synth = window.speechSynthesis;
    speak_data = to_number + "Apples drawn";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
}