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
   }


   render(baseColor, highlightColor){
      let screenPos = world.worldToScreenPosition(this.coordinates);
      
      // Draw lines to neighbors
      strokeWeight(2);
      for(let i = 0; i < this.neighborRefs.length; i++){
         stroke(0);
         let neighborScreenPos = world.worldToScreenPosition(this.neighborRefs[i].coordinates);
         if(world.isMouseOverLine(screenPos, neighborScreenPos, 10)){
            stroke(RED);
         }
         line(screenPos.x, screenPos.y, neighborScreenPos.x, neighborScreenPos.y);
      }

      // Draw the ellipse
      noStroke();
      fill(baseColor);
      ellipse(screenPos.x, screenPos.y, this.size);

      // Add a highlight if mouse is over
      if(this.isMouseOver(world.origin)){
         fill(highlightColor);
         ellipse(screenPos.x, screenPos.y, this.size);
      }

      // Draw the text
      fill(255);
      textAlign(CENTER, CENTER);
      text(this.value, screenPos.x, screenPos.y);
   }


   // 
   addNeighbor(nodeRef){
      this.neighborRefs.push(nodeRef);
   }


   //
   removeNeighborByIndex(index){
      if(index >= 0 && index < this.neighborRefs.length){
         // perform removal
      }
   }


   // Return true if the mouse if over the node
   isMouseOver(){
      let nodePos = createVector(world.origin.x + this.coordinates.x, world.origin.y + this.coordinates.y)
      let mousePos = createVector(mouseX, mouseY);
      if(nodePos.dist(mousePos) <= this.size/1.5){
         return true;
      }
      return false;
   }


   // Return true if mouse is over the edge between two nodes
   static isMouseOverEdge(n1, n2){
      return world.isMouseOverLine(n1.coordinates, n2.coordinates, 10)
   }


   mousePressed(){
      if(this.isMouseOver()){
         this.isDragging = true;
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
         this.coordinates.x = mouseX - world.origin.x;
         this.coordinates.y = mouseY - world.origin.y;
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
   }

   hasChildren(){
      if(this.neighborRefs.length > 0){
         return true;
      }
      return false;
   }

   addChild(nodeRef){
      this.neighborRefs.push(nodeRef);
   }

   getChildren(){
      return this.neighborRefs;
   }

   getChildByIndex(index){
      return this.neighborRefs[index];
   }
}