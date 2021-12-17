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

      // Draw the value as text
      fill(WHITE);
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
}