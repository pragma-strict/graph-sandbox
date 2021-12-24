/*
  Currently, this file contains data and functions related to:
    - Getting and parsing input from the DOM
    - Setting up and maintaining the p5 canvas
    - 
  The contents of this file should possibly be divided up into other files or other classes.
  I will do this once there is enough here to make a reasonable decision about how to refactor.

  Consider moving the origin and related functions to a different file that gets included first so that all the origin can be a global.

  TODO:
  - Make a dynamic HTML interface (left-click menu) to make styling easier and more consistent. This menu will appear when left clicking (to make desktop/mobile compatibility easier) and will be used for things like adding nodes, which could also be done via hotkey 
  - Integrate typescript because I'm tired of bugs that don't give errors
  - Store node size in the trees and container structures. Pass it as a param to node render functions.
  - Remove the pointless TreeNode class and just have binary and multi nodes both inherit directly from Node
  - Set up the tree base class to use multi-nodes by default. 
  - Proliferate the more specific node creation functions from BinaryTree to the general trees
  - Implement node removals
  - Reintroduce interactive algorithms
*/

// DOM Ids and elements
let ID_PARENT = 'p5-canvas-container';
let INTERFACE_DATA;

let canvas;

let tree;
let contextMenu;

let mouseDownTime;  // The system time when mouse was pressed. Used to calculate long/short clicks.
let mouseDownPos; // The mouse position when it was pressed. Used to check for dragging.

let inputRaw = [];
let iterations = 0;

function setup() {
  INTERFACE_DATA = document.getElementById('interface-data');
  initializeP5Canvas();
  angleMode(DEGREES);
  world = new World();
  contextMenu = new ContextMenu("p5-context-menu");
  tree = new BinaryTree();
  getInput();
}


function initializeP5Canvas(){
  let parentStyle = window.getComputedStyle(document.getElementById(ID_PARENT));
  canvas = createCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
  worldOrigin = createVector(width/2, height/2);
  canvas.parent(ID_PARENT);
}


function updateCanvasSize(){
  let parentStyle = window.getComputedStyle(document.getElementById(ID_PARENT));
  resizeCanvas(parseInt(parentStyle.width), parseInt(parentStyle.height));
}


function draw(){
  background(BG_COL);
  world.drawGrid();
  tree.render();
}


function getInput(){
  inputRaw = [];
  parseInputData();
  tree.clear();
  tree.createNodes(inputRaw);
}


// Read input data from DOM and store it into the input array
function parseInputData(){
  let rawData = INTERFACE_DATA.value;
  let number = 0;
  let isPrevCharNumber = false;
  for(let i = 0; i < rawData.length; i++){
    let char = rawData[i];
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
        inputRaw.push(number);
        number = 0;
        isPrevCharNumber = false;
      }
    }
  }
  // If the string ended on a number, include it too.
  if(isPrevCharNumber){
    inputRaw.push(number);
  }
}


// 
function isMouseOverCanvas(){
  if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height){
    return true;
  }
  return false;
}


// Logs the mouse position relative to the origin so that the 
// origin can be repositioned relative to the mouse during mouse drag.
function mousePressed(){
  if(isMouseOverCanvas()){
    if(tree.isMouseOver()){
      let date = new Date();
      mouseDownTime = date.getTime();
      mouseDownPos = createVector(mouseX, mouseY);
      tree.mousePressed();
    }
    else{
      world.mousePressed();
    }
  }
}


function mouseReleased(){
  world.mouseReleased();
  tree.mouseReleased();

  // Open the context menu if conditions are met
  let nodeUnderMouse = tree.getHoveredNode();
  if(nodeUnderMouse){
    let mousePositionDelta = createVector(mouseX, mouseY).sub(mouseDownPos);
    if(getTimeSinceClick() < 250 && mousePositionDelta.mag() == 0){
      contextMenu.generateNodeMenu();
      contextMenu.open();
    }
  }
  else{
    contextMenu.close();
  }
}


// Reposition the origin
function mouseDragged(){
  if(isMouseOverCanvas()){
    if(world.isDragging){
      world.mouseDragged();
    }
    else{
      tree.mouseDragged();
    }
  }
}


function keyPressed(){
  tree.keyPressed();
}


// Return time since last mouse down
function getTimeSinceClick(){
  let date = new Date();
  return date.getTime() - mouseDownTime;
}


function windowResized() {
  updateCanvasSize();
}