/*
   Functions useful for working with UI elements. Mostly for blending other DOM elements with the p5 canvas.
*/

class ContextMenu{
   constructor(elementId){
      this.element = document.getElementById(elementId)
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


   // Set up the menu such as it should be when clicking on nodes
   generateNodeMenu(){
      this.clear();
      this.addButton("Add Node", "tree.createNodeAtSelected(2)");
   }


   // Remove all buttons and content
   clear(){
      this.element.innerHTML = "";
   }


   // Add a button to the menu
   addButton(title, func){
      this.element.innerHTML += "<a href='#' onclick=" + func + ">" + title + "</a>";
      this.height = parseInt(window.getComputedStyle(this.element).height.slice(0, -2));
   }


   close(){
      this.hide();
   }
   
   
   // Opens the menu at the position of the mouse
   open(){
      this.updatePosition();
      this.show();
   }
}


