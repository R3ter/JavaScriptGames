var games=["Snake","FlappyBird","Mines","Tanks","dinasor","ninja"]
var gamesdiv=document.getElementById("Games")

var colorbuttons=document.getElementById("colors").children;

var colors = new Array();
// for (var i=0; i<=256; i+=1) {
//     var blue = f;
//     for(var j=0; j<=256; j+=50){
//         var red = i;
//         for(var f=0; f<=256; f+=100){
//             colors.push(`rgb(${i},${f},${j})`);
//         }
//     }
// }
document.getElementById("pickColor").onclick=(e)=>{
    
    document.getElementById("ColorPicker").onchange=(e)=>{
       
    document.body.style.backgroundColor=e.target.value
    localStorage.setItem("backColor",e.target.value);
   }
   if(document.getElementById("ColorPicker").value=="#000000")
   document.getElementById("ColorPicker").value="#565fad"
    document.getElementById("ColorPicker").click()

}
colors.forEach((e)=>{
   var div = document.createElement('div')
   div.className="colorbutton"
   div.style.backgroundColor=e
   div.addEventListener("click",(e)=>{
    document.body.style.backgroundColor=e.target.style.backgroundColor
    localStorage.setItem("backColor",e.target.style.backgroundColor);
})
   document.getElementById("uncommendedColors").appendChild(div);
})
window.onload=()=>{
    console.log(colors[1])
    console.log(document.body.style.backgroundColor)
}
for (i = 0; i < colorbuttons.length; i++) {
    colorbuttons[i].addEventListener("click",(e)=>{
        document.body.style.backgroundColor=e.target.style.backgroundColor
        localStorage.setItem("backColor",e.target.style.backgroundColor);
    })
    
}

let logo=document.getElementById("logo")

if(window.window.location.hash){
    logo.remove()
}

logo.addEventListener("animationend", (e)=>{
    if(e.target.id=="logo")
    logo.remove();
},false);
if(!document.getElementById("myname")){
   var w = document.createElement('h3')
    w.id="myname"
    w.innerHTML="waleed sukhon"
    document.body.appendChild(w)
}
games.forEach((e)=>{
    var gamediv=document.createElement('div');
    gamediv.onclick=()=>{
        window.location.href = './games.html#'+e
    }
    gamediv.className="gameborder";

    var image=document.createElement('img');
    image.width="150";
    image.height="150";

    var name=document.createElement('p');
    name.innerHTML=e;
    image.src="./images/"+e+".png"
    gamediv.appendChild(image);
    gamediv.appendChild(name);

    gamesdiv.appendChild(gamediv);
})

//window.location.href ="#nologo"

document.body.style.backgroundColor=localStorage.getItem("backColor")||"black"

