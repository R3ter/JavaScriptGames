var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";

canvas.onclick=clickEvent
var mines=[]
var blocks=[]
var clickedblocks=[];
let lose=false;

let remain;


document.onkeydown=(event)=>{
    if(event.keyCode==13){
        if(lose){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            mines=[]
            blocks=[]
            clickedblocks=[];
            lose=false;
            resetgame();
        }
    }
}

ctx.beginPath();

resetgame();
function resetgame(){
    remain=180;
    for( var i=0; i<=17; i++){
        for(var f=0; f<=9; f++){
            ctx.rect(i*60, f*60, 59, 59);
            ctx.fillStyle = "#1E8449";
            ctx.fill();
            blocks.push({x:i*60,y:f*60});
        }
    }
    ctx.closePath();
    for(var i=0; i<10; i++){
        var random=Math.floor(Math.random() * blocks.length);
        if(mines.includes(blocks[random])){
          i--;
        }else{
            mines.push(blocks[random]);
        }
    }
}
function clickEvent(e) {
    if(lose){return;}
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    x=Math.floor(Math.round(x)/60)*60;
    y=Math.floor(Math.round(y)/60)*60;

    mines.forEach((c)=>{
        if(c.x==x&&c.y==y){
            ctx.beginPath();
            mines.forEach((e)=>{
                ctx.fillStyle = "#ff0000";
                ctx.rect(e.x,e.y, 60, 60);
                ctx.fill();
            })
            ctx.closePath();
            lose=true;
        }
    })
    
    if(!lose){

        remain--;
        clickedblocks.push({x:x,y:y});
        ctx.beginPath();
        ctx.fillStyle = "#000000";

        ctx.rect(x,y, 60, 60);
        ctx.fill();
        ctx.closePath();
    }else{
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Game Over", 430, 285);
        ctx.fillText("press enter to restart", 390, 500);
        ctx.stroke();
        ctx.closePath();
    }
    
}
