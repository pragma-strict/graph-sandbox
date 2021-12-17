/*
   General base class for a node in a graph
*/
class Node{
   constructor(value){
      this.value = value;
      this.coordinates = createVector();
      this.size = 25;
      this.neighborRefs = [];
      this.state = 0;   // Used during traversals to avoid checking the same node more than once
      this.isDragging = false;
      this.dragHandleOffset = createVector();   // Relative mouse pos when dragging
   }


   render(baseColor, highlightColor){
      let screenPos = world.worldToScreenPosition(this.coordinates);

      noStroke();
      fill(this.isMouseOver() ? highlightColor : baseColor);
      ellipse(screenPos.x, screenPos.y, this.size);

      // Draw the value
      fill(255);
      textAlign(CENTER, CENTER);
      text(this.value, screenPos.x, screenPos.y);
   }


   // 
   addNeighbor(nodeRef){
      this.neighborRefs.push(nodeRef);
   }


   // TODO: Make it do stuff
   removeNeighborByIndex(index){
      if(index >= 0 && index < this.neighborRefs.length){
         // perform removal
      }
   }


   // Return true if the mouse if over the node
   isMouseOver(){
      let nodePos = world.worldToScreenPosition(this.coordinates);
      let mousePos = createVector(mouseX, mouseY);
      if(nodePos.dist(mousePos) <= this.size/1.5){
         return true;
      }
      return false;
   }


   mousePressed(){
      if(this.isMouseOver()){
         this.isDragging = true;
         let mouseWorldPos = world.screenToWorldPosition(createVector(mouseX, mouseY));
         this.dragHandleOffset = p5.Vector.sub(this.coordinates, mouseWorldPos);
      }
      else{
         this.isDragging = false;
      }
   }


   mouseReleased(){
      this.isDragging = false;
   }


   mouseDragged(){
      if(this.isDragging){
         let mouseWorldPos = world.screenToWorldPosition(createVector(mouseX, mouseY));
         this.coordinates = mouseWorldPos.add(this.dragHandleOffset);
      }
   }


   // TODO: Move this to world.js as worldToScreenPosition()
   getScreenPosition(){
      let screenPos = createVector();
      screenPos.x = world.origin.x + this.coordinates.x;
      screenPos.y = world.origin.y + this.coordinates.y;
      return screenPos;
   }
}


/*
   General base class for a node that's part of a tree
*/
class TreeNode extends Node{
   constructor(value){
      super(value);
      this.edgeRefs = [];
   }

   hasChildren(){
      if(this.neighborRefs.length > 0){
         return true;
      }
      return false;
   }

   // Add a child node and return the new edge that was created
   addChild(nodeRef){
      this.neighborRefs.push(nodeRef);
      this.edgeRefs.push(new Edge(this, nodeRef));
      return this.edgeRefs[this.edgeRefs.length -1];
   }

   getChildren(){
      return this.neighborRefs;
   }

   getChildByIndex(index){
      return this.neighborRefs[index];
   }
}