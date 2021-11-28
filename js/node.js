
class Node{
   constructor(){
      this.value = 0;
      this.coordinates = createVector();
      this.size = 25;
      this.base_color = 0;
   }


   render(world_origin){
      noStroke();
      let x = origin.x + this.coordinates.x;
      let y = origin.y + this.coordinates.y;

      // Set the colour
      fill(this.base_color);
      if(this.checkMouseOver(world_origin)){
         fill(RED);
      }

      // Draw the ellipse
      ellipse(x, y, this.size);

      // Draw the text
      fill(255);
      textAlign(CENTER, CENTER);
      text(this.value, x, y);
   }


   // Return true if the mouse if over the node
   checkMouseOver(world_origin){
      let node_pos = createVector(world_origin.x + this.coordinates.x, world_origin.y + this.coordinates.y)
      let mouse_pos = createVector(mouseX, mouseY);
      if(node_pos.dist(mouse_pos) <= this.size/1.5){
         return true;
      }
      return false;
   }
}