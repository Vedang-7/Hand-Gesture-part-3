prediction_1 ="";
prediction_2 ="";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 1000
});

camera=document.getElementById("camera");
Webcam.attach('#camera');
 
function take_snapshot(){
    webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>'
    });
}
console.log('mi5.version:', mi5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VWgY_2m1F/mode.json', modelloaded);
function modelloaded(){
    console.log('model loaded');
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="the first prediction is "+prediction_1;
    speak_data_2="and the second prediction is "+prediction_2;
    var utter_this=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utter_this);
}
function check(){
    img= document.getElementById("captured_image");
    classifier.classify(img, got_result);
}
function got_result(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1= results[0].label;
        prediction_2= results[1].label;
        speak();
        if(results[0].label=="happy"){
            document.getElementById("update_emoji").innerHTML="";
        }
        if(results[0].label=="sad"){
            document.getElementById("update_emoji").innerHTML="";
        }
        if(results[0].label=="angry"){
            document.getElementById("update_emoji").innerHTML="&#128548;";
        }
        if(results[1].label=="happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;"
        }
        if(results[1].label=="sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if(results[1].label=="angry"){
            document.getElementById("update_emoji2").innerHTML="&#128548;";
        }
    }
}