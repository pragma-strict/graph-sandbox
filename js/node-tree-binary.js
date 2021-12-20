/*
   Basic node for a binary tree. Contains a left and right child.
*/
class BinaryNode extends TreeNode{
   constructor(value){
      super(value);
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
            this.right.depth = this.depth + 1;
            this.rightEdge = new Edge(this, node);
            return this.rightEdge;
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
      return this.hasRight() || this.hasLeft();
   }

   setChildren(left, right){
      this.left = left;
      this.right = right;
   }
}