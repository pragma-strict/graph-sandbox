/*
   Basic node for a binary tree. Contains a left and right child.
*/
class BinaryNode extends TreeNode{
   constructor(value){
      super(value);
      this.parent = null;
      this.left = null;
      this.right = null;
      this.leftEdge = null;
      this.rightEdge = null;
   }


   // Add a node, either as a child or as a descendant and return the new edge that was created
   insert(node){
      if(node.value <= this.value){
         if(this.left){
            return this.left.insert(node);
         }
         else{
            this.left = node;
            this.left.parent = this;
            this.left.depth = this.depth + 1;
            this.leftEdge = new Edge(this, node);
            return this.leftEdge;
         }
      }
      else{
         if(this.right){
            return this.right.insert(node);
         }
         else{
            this.right = node;
            this.right.parent = this;
            this.right.depth = this.depth + 1;
            this.rightEdge = new Edge(this, node);
            return this.rightEdge;
         }
      }
   }


   // Remove this node
   // Is removing the parent's reference to this node going to cause it to be deleted before this function can finish?
   remove(){
      console.log("Remove called on node")
      if(this.isLeaf()){
         this.parent.removeChild(this);
         return;
      }

      let replacement = this.getNearestDescendant();
      this.value = replacement.value;
      replacement.parent.removeChild(replacement);
   }


   // 
   removeRight(){
      if(this.hasRight()){

         // If right node is leaf
         if(this.right.isLeaf()){
            this.right = null;
            this.rightEdge = null;
         }
         else{
            // Right node is not leaf. Replace with nearest descendant
            let replacement = this.right.getNearestDescendant();
            this.right.value = replacement.value;
            replacement.remove();
         }
      }
   }


   // 
   removeLeft(){
      if(this.hasLeft()){
         
         // If left node is leaf
         if(this.left.isLeaf()){
            this.left = null;
            this.leftEdge = null;
         }
         else{
            // Left node is not leaf. Replace with nearest descendant
            let replacement = this.left.getNearestDescendant();
            this.left.value = replacement.value;
            replacement.remove();
         }
      }
   }


   // 
   removeChild(node){
      if(this.right === node){
         this.right.remove();
      }
      else if(this.left === node){
         this.left.remove();
      }
   }


   // Return the descendant with the greatest value, or this if there is none
   getGreatestDescendant(){
      if(this.hasRight()){
         return this.right.getGreatestDescendant();
      }
      return this;
   }


   // Return the descendant with the smallest value, or this if there is none
   getLeastDescendant(){
      if(this.hasLeft()){
         return this.left.getLeastDescendant();
      }
      return this;
   }


   // Return the descendant nearest in value, or false if there is none
   getNearestDescendant(){
      if(this.isLeaf()){
         console.log("" + this.value + " is a leaf")
         return false;
      }
      let greater = this.hasRight() ? this.right.getLeastDescendant() : false;
      let lesser = this.hasLeft() ? this.left.getGreatestDescendant() : false;
      if(greater && lesser){
         let greaterDiff = this.greater.value - this.value;
         let lesserDiff = this.value - this.lesser.value;
         console.log("nearest descendant of " + this.value + " is " + greaterDiff < lesserDiff ? this.greater : this.lesser);
         return greaterDiff < lesserDiff ? this.greater : this.lesser;
      }
      console.log("nearest descendant of " + this.value + " is " + greater ? greater : lesser);
      return greater ? greater : lesser;
   }

   // // Return the greater descendant which is next in numerical order or false if there is none
   // getNextGreaterDescendant(first = true){
   //    if(first){  // This is the first recursive iteration
   //       if(this.hasRight()){
   //          return this.right.getNextGreaterDescendant(false);
   //       }
   //       return false;
   //    }
   //    if(this.hasLeft()){
   //       return this.left.getNextGreaterDescendant(false);
   //    }
   //    return this;
   // }


   // // Return the lesser descendant which is next in numerical order
   // getNextLesserDescendant(first = true){
   //    if(first){  // This is the first recursive iteration
   //       if(this.hasLeft()){
   //          return this.left.getNextLesserDescendant(false);
   //       }
   //       return false;
   //    }
   //    if(this.hasRight()){
   //       return this.right.getNextLesserDescendant(false);
   //    }
   //    return this;
   // }


   // Overwrite the properties of this node with those of another
   adoptProperties(node){
      if(node instanceof BinaryNode){
         let keys = Object.keys(this);
         for(let i = 0; i < keys.length; i++){
            this[keys[i]] = node[keys[i]];
         }
      }
   }


   setValue(value){
      this.value = value;
   }


   setLeft(left){
      this.left = left;
   }


   setRight(right){
      this.right = right;
   }

   
   hasLeft(){
      if(this.left){
         return true;
      }
      return false;
   }


   hasRight(){
      if(this.right){
         return true;
      }
      return false;
   }


   isLeaf(){
      return !(this.hasRight() || this.hasLeft());
   }


   setChildren(left, right){
      this.left = left;
      this.right = right;
   }
}