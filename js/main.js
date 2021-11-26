/*
  Currently, this file contains data and functions related to:
    - Getting and parsing input from the DOM
    - Setting up and maintaining the p5 canvas
    - 
  The contents of this file should possibly be divided up into other files or other classes.
  I will do this once there is enough here to make a reasonable decision about how to refactor.
*/

// DOM Ids and elements
let ID_PARENT = 'p5-canvas-container';
let INTERFACE_DATA;

let canvas;

let input_raw = [];
let iterations = 0;


function setup() {
  INTERFACE_DATA = document.getElementById('interface-data');
  INTERFACE_OUT_UNSORTED = document.getElementById('interface-out-unsorted');
  initializeP5Canvas();
  noLoop();
}


function initializeP5Canvas(){
  let parentStyle = window.getComputedStyle(document.getElementById(ID_PARENT));
  canvas = createCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
  canvas.parent(ID_PARENT);
}


function updateCanvasSize(){
  let parentStyle = window.getComputedStyle(document.getElementById(ID_PARENT));
  resizeCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
  render();
}


function render(){
  background(BG_COL);
}


function getInput(){
  input_raw = [];
  parseInputData();
}


// Read input data from DOM and store it into the input array
function parseInputData(){
  let raw_data = INTERFACE_DATA.value;
  let number = 0;
  let isPrevCharNumber = false;
  for(let i = 0; i < raw_data.length; i++){
    let char = raw_data[i];
    if(!isNaN(char) && char != ' '){ // Current char is a number
      char = parseInt(char);
      if(isPrevCharNumber){
        number *= 10;
      }
      number += char;
      isPrevCharNumber = true;
    }
    else{   // Current char is NOT a number
      if(isPrevCharNumber){
        input_raw.push(number);
        number = 0;
        isPrevCharNumber = false;
      }
    }
  }
  // If the string ended on a number, include it too.
  if(isPrevCharNumber){
    input_raw.push(number);
  }
}


function keyPressed(){
  if(keyCode === ENTER){
    
  }
}


function windowResized() {
  updateCanvasSize();
}