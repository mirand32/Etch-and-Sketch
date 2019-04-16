const container=document.querySelector(".container");
let gridBoxes=10;
let colorSwitch=false;
let shadeSwitch=false;
let boxColors;

function generateGrid(boxesNumber){
    container.innerHTML="";
    boxColors={};
    for(let i=0;i<gridBoxes;i++){
        let divX=document.createElement("div");
        container.appendChild(divX);
        divX.classList.add("column");
        
        for (let x = 0; x < gridBoxes; x++) {
            let divY=document.createElement("div");
            divY.setAttribute("data-key", `${i}${x}`)
            divY.classList.add("pixel");
            divX.appendChild(divY);
            
            let pixelColor={};
            pixelColor["hue"]=0;
            pixelColor["saturation"]=0;
            pixelColor["light"]=80;
            boxColors[`${i}${x}`]=pixelColor;
        }
    }
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => pixel.addEventListener("mouseenter", fillIn)); 
}

function shade(){
    shadeSwitch=true;
    colorSwitch=false;
}

function color(){
    colorSwitch=true;
    shadeSwitch=false;
}

function setGrid(){
    const gridSelection=prompt("select number from 2 to 50");
    if (gridSelection>2 && gridSelection<=50){
        gridBoxes=gridSelection;
        reset();
    }
}

function reset(){
    generateGrid()
    colorSwitch=false;
    shadeSwitch=false;
}

function fillIn(){
    const key=this.dataset.key;
    const box=boxColors[key]
    
    let hue=box.hue;
    let saturation=box.saturation;
    let light=box.light;
    
    if(colorSwitch){
        light -= 10;
        saturation=100;
        hue=Math.round(Math.random()*360);
        this.style.background = `hsl(${hue},${saturation}%,${light}%)`
    }
    else if(shadeSwitch){
        light-=10;
        this.style.background = `hsl(${hue},${saturation}%,${light}%)`
    }
    else{
        light=0;
        this.style.background ="black"
    }
    boxColors[key].hue=hue    
    boxColors[key].saturation=saturation    
    boxColors[key].light=light    
}

function selectButton(){
    if(this.classList.contains("selected")){    
        this.classList.remove("selected")
    }
    else{
        pushable.forEach(button=>button.classList.remove("selected"));
        this.classList.add("selected");
    };
}

const pushable=document.querySelectorAll(".pushed")
pushable.forEach(button=>button.addEventListener("click", selectButton))

generateGrid();
