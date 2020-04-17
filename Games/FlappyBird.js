var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";

console.log(canvas.width);

let bird=new Image();
bird.src="./images/bird.png";

let pipimage=new Image();
pipimage.src="./images/pipe.png";

let pips=[];
let lose=false;

let gravity=8;

//height 30*19
//width 30*35

let y=270,x=450;


document.onkeydown=()=>{move(event)}

let score=0;
let highscore=localStorage.getItem(window.location.hash.replace("#","")+':highscore')||0

let draw=()=>{

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bird, x, y,30,30);
    
    pips.forEach((e)=>{
        ctx.drawImage(pipimage, e.x, canvas.height-e.height,100,e.height);
        ctx.drawImage(pipimage, e.x, 0,100,(canvas.height-e.height)-150);
    })
    
    ctx.beginPath();
    ctx.fillStyle = "#00ff06";
    ctx.fillText(score, 480, 50);
    ctx.fillText('HighScore : ' + highscore, 780, 50);
    ctx.closePath();

    if(lose){
        ctx.beginPath();
        ctx.fillStyle = "#ff3333";
        ctx.fillText("Game Over", 430, 285);
        ctx.fillText("press enter to restart", 390, 500);
        ctx.stroke();
        ctx.closePath();
    }
     
}
function lost(){
    lose=true;
    if(highscore<score){
        localStorage.setItem(window.location.hash.replace("#","")+':highscore',score);
        highscore=score;
    }
    
}
let render=()=>{
    gravity++;
    y=y+gravity;
    if(y<0){y=0;}
    if(y>30*19){y=30*19;}
    if(y==0||y==30*19){
        lost()
    }
    
    let number=0;
    pips.forEach((e)=>{
        if(lose){return;}
        if(x==e.x){
            score++;
        }
        if (Math.abs(x-(e.x+30))<60) {
            if(y<(canvas.height-e.height-150)||
            y>(canvas.height-30-e.height)){
                lost()
            }
        }
        
        e.x=e.x-10;
        if(e.x<-100){
            pips.splice(number,1);
        }
        number++;
    })

}
function move(event){
    if(event.keyCode==13){
        if(lose){
            y=270;
            score=0;
            gravity=8;
            pips=[];
            lose=false;
        }
    }
    if(event.keyCode==32){
        if(lose){return;}
        let time=0;
        gravity=8;
        let timer=setInterval(()=>{
            if(lose){return;}
            y=y-20;
            time++;
            if(time==8){
                clearInterval(timer)
            }
        },51);
    }
}
let createPips=()=>{
    if(!lose){
        let height= Math.floor(Math.random() * 12) + 4;
        pips.push({x:canvas.width,height:30*height})
    }
}
setInterval(()=>{
    createPips();
},3000)
setInterval(()=>{
    render();
    draw();
},51)
