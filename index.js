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
    $.ajax({url:"http://192.168.1.2/fetchPac",method:'get'}).success(function(data){
        if(data.length > rects.length) {
            rects = data;
        }
    });
    drawSomePacman();
}
function drawSomePacman() {
    context.clearRect(0,0,599,399);
    context.fillStyle="yellowgreen";
    for(var i=0;i<rects.length;i++) {
        var rect = rects[i];
        context.save();
        context.translate(rect.x,rect.y);
        context.rotate(rect.deg*Math.PI/180);
        context.beginPath();
        context.moveTo(0,0);
        for(var i=a;i<=360-a;i++) {
            context.lineTo(50*Math.cos(i*Math.PI/180),50*Math.sin(i*Math.PI/180));
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