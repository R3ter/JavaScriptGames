var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width=400
document.getElementById("gamebody").style.width=400;

canvas.style.backgroundColor="red"
let blocks=[]
let score=0;
const left=0,right=canvas.width-100,mid=(canvas.width/2)-50

const playerleft=50-15,playerright=canvas.width-50-15,playermid=(canvas.width/2)-15

let highscore=localStorage.getItem(window.location.hash.replace("#","")+':highscore')||0

const player={x:playerright,y:canvas.height-100}
const dir=[left,right,mid]
let lastrespawn;
let lose=false;
function render(){
    if(lose){return;}
    blocks.forEach((e)=>{
        e.y=e.y+5+score/5
        if(e.y>canvas.height){
            blocks=blocks.filter((f)=>{
                return f.y!=e.y
            })
        }
        if(e.x==left&&player.x==playerleft||
            e.x==right&&player.x==playerright||
            e.x==mid&&player.x==playermid){
                if(e.y>=player.y-400&&e.y<player.y){
                    console.log("lose")
                    lose=true
                    if(highscore<score){
                        localStorage.setItem(window.location.hash.replace("#","")+':highscore',score);
                        highscore=score;
                    }
                }
        }
    })
    if(lastrespawn==null||lastrespawn.y>200){
        score++;
        lastrespawn={x:dir[Math.floor(Math.random() * dir.length)],y:-390}
        blocks.push(lastrespawn)
        if(Math.floor(Math.random() * 2||socre>10)){
            blocks.push({x:dir[Math.floor(Math.random() * dir.length)],y:-390})
        }
    }
    
}

document.onkeydown=(event)=>{
    
    if(event.keyCode==39){
        if(!lose)
        if(player.x==playerleft){
            player.x=playermid
        }else if(player.x==playermid){
            player.x=playerright
        }
    }
    if(event.keyCode==37){
        if(!lose)
        if(player.x==playerright){
            player.x=playermid
        }else if(player.x==playermid){
            player.x=playerleft
        }
    }
    if(lose&&event.keyCode==13){
        lose=false;
        score=0;
        blocks=[];
        lastrespawn=null;
    }
}

const draw=()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    blocks.forEach((e)=>{
        ctx.beginPath();
        ctx.fillStyle = "gray";
        ctx.rect(e.x,e.y, 100, 400);
        ctx.fill();
        ctx.closePath();
    })
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.rect(player.x,player.y, 30, 30);
    ctx.fill();
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
    ctx.beginPath();
ctx.fillStyle = "#00ff06";
ctx.font = "20px Arial";
ctx.fillText(score, (canvas.width/2), 50);
ctx.fillText('HighScore : ' + highscore, (canvas.width/2)+50, 50);
ctx.closePath();
}
ctx.stroke();

setInterval(()=>{render();draw()},20);