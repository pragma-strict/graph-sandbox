class BinaryTree extends Tree{
   constructor(){
      super();
   }


   // Add a node to the binary tree
   addNode(value){
      let newNode = new BinaryNode(value);
      if(!this.rootNode){
         this.rootNode = newNode;
      }
      else{
         let newEdge = this.rootNode.insert(newNode);
         this.edgeList.push(newEdge);
      }
      this.selectedElement = newNode;
      this.generateLevelOrderTraversal();
   }


   // Adjust node positions so they're arranged as a binary tree
   updatePos(){
      let minNodeSpacing = this.rootNode.size + 25;
      let rootLevelsBeforeLast = this.getHeight();
      let rootPosition = createVector(0, -minNodeSpacing * (rootLevelsBeforeLast -1 ) / 2);
      this.updatePosRecursiveStep(this.rootNode, minNodeSpacing, rootLevelsBeforeLast, rootPosition);
   }


   // Adjust node positions so they're arranged as a binary tree
   updatePosRecursiveStep(node, minSpacing, levelsBeforeLast, pos){
      let childOffsetX = Math.pow(2, levelsBeforeLast -1) * minSpacing /4;
      let leftPos = createVector(pos.x - childOffsetX, pos.y + minSpacing);
      let rightPos = createVector(pos.x + childOffsetX, pos.y + minSpacing);
      
      // Assign position to this node
      node.coordinates = pos;

      // Recursively position left and right children
      if(node.hasLeft()){
         this.updatePosRecursiveStep(node.left, minSpacing, levelsBeforeLast - 1, leftPos);
      }
      if(node.hasRight()){
         this.updatePosRecursiveStep(node.right, minSpacing, levelsBeforeLast - 1, rightPos);
      }
   }


   // 
   getHeight(){
      let currentLevel = [this.rootNode];
      let nextLevel = [];
      let currentDepth = 0;
      let isLastLevel;

      while(!isLastLevel){
         isLastLevel = true;

         // Go through all the nodes in this level and add their children to the next level
         for(let i = 0; i < currentLevel.length; i++){
            let left = currentLevel[i].left;
            let right = currentLevel[i].right;
            if(left){
               nextLevel.push(left);
               isLastLevel = false;
            }
            if(right){
               nextLevel.push(right);
               isLastLevel = false;
            }
         }

         currentLevel = [...nextLevel];
         nextLevel = [];
         currentDepth++;
      }
      return currentDepth;
   }


   // Generate level-order traversal for the tree
   generateLevelOrderTraversal(){
      this.traversalType = "level-order";
      let currentLevel = [this.rootNode];
      let nextLevel = [];
      this.nodeTraversal = currentLevel;
      let currentDepth = 1;
      let isLastLevel;

      while(!isLastLevel){
         isLastLevel = true;

         // Go through all the nodes in this level and add their children to the next level
         for(let i = 0; i < currentLevel.length; i++){
            let left = currentLevel[i].left;
            let right = currentLevel[i].right;
            if(left){
               nextLevel.push(left);
               isLastLevel = false;
            }
            if(right){
               nextLevel.push(right);
               isLastLevel = false;
            }
         }

         currentLevel = [...nextLevel];
         this.nodeTraversal.push(...currentLevel);
         nextLevel = [];
         currentDepth++;
      }
      return this.nodeTraversal;
   }


   // Set the tree traversal to a newly-generated preorder traversal
   generatePreorderTraversal(){
      this.nodeTraversal = [];
      this.nodeTraversal = this.getPreorderTraversal(this.rootNode, this.nodeTraversal);
   }


   // Recursively return an array containing each node in a pre-order traversal.
   getPreorderTraversal(node, traversal){
      traversal.push(node);
      let left = node.left;
      let right = node.right;
      if(left){
         traversal.concat(this.getPreorderTraversal(left, traversal));
      }
      if(right){
         traversal.concat(this.getPreorderTraversal(right, traversal));
      }
      return traversal;
   }
}