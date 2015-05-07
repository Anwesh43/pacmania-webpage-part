var canvas;
var context;
var rects = [];
var worker;
window.onload = function() {
    canvas = document.getElementById('canv');
    context = canvas.getContext('2d');
    worker = new Worker('Worker_Fetch.js');
    worker.onmessage = function(event) {
        update();  
    };
};
function update() {
    $.ajax({url:"http://192.168.1.2:8000/fetchPac",method:'get'}).success(function(data){
       
        if(data[0].length > rects.length) {
            
            rects.push(data[0][data[0].length-1]);
            console.log(data[0]);
            console.log(data[0][data[0].length-1]);
        }
    });
    drawSomePacman();
}
function drawSomePacman() {
    context.clearRect(0,0,1000,600);
    context.fillStyle="yellow";
    for(var i=0;i<rects.length;i++) {
        var rect = rects[i];
        context.save();
        context.translate(rect.x,rect.y);
        context.rotate(rect.deg*Math.PI/180);
        context.beginPath();
        context.moveTo(0,0);
        for(var s=rect.a;s<=360-rect.a;s++) {
            context.lineTo(50*Math.cos(s*Math.PI/180),50*Math.sin(s*Math.PI/180));
        }
        context.lineTo(0,0);
        context.fill();
        context.restore();
        rect.x +=rect.speedx;
        rect.a += 10*rect.dir;
        if(rect.a >= 30 || rect.a <=0) {
            rect.dir *= -1;
        }
    }
}