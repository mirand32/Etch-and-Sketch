const container=document.querySelector(".container");
let gridBoxes=10;
let colorSwitch=false;
let shadeSwitch=false;
let boxColors;
const pushable = document.querySelectorAll(".pushed");
pushable.forEach(button=>button.addEventListener("click", selectButton))

function shadeFlip(){
    if(shadeSwitch){
        shadeSwitch=false
    }
    else{shadeSwitch=true}
    colorSwitch=false
}   

function colorFlip(){
    if(colorSwitch){
        colorSwitch=false
    }
    else{colorSwitch=true}
    shadeSwitch=false
}

function generateGrid(){
    container.innerHTML="";
    boxColors={};
    //create columns that the pixels will be in 
    for(let i=0;i<gridBoxes;i++){
        let divX=document.createElement("div");
        divX.classList.add("column");
        container.appendChild(divX);
        //create the pixels inside each column according to gridboxes
        for (let x = 0; x < gridBoxes; x++) {
            divX.innerHTML+=`<div class="pixel" data-key="${i}${x}"></div>`
            
            let pixelColor={"hue":0, "saturation":0, "light":80};
            boxColors[`${i}${x}`]=pixelColor;
        }
    }

    //add event listener for each pixel
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => pixel.addEventListener("mouseenter", fillIn)); 
}

function setGrid(){
    gridBoxes=prompt("select number from 2 to 100");
    if (gridBoxes>2 && gridBoxes<=100){
        generateGrid();
    }
    else{setGrid()}
}

function fillIn(){
    //get color info for hovered pixel
    const key=this.dataset.key;
    const box=boxColors[key]
    let [hue, saturation, light]=[box.hue, box.saturation, box.light]
    
    //change color info based on which draw type it is set to
    if(colorSwitch){
        light -= 10;
        saturation=100;
        hue=Math.round(Math.random()*360);
    }
    else if(shadeSwitch){light-=10;}
    else{light=0;}

    //fill in the pixel and update the info of the object
    this.style.background = `hsl(${hue},${saturation}%,${light}%)`
    boxColors[key]={"hue":hue,"saturation":saturation,"light":light}
}

function selectButton(){
    if(this.classList.contains("selected")){    
        this.classList.remove("selected");
    }
    else{
        pushable.forEach(button => button.classList.remove("selected"))
        this.classList.add("selected");
    }
}

generateGrid();
