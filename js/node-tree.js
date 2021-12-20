/*
   General base class for a node that's part of a tree
*/
class TreeNode extends Node{
   constructor(value){
      super(value);
      this.depth; // Currently just adds depth
   }
}