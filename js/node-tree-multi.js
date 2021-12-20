/*
   Tree node that implements multiple children
*/
class TreeNodeMulti extends TreeNode{
   constructor(){
      super();
      this.childRefs = [];
      this.edgeRefs = [];
   }

   hasChildren(){
      if(this.childRefs.length > 0){
         return true;
      }
      return false;
   }

   // Add a node below this one and return the new edge that was created
   insert(nodeRef){
      this.childRefs.push(nodeRef);
      this.edgeRefs.push(new Edge(this, nodeRef));
      return this.edgeRefs[this.edgeRefs.length -1];
   }

   getChildren(){
      return this.childRefs;
   }

   getChildByIndex(index){
      return this.childRefs[index];
   }
}