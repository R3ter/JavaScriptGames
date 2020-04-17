var gamename=window.location.hash.replace("#","");

document.title=gamename;
document.getElementById("gamename").innerHTML=gamename;

let logo=document.getElementById("logoimage")

logo.addEventListener("animationend", ()=>{
    logo.remove();
    var script=document.createElement("script");
    script.src="./Games/"+gamename+".js"
    document.body.appendChild(script);
});

document.body.style.backgroundColor=localStorage.getItem("backColor")||"black"
