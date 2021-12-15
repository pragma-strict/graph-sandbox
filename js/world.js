
let world;

class World{
   constructor(){
      this.origin = createVector();
      this.isDragging = false;
      this.dragHandleCoords = createVector(); // Mouse position relative to origin whenever LMB is pressed
   }

   // Log mouse position relative to origin so that the origin can be repositioned during mouse drag.
   mousePressed(){
      this.dragHandleCoords = createVector(mouseX - world.origin.x, mouseY - world.origin.y);
      this.isDragging = true;
   }
   
   
   // 
   mouseReleased(){
      this.isDragging = false;
   }
   
   
   // Reposition the origin
   mouseDragged(){
      if(this.isDragging){
      this.origin.x = mouseX - this.dragHandleCoords.x;
      this.origin.y = mouseY - this.dragHandleCoords.y;
      }
   }


   // Begin and end points are world positions (not screen positions)
   // TODO: Make work better on near-vertical lines by creating parallel lines offset by the thickness
   isMouseOverLine(begin, end, thickness){
      //begin = this.worldToScreenPosition(begin);
      //end = this.worldToScreenPosition(end);
      let m = (begin.y - end.y) / (begin.x - end.x);  // Slope
      let b = begin.y - begin.x * m;   // Intercept
      if(mouseX >= min(begin.x, end.x) && mouseX <= max(begin.x, end.x)){
         if(mouseY >= m * mouseX + b - thickness && mouseY <= m * mouseX + b + thickness){
            return true;
         }
      }
   }


   // Return the screen position of a given world position
   worldToScreenPosition(worldPos){
      let screenPos = createVector();
      screenPos.x = this.origin.x + worldPos.x;
      screenPos.y = this.origin.y + worldPos.y;
      return screenPos;
   }
}