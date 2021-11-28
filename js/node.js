
class Node{
   constructor(){
      this.value = 0;
      this.coordinates = createVector();
      this.size = 25;
   }


   render(worldOrigin, baseColor, highlightColor){
      noStroke();
      let x = origin.x + this.coordinates.x;
      let y = origin.y + this.coordinates.y;

      // Set the colour
      fill(baseColor);
      if(this.checkMouseOver(worldOrigin)){
         fill(highlightColor);
      }

      // Draw the ellipse
      ellipse(x, y, this.size);

      // Draw the text
      fill(255);
      textAlign(CENTER, CENTER);
      text(this.value, x, y);
   }


   // Return true if the mouse if over the node
   checkMouseOver(worldOrigin){
      let nodePos = createVector(worldOrigin.x + this.coordinates.x, worldOrigin.y + this.coordinates.y)
      let mousePos = createVector(mouseX, mouseY);
      if(nodePos.dist(mousePos) <= this.size/1.5){
         return true;
      }
      return false;
   }
}