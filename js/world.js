
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


   // Return the slope between two points
   findSlope(a, b){
      return (a.y - b.y) / (a.x - b.x);
   }


   // Return the y-intercept of a line
   findIntercept(point, slope){
      return point.y - point.x * slope;
   }


   // Begin and end points are world positions (not screen positions)
   // TODO: Make it actually check the bounds of a quad rather than just a top and bottom
   // TODO: Make it work better with near-vertical lines. Note the collision lines aren't parallel w/ original.
   isMouseOverLineOld(begin, end, thickness){
      let left = begin.x < end.x ? begin : end;
      let right = begin.x >= end.x ? begin : end;
      
      let vec = p5.Vector.sub(left, right);
      let perp = vec.copy();
      perp.rotate(-90);
      perp.setMag(thickness);
      
      let originBottom = p5.Vector.add(left, perp);
      let originTop = p5.Vector.add(left, perp.mult(-1));

      if(mouseX >= left.x && mouseX <= right.x){   // Check horizontally between left and right
         let mousePos = createVector(mouseX, mouseY);
         if(this.isPointAboveLine(mousePos, originBottom, p5.Vector.add(originBottom, vec))){
            if(!this.isPointAboveLine(mousePos, originTop, p5.Vector.add(originTop, vec))){
               return true;
            }
         }
      }
   }


   isMouseOverLine(begin, end, thickness){
      let left = begin.x < end.x ? begin : end;
      let right = begin.x >= end.x ? begin : end;
      
      let vec = p5.Vector.sub(left, right);
      let perp = vec.copy();
      perp.rotate(-90);
      perp.setMag(thickness);
      
      let topLeft = p5.Vector.add(left, perp);
      let topRight = p5.Vector.add(right, perp);
      let bottomLeft = p5.Vector.add(left, perp.mult(-1));
      let bottomRight = p5.Vector.add(right, perp.mult(-1));
      
      let mousePos = createVector(mouseX, mouseY);
      return this.isPointInQuad(mousePos, topLeft, topRight, bottomLeft, bottomRight);
   }


   // Return true if point is between all 4 points.
   isPointInQuad(point, topLeft, topRight, bottomLeft, bottomRight){
      let topBound = this.isPointAboveLine(point, topLeft, topRight);
      let bottomBound = !this.isPointAboveLine(point, bottomLeft, bottomRight);
      //let leftBound = this.isPointAboveLine(point, bottomLeft, topLeft);
      //let rightBound = this.isPointAboveLine(point, topRight, bottomRight);
      if(topBound && bottomBound){
         return true;
      }
      return false;
   }


   // Return true if a point is above a line, false if on or below line.
   // TODO: should probably check for divide-by-0
   isPointAboveLine(point, begin, end){
      let m = (begin.y - end.y) / (begin.x - end.x);  // Slope
      let b = begin.y - begin.x * m;   // Intercept
      if(point.y < m * point.x + b){
         return true;
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