var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";

canvas.style = '840';
canvas.style = '600';

//height 30*19
//width 30*35


let dir=''
let pointer=[{x:0,y:0}]
let canmove=true
let lose=false
document.onkeydown=()=>{move(event)}

function move(event){
    if(event.keyCode==13&&lose){
        pointer=[{x:0,y:0}]
            score=0
            lose=false
            timer=setInterval(()=>{draw(timer)},100)
            x=0
            y=0
            dir=''
    }

    if(event.keyCode==38||
        event.keyCode==40||
        event.keyCode==37||
        event.keyCode==39){
            event.preventDefault();
        }
if(canmove)
if(event.keyCode==38&&dir!='down'){
    dir="up"
    canmove=false
}else if(event.keyCode==40&&dir!='up'){
    dir="down"
    canmove=false
}else if(event.keyCode==37&&dir!='right'){
    dir="left"
    canmove=false
}else if(event.keyCode==39&&dir!='left'){
    dir="right"
    canmove=false
}
}

  ctx.font = "30px Arial";
    let food={x:Math.floor(Math.random() * Math.floor(28))*30,
        y:Math.floor(Math.random() * Math.floor(20))*30}
    let score=0

x=0
y=0

let highscore=localStorage.getItem('highscore')||0

function render(x,y){
    ctx.beginPath();
    ctx.fillStyle = "#00ff06";
    ctx.fillText(score, 480, 50);
    ctx.fillText('HighScore : ' + highscore, 780, 50);
    ctx.rect(x, y, 29, 29);
    ctx.fill();
    ctx.closePath();
}

function draw(timer){
///////fix tis shit
if(x>=canvas.width){x=-30;}
else if(x<-30){x=canvas.width;}
else if(y>=canvas.height){y=-30;}
else if(y<=-30){y=canvas.height;}
//////////////////////////////////////////////////////////////////

ctx.clearRect(0, 0, canvas.width, canvas.height);
createfood()


for(let l=0; l<pointer.length; l++){
    render(pointer[l].x,pointer[l].y)
}



if(dir=='up'){
    y=y-30
}else if(dir=="down"){
    y=y+30
}else if(dir=="left"){
    x=x-30
}else if(dir=="right"){
    x=x+30
}
canmove=true

pointer.shift()
pointer.push({x,y})

for(let l=0; l<pointer.length; l++){
    if(l!=pointer.length-1&&(x==pointer[l].x&&y==pointer[l].y)){
        clearInterval(timer)
        lose=true
        if(!localStorage.getItem('highscore')||localStorage.getItem('highscore')<score){
            localStorage.setItem("highscore", score);
            highscore=score
        }
        ctx.beginPath();
        ctx.fillStyle = "#ff3333";
        ctx.fillText("Game Over", 430, 285);
        ctx.fillText("press enter to restart", 390, 500);
        ctx.stroke();
        ctx.closePath();
    }
}

    if(x==food.x&&y==food.y){
        pointer.push({x,y})
        food={x:Math.floor(Math.random() * 11)*30,y:Math.floor(Math.random() * 11)*30}
        score=score+1;
    }
}

function createfood(){
    ctx.beginPath();
    ctx.rect(food.x, food.y, 29, 29);
    ctx.fillStyle = "#3366ff";
    ctx.fill();
    ctx.closePath();
}


let timer=setInterval(()=>{draw(timer)},100)

