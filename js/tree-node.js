/*
   General base class for a node that's part of a tree
*/
class TreeNode extends Node{
   constructor(value){
      super(value);
      this.edgeRefs = [];
      this.neighborRefs = [];
   }

   hasChildren(){
      if(this.neighborRefs.length > 0){
         return true;
      }
      return false;
   }

   // Add a child node and return the new edge that was created
   addChild(nodeRef){
      this.neighborRefs.push(nodeRef);
      this.edgeRefs.push(new Edge(this, nodeRef));
      return this.edgeRefs[this.edgeRefs.length -1];
   }

   getChildren(){
      return this.neighborRefs;
   }

   getChildByIndex(index){
      return this.neighborRefs[index];
   }
}