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
let addMenu;

let mouseDownTime;  // The system time when mouse was pressed. Used to calculate long/short clicks.

let inputRaw = [];
let iterations = 0;

function setup() {
  INTERFACE_DATA = document.getElementById('interface-data');
  initializeP5Canvas();
  angleMode(DEGREES);
  world = new World();
  addMenu = new ContextMenu("p5-context-menu-container");
  addMenu.addButton("Test Button", 'menu.foo()');
  addMenu.addButton("Add Node", 'tree.createNode(10)');
  tree = new BinaryTree();
  tree.createNode(4);
  tree.createNode(5);
  tree.createNode(6);
  tree.updatePos();
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


// Logs the mouse position relative to the origin so that the 
// origin can be repositioned relative to the mouse during mouse drag.
// TODO: Call a less confusing function to determine whether mouse is over the tree
function mousePressed(){
  if(!tree.mousePressed()){
    world.mousePressed();
    let date = new Date();
    mouseDownTime = date.getTime();
  }
}


function mouseReleased(){
  world.mouseReleased();
  tree.mouseReleased();
  let date = new Date();
  if(date.getTime() - mouseDownTime < 250){
    addMenu.open()
  }else{
    addMenu.close();

  }
}


// Reposition the origin
function mouseDragged(){
  if(world.isDragging){
    world.mouseDragged();
  }
  else{
    tree.mouseDragged();
  }
}


function keyPressed(){
  tree.keyPressed();
}


function windowResized() {
  updateCanvasSize();
}