
let world;  // Must be initialized after p5 canvas is set up.

class World{
   constructor(){
      this.origin = createVector(width/2, height/2);
      this.isDragging = false;
      this.dragHandleOffset = createVector(); // Mouse position relative to origin whenever LMB is pressed
      this.gridTileSize = 10;
      this.halfGridTileSize = 5;
      this.gridWidth = ceil(width / this.gridTileSize);
      this.gridHeight = ceil(height / this.gridTileSize);
   }

   // Log mouse position relative to origin so that the origin can be repositioned during mouse drag.
   mousePressed(){
      this.dragHandleOffset = createVector(mouseX - world.origin.x, mouseY - world.origin.y);
      this.isDragging = true;
   }
   
   
   // 
   mouseReleased(){
      this.isDragging = false;
   }
   
   
   // Reposition the origin
   mouseDragged(){
      if(this.isDragging){
      this.origin.x = mouseX - this.dragHandleOffset.x;
      this.origin.y = mouseY - this.dragHandleOffset.y;
      }
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

   
   // Draw a cross with its center at (0, 0) in world space
   drawCenterLines()
   {
      stroke(BG_COL_SHADE_2);
      strokeWeight(1);
      line(this.origin.x, 0, this.origin.x, height);
      line(0, this.origin.y, width, this.origin.y);
   }


   // Draw grid lines aligned with (0, 0) in world space
   drawGrid()
   {
      var leftGap = abs(this.origin.x % this.gridTileSize);
      var topGap = abs(this.origin.y % this.gridTileSize);

      stroke(BG_COL_SHADE_1);
      strokeWeight(1);

      for(let i = leftGap; i < width; i += this.gridTileSize)
      {
         line(i, 0, i, height);
      }
      for(let i = topGap; i < height; i += this.gridTileSize)
      {
         line(0, i, width, i);
      }
      
      this.drawCenterLines(this.origin);
   }



   /* ===========================
      Static utility functions
   =========================== */
   

   // Return a new line that is trimmed on both ends or false if there's no line left
   static trimLine(begin, end, trimLength){
      let offset = p5.Vector.sub(end, begin);
      if(offset.mag() < trimLength){
         return false;
      }
      offset.setMag(trimLength / 2);
      let newBegin = p5.Vector.add(begin, offset);
      let newEnd = p5.Vector.add(end, offset.mult(-1));
      return {
         begin: newBegin,
         end: newEnd
      };
   }


   // Return true if point collides with a line with a given thickness
   // TODO: Add a rough collision check?
   static isPointOverLine(point, begin, end, thickness){
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


   // Return true if point is between all 4 points.
   static isPointInQuad(point, topLeft, topRight, bottomRight, bottomLeft){
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
   static isPointAboveLine(point, begin, end){
      let m = this.findSlope(begin, end);
      let b = this.findIntercept(begin, m);
      if(point.y < m * point.x + b){
         return true;
      }
      return false;
   }


   // Return true if a point is to the right of a line, false if on or left of line.
   static isPointRightOfLine(point, begin, end){
      let m = this.findSlope(begin, end);
      let b = this.findIntercept(begin, m);
      if(point.x > (point.y - b) / m){
         return true;
      }
      return false;
   }


   // Return the slope between two points
   static findSlope(a, b){
      if(a.x == b.x){
         return 9999999.00;
      }
      return (a.y - b.y) / (a.x - b.x);
   }


   // Return the y-intercept of a line
   static findIntercept(point, slope){
      return point.y - point.x * slope;
   }
}