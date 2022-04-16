status="";
object_name="";
objects=[];

function setup(){
    canvas=createCanvas(300,300);
    console.log("canvas loaded");
    canvas.center();
    video=createCapture(VIDEO);
    video.size(300,300);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
}

function start(){
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object_name=document.getElementById("input").value;
    if(objects[i].label==object_name){
        video.stop();
        objectDetector.detect(gotResults);
        document.getElementById("found").innerHTML= object_name+"Found";
        var synth= window.speechSynthesis;
        var utterThis= new SpeechSynthesisUtterance(object_name+"found");
        synth.speak(utterThis);
    }
    else{
        document.getElementById("found").innerHTML=object_name+"Not Found";
    }
}

function modelLoaded(){
    console.log("Model Loaded!!!");
    status=true;
}

function draw(){
    image(video,0,0,300,300);
    if(status !=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function gotResult(error,results){
    if(error){
        console.error(error)
    }
    console.log(results);
    objects=results;
}