var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "300px Arial";

let bullets=[]

let enemies=[];

let lose=false;

let score=0;

document.onkeydown=()=>{controll(event)}

canvas.width=500

let highscore=localStorage.getItem(window.location.hash.replace("#","")+':highscore')||0


document.getElementById("gamebody").style.width=500;

player={x:canvas.width/2,y:canvas.height/1.2}


    ctx.beginPath();
    ctx.fillStyle = "#00ff06";
    ctx.rect(player.x, player.y, 30, 30);
    ctx.fill();
    ctx.closePath();

    let moveleft=false,moveright=false;

document.onkeyup=(e)=>{
    if(e.keyCode==39){
        moveright=false;
    }else if(e.keyCode==37){
        moveleft=false;
    }
}

let bullettime=0;

let controll=(e)=>{
    if(e.keyCode==38||e.keyCode==40){event.preventDefault();}
    
    if(lose&&e.keyCode==13){
        lose=false;
        score=0;
        bullets=[]
        enemies=[];
        respawntime=100;
    }
    if(bullettime>10)
    if(e.keyCode=="32"){
        bullets.push({x:player.x,y:player.y})
        bullettime=0;
    }

    if(e.keyCode==39){
        moveright=true;
    }else if(e.keyCode==37){
        moveleft=true;
    }
}

let respawntime=100;
let rendernumber=0;

let collisions=()=>{
    bullets.forEach((e)=>{
        enemies.forEach((f)=>{
            if (e.x < f.x + 25 &&
                e.x + 25 > f.x &&
                e.y < f.y + 25 &&
                e.y + 10 > f.y) {
                   enemies=enemies.filter((e)=>{
                        return e!=f
                    })
                   bullets=bullets.filter((f)=>{
                        return e!=f
                    })
                    score++;
             }
             
        })
    })
    
    enemies.forEach((f)=>{
        if (player.x < f.x + 30 &&
            player.x + 30 > f.x &&
            player.y < f.y + 30 &&
            player.y + 30 > f.y) {

                lose=true;
                if(highscore<score){
                    localStorage.setItem(window.location.hash.replace("#","")+':highscore',score);
                    highscore=score;
                }
         }
         
    })

}
let render=()=>{
    if(lose){return;}
    bullettime++;
    collisions();
    rendernumber++;
    let number=0;
    bullets.forEach((e)=>{
        e.y=e.y-7;
        if(e.y<0){
            bullets.splice(number,1);
        }
        number++
    })

    number=0;
    enemies.forEach((e)=>{
        e.y=e.y+3+score/10;
        if(e.y>canvas.height){
            enemies.splice(number,1);
        }
        number++
    })
    if(moveleft){
        player.x=player.x-7;
    } 
    if(moveright){
        player.x=player.x+7;
    }
if(rendernumber>respawntime){
    let x= Math.floor(Math.random() * canvas.width/30);
    enemies.push({x:x*30,y:-30});
    if(respawntime>10)
        respawntime=respawntime-5;
    rendernumber=0;
}

    if(player.x<=0){player.x=0;}
    if(player.x>=canvas.width-30){player.x=canvas.width-30}
}
let draw=()=>{

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    bullets.forEach((e)=>{
        ctx.fillStyle = "#ffffff";
        ctx.rect(e.x+10, e.y, 10, 10);
        ctx.fill();
    })
    ctx.closePath();

    ctx.beginPath();
    enemies.forEach((e)=>{
        ctx.fillStyle = "#ff0000";
        ctx.rect(e.x, e.y, 25, 25);
        ctx.fill();
})
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#00ff06";
    ctx.rect(player.x, player.y, 30, 30);
    ctx.fill();
        

ctx.beginPath();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#00ff06";
ctx.font = "20px Arial";
ctx.fillText(score, (canvas.width/2), 50);
ctx.fillText('HighScore : ' + highscore, (canvas.width/2)+100, 50);
ctx.closePath();

if(lose){
    ctx.beginPath();
    ctx.fillStyle = "#ff3333";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", (canvas.width/2)-60, 285);
    ctx.fillText("press enter to restart", (canvas.width/2)-110, 500);
    ctx.stroke();
    ctx.closePath();
}
}


let timer=setInterval(()=>{render();draw()},20)