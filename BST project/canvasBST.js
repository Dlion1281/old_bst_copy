"use strict";

const outputField = document.querySelector('#output-field');

// Define the canvas and its context
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// Read and write dimensions dynamically
let w = canvas.offsetWidth;
let h = canvas.offsetHeight;
canvas.width = w;
canvas.height = h;

// The size of drawn circles is constant
const outerRadius = 25;
const innerRadius = 19;
const gapDistance = 5;



class Node {
    constructor(x, y, value) {
        this.left = null;
        this.right = null;
        this.value = value;
        
        this.x = x;
        this.y = y;
        this.color = "#000000";
    }

    drawNode() {
        // Draw the outer circle
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.arc(this.x, this.y, outerRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        // Draw the inner circle to create the ring effect
        ctx.fillStyle = "white"; 
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.arc(this.x, this.y, innerRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = "black";
        ctx.font = "16px IBM Plex Sans";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.value, this.x, this.y);
    }
}


class BinaryTree {
    constructor(value) {
        this.root = value || null;
        this.levelMap = new Map();
    }
    
    insert(value) {
        const newNode = new Node(w / 2, 50, value);

        if (!this.root) {
            this.root = newNode;
            this.root.color = "#d9b036";
            this.addToLevelMap(this.root, 0);
        }
        else 
          this.insertNode(this.root, newNode, 0);
    }

    insertNode(currNode, newNode, level) {
        if (newNode.value < currNode.value) {
            if (!currNode.left)
            {
                newNode.color = "#264fbf";
                currNode.left = newNode;
                this.addToLevelMap(newNode, level + 1);
            }
            else    
                this.insertNode(currNode.left, newNode, level + 1); 
        }
        else {
            if (!currNode.right)
            {   
                newNode.color = "#ad1320";
                currNode.right = newNode;
                this.addToLevelMap(newNode, level + 1);
            }
            else 
                this.insertNode(currNode.right, newNode, level + 1); 
        }
    }

    // do i need it ?
    addToLevelMap(node, level)
    {
        if (!this.levelMap.has(level)) {
            this.levelMap.set(level, []);
        }
       
        const levelArray = this.levelMap.get(level);
        levelArray.push(node);

        // Sort nodes in the levelArray based on their values
        levelArray.sort((a, b) => a.value - b.value);
    }

    inorderTraversal(node) {
        //! make an error handles in case of no parameters sent
        if (node !== null) {
            this.inorderTraversal(node.left);
            outputField.textContent += node.value + ' ';
            this.inorderTraversal(node.right);
        }
    }

    drawAll(node) {
        if (node !== null) {
            this.drawAll(node.left);
            node.drawNode();
            this.drawAll(node.right);
        }
    }
    
    printPositions() {
        for (let [level, nodes] of this.levelMap) {
            console.log(level, nodes);
        }
    }

    sortedArrayToBST(arr) {
        if (arr.length === 0) {
            return null;
        }

        this.root = this.sortedArrayToBSTHelper(arr, 0, arr.length - 1, 0);

    }

    sortedArrayToBSTHelper(arr, start, end, level) {
        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const newNode = new Node(0, 0, arr[mid]);

        // Recursively build left and right subtrees
        newNode.left = this.sortedArrayToBSTHelper(arr, start, mid - 1, level + 1);
        newNode.right = this.sortedArrayToBSTHelper(arr, mid + 1, end, level + 1);

        this.addToLevelMap(newNode, level); // Add the node to the level map

        return newNode;
    }

    getLevelMap() {
        return [...this.levelMap.entries()];
    }

}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
const tree = new BinaryTree();

for (let i = 0; i < 5; i++)
{
    tree.insert(getRandomInt(-100, 100));
}


// tree.inorderTraversal(tree.root);

// tree.drawAll(tree.root);

const treeTemplate = new BinaryTree();

function fillTemplate(numLevels, arrTemplate) {
    for (let i = 0; i < numLevels; i++)
    {
        const numElements = Math.pow(2, i);
        for (let j = 0; j < numElements; j++)
            arrTemplate.push(getRandomInt(-100, 100));
    }
    arrTemplate.sort((a, b) => a - b);
}

const arrTemplate = [];
fillTemplate(5, arrTemplate);

console.log(arrTemplate);

treeTemplate.sortedArrayToBST(arrTemplate);
treeTemplate.inorderTraversal(treeTemplate.root);

// treeTemplate.printPositions();


function drawNodesHorizontallyCentered(levelArray, y) {

    const totalWidth = levelArray[0][1].length * (outerRadius * 2 + gapDistance) - gapDistance;
    const startX = (canvas.width - totalWidth) / 2;

    let currentX = startX;
    
    levelArray[0][1].forEach((node, index) => {
        node.x = currentX + outerRadius; // Center of the circle
        node.y = y;

        if (index % 2 == 0) 
            node.color = "#264fbf";
        else 
            node.color = "#ad1320";

        node.drawNode();
        currentX += outerRadius * 2 + gapDistance;
    });
    
    for (let i = 1; i < levelArray.length-1; i++)
    {
        levelArray[i][1].forEach((node, index) => {
            const centerX = (node.left.x + node.right.x) / 2;
            node.x = centerX;
            node.y = node.left.y + 50;

            if (index % 2 == 0) 
                node.color = "#264fbf";
            else 
                node.color = "#ad1320";

            node.drawNode();
            
        });
    }

    const root = levelArray[levelArray.length - 1][1][0];
    const centerX = (root.left.x + root.right.x) / 2;
    root.x = centerX;
    root.y = root.left.y + 50;
    root.color = "#d9b036";
    root.drawNode();
}

const result = treeTemplate.getLevelMap();

drawNodesHorizontallyCentered(result, 50);
