class Edge{
   constructor(n1, n2){
      this.n1 = n1;
      this.n2 = n2;
      this.show = true; // Whether or not to render
      this.begin; // The begin and end points are offset slightly from the nodes
      this.end;
      this.beginScreenPos; // The begin and end points in screen space. Stored here for efficiency.
      this.endScreenPos;
      this.weight;
      this.gap = 15; // Visual distance between outer edge of nodes and start of the edge
      this.lineThickness = 2;
      this.selectThickness = 10;  // Thickness of edge for mouse interaction
   }


   // Render the edge
   render(baseColor, highlightColor){
      this.updateEndPoints();
      if(this.show){
         strokeWeight(this.lineThickness);
         stroke(this.isMouseOver() ? highlightColor : baseColor);
         line(this.beginScreenPos.x, this.beginScreenPos.y, this.endScreenPos.x, this.endScreenPos.y);
      }
   }


   // Return true if mouse is over edge
   isMouseOver(){
      if(!this.show){
         return false;
      }
      let mousePos = createVector(mouseX, mouseY);
      return World.isPointOverLine(mousePos, this.beginScreenPos, this.endScreenPos, this.selectThickness);
   }


   // Handle clicks
   mousePressed(){
      
   }


   // Handle unclicks
   mouseReleased(){
      
   }


   // Handle dragging
   mouseDragged(){
      
   }


   // Update the end points of the edge since they are offset from the node positions
   updateEndPoints(){
      let edge = World.trimLine(this.n1.coordinates, this.n2.coordinates, this.n1.size + this.gap);
      if(edge){
         this.show = true;
         this.begin = edge.begin;
         this.end = edge.end;
         this.beginScreenPos = world.worldToScreenPosition(this.begin); // Update screen positions too.
         this.endScreenPos = world.worldToScreenPosition(this.end);
      }
      else{
         this.show = false;
      }
   }
}