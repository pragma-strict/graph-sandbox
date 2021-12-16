
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
      if(a.x == b.x){
         return 9999999.00;
      }
      return (a.y - b.y) / (a.x - b.x);
   }


   // Return the y-intercept of a line
   findIntercept(point, slope){
      return point.y - point.x * slope;
   }


   // Return true if point collides with a line with a given thickness
   isPointOverLine(point, begin, end, thickness){
      let left = begin.x < end.x ? begin : end;
      let right = begin.x < end.x ? end : begin;
      
      let vec = p5.Vector.sub(left, right);
      
      let up = vec.copy();
      up.rotate(90);
      up.setMag(thickness);

      let down = vec.copy();
      down.rotate(-90);
      down.setMag(thickness);
      
      let topLeft = p5.Vector.add(left, up);
      let topRight = p5.Vector.add(right, up);
      let bottomLeft = p5.Vector.add(left, down);
      let bottomRight = p5.Vector.add(right, down);

      return this.isPointInQuad(point, topLeft, topRight, bottomRight, bottomLeft);
   }


   // Inputs are assumed to be in world coordinates
   drawVector(origin, vector, color, thickness){
      origin = this.worldToScreenPosition(origin);
      stroke(color);
      strokeWeight(thickness);
      line(origin.x, origin.y, origin.x + vector.x, origin.y + vector.y);
   }


   // Input is assumed to be in world coordinates
   drawPoint(origin, color, thickness){
      origin = this.worldToScreenPosition(origin);
      noStroke();
      fill(color);
      ellipse(origin.x, origin.y, thickness);
   }


   // Return true if point is between all 4 points.
   isPointInQuad(point, topLeft, topRight, bottomRight, bottomLeft){
      let withinTop = !this.isPointAboveLine(point, topLeft, topRight);
      let withinBottom = this.isPointAboveLine(point, bottomLeft, bottomRight);
      let withinLeft = this.isPointRightOfLine(point, bottomLeft, topLeft);
      let withinRight = !this.isPointRightOfLine(point, topRight, bottomRight);

      if(withinTop && withinBottom && withinLeft && withinRight){
         return true;
      }
      return false;
   }


   // Return true if a point is above a line, false if on or below line.
   isPointAboveLine(point, begin, end){
      let m = this.findSlope(begin, end);
      let b = this.findIntercept(begin, m);
      if(point.y < m * point.x + b){
         return true;
      }
      return false;
   }


   // Return true if a point is to the right of a line, false if on or left of line.
   isPointRightOfLine(point, begin, end){
      let m = this.findSlope(begin, end);
      let b = this.findIntercept(begin, m);
      if(point.x > (point.y - b) / m){
         return true;
      }
      return false;
   }


   // Return the screen position of a given world position
   worldToScreenPosition(worldPos){
      let screenPos = createVector();
      screenPos.x = this.origin.x + worldPos.x;
      screenPos.y = this.origin.y + worldPos.y;
      return screenPos;
   }


   // Return the world position of a given screen position
   screenToWorldPosition(screenPos){
      let worldPos = createVector();
      worldPos.x = screenPos.x - this.origin.x;
      worldPos.y = screenPos.y - this.origin.y;
      return worldPos;
   }
}