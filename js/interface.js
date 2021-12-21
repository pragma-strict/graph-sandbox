/*
   Functions useful for working with UI elements. Mostly for blending other DOM elements with the p5 canvas.
*/

class ContextMenu{
   constructor(elementId){
      this.element = document.getElementById(elementId);
      this.hidden = false;
      this.height = 0;
   }


   // Set the css top and left values of the element
   updatePosition(){
      this.element.style.left = mouseX + "px";
      this.element.style.top =  mouseY + "px";
      //this.show();
   }


   show(){
      this.hidden = false;
      this.element.style.display = "block";
   }


   hide(){
      this.hidden = true;
      this.element.style.display = "none";
   }


   foo(){
      console.log("button clicked!");
      this.hide();
   }


   // Add a button to the menu
   addButton(contents, func){
      this.element.innerHTML += "<a href='#' onclick='" + func + "'>" + contents + "</a>";
      this.height = parseInt(window.getComputedStyle(this.element).height.slice(0, -2));
   }
}


