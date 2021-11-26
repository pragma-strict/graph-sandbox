
class Node{
   constructor(){
      this.value = 0;
      this.coordinates = createVector();
      this.size = 10;
      this.base_color = 0;
   }

   render(origin){
      fill(this.base_color);
      let x = origin.x + this.coordinates.x;
      let y = origin.y + this.coordinates.y
      ellipse(x, y, this.size);
   }
}