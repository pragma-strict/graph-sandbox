
class Tree{
   constructor(){
      this.rootNode;
      this.rootCoords;
      this.selectedElement;   // Either a node ref or edge ref
      this.nodeSize;
      this.nodeTraversal = [this.rootNode];  // A traversal of the tree
      this.traversalType = "";
      this.edgeList = [];
      this.baseColor = BLACK;
      this.hoveredColor = RED_LIGHT;
      this.selectedColor = RED;
   }


   // Adds a new node to the tree with the given value.
   // Currently just adds the new node as a child of the root.
   addNode(value){
      let newNode = new TreeNode(value);
      if(!this.rootNode){
         this.rootNode = newNode;
      }
      else{
         let newEdge = this.rootNode.addChild(newNode);
         this.edgeList.push(newEdge);
      }
      this.selectedElement = newNode;
      this.generatePreorderTraversal();
   }


   // Set the tree traversal to a newly-generated preorder traversal
   generatePreorderTraversal(){
      this.nodeTraversal = [];
      this.nodeTraversal = this.getPreorderTraversal(this.rootNode, this.nodeTraversal);
      this.traversalType = "pre-order";
   }


   // Recursively return an array containing each node in a pre-order traversal.
   getPreorderTraversal(node, traversal){
      traversal.push(node);
      let children = node.getChildren();
      children.forEach(child => {
         traversal.concat(this.getPreorderTraversal(child, traversal));
      });
      return traversal;
   }


   // 
   printTraversal(){
      let traversalString = "Current traversal (" + this.traversalType + "): ";
      this.nodeTraversal.forEach((node) => {
         traversalString += (node.value + ", ");
      });
      console.log(traversalString.slice(0, -2));
   }


   setRootPosition(rootPos){
      this.rootCoords = rootPos;
   }


   setNodeSize(nodeSize){
      this.nodeSize = nodeSize;
   }


   // Return a node ref if the mouse is over a node, else false
   getHoveredNode(){
      for(let i = 0; i < this.nodeTraversal.length; i++){
         if(this.nodeTraversal[i].isMouseOver()){
            return this.nodeTraversal[i];
         }
      }
      return false;
   }


   // Return a ref to the node or edge the mouse is over, or false if not hovering
   getHoveredElement(){
      // Check nodes first
      for(let i = 0; i < this.nodeTraversal.length; i++){
         if(this.nodeTraversal[i].isMouseOver()){
            return this.nodeTraversal[i];
         }
      }

      // Check hovering over edges
      for(let i = 0; i < this.edgeList.length; i++){
         if(this.edgeList[i].isMouseOver()){
            return this.edgeList[i];
         }
      }
      return false;
   }


   // Return a node ref if the mouse is over a node, else false. Alias for getHoveredNode()
   isMouseOver(){
      return this.getHoveredNode();
   }


   // Return true if a node was selected
   mousePressed(){
      this.selectedElement = this.getHoveredElement();
      if(this.selectedElement){
         this.selectedElement.mousePressed();
         return true;
      }
      return false;
   }


   mouseReleased(){
      if(this.selectedElement){
         this.selectedElement.mouseReleased();
      }
   }


   mouseDragged(){
      if(this.selectedElement){
         this.selectedElement.mouseDragged();
      }
   }


   // Render all nodes and edges in the tree
   render(){
      this.renderNodes();
      this.renderEdges();
   }


   // Render all nodes
   renderNodes(){
      if(this.rootNode){
         for(let i = 0; i < this.nodeTraversal.length; i++){
            let currentNode = this.nodeTraversal[i];
            if(currentNode === this.selectedElement){
               currentNode.render(this.selectedColor, this.hoveredColor);
            }
            else{
               currentNode.render(this.baseColor, this.hoveredColor);
            }
         }
      }
   }


   // Render all edges
   renderEdges(){
      if(this.rootNode){
         for(let i = 0; i < this.edgeList.length; i++){
            let currentEdge = this.edgeList[i];
            if(currentEdge === this.selectedElement){
               currentEdge.render(this.selectedColor, this.hoveredColor);
            }
            else{
               currentEdge.render(this.baseColor, this.hoveredColor);
            }
         }
      }
   }
}


// Recursively return an array containing each node in a post-order traversal.
   // getPostorderTraversal(node, traversal){
   //    if(node.hasLeft()){
   //       traversal.concat(this.getPreorderTraversal(node.left, traversal));
   //    }
   //    if(node.hasRight()){
   //       traversal.concat(this.getPreorderTraversal(node.right, traversal));
   //    }
   //    traversal.push(node);
   //    return traversal;
   // }


   // // Return an array containing each node in a level-order traversal.
   // getLevelOrderTraversal(node){
   //    let currentLevel = [node];
   //    let nextLevel = [];
   //    let traversal = currentLevel;
   //    let currentDepth = 1;
   //    let isLastLevel;

   //    while(!isLastLevel){
   //       isLastLevel = true;

   //       // Go through all the nodes in this level and add their children to the next level
   //       for(let i = 0; i < currentLevel.length; i++){
   //          let left = currentLevel[i].left;
   //          let right = currentLevel[i].right;
   //          if(left){
   //             nextLevel.push(left);
   //             isLastLevel = false;
   //          }
   //          if(right){
   //             nextLevel.push(right);
   //             isLastLevel = false;
   //          }
   //       }

   //       currentLevel = [...nextLevel];
   //       traversal.push(...currentLevel);
   //       nextLevel = [];
   //       currentDepth++;
   //    }
   //    return traversal;
   // }


   // getTreeHeight(){
   //    let currentLevel = [this.rootNode];
   //    let nextLevel = [];
   //    let currentDepth = 0;
   //    let isLastLevel;

   //    while(!isLastLevel){
   //       isLastLevel = true;

   //       // Go through all the nodes in this level and add their children to the next level
   //       for(let i = 0; i < currentLevel.length; i++){
   //          let left = currentLevel[i].left;
   //          let right = currentLevel[i].right;
   //          if(left){
   //             nextLevel.push(left);
   //             isLastLevel = false;
   //          }
   //          if(right){
   //             nextLevel.push(right);
   //             isLastLevel = false;
   //          }
   //       }

   //       currentLevel = [...nextLevel];
   //       nextLevel = [];
   //       currentDepth++;
   //    }
   //    return currentDepth;
   // }
