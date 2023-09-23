const {
  StackClass,
  QueueClass,
  BinaryTree,
  NodeTree,
  Graph,
  LinkedList,
  StackMinMax
} = require('./index.js'); 

describe('StackClass', () => {
  let stack;

  beforeEach(() => {
    stack = new StackClass();
  });

  test('push method should add elements to the stack', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
  });

  test('pop method should remove and return the top element', () => {
    stack.push(1);
    stack.push(2);
    const poppedElement = stack.pop();
    expect(poppedElement).toBe(2);
    expect(stack.size()).toBe(1);
  });

  test('peek method should return the top element without removing it', () => {
    stack.push(1);
    stack.push(2);
    const topElement = stack.peek();
    expect(topElement).toBe(2);
    expect(stack.size()).toBe(2);
  });

  test('isEmpty method should correctly determine if the stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  });

  test('size method should return the number of elements in the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.size()).toBe(3);
  });

  test('print method should return a string representation of the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.print()).toBe('1 2 3 ');
  });

  test('clear method should empty the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.clear();
    expect(stack.size()).toBe(0);
    expect(stack.isEmpty()).toBe(true);
  });
});

describe('QueueClass', () => {
  let queue;

  beforeEach(() => {
    queue = new QueueClass();
  });

  test('enqueue method should add elements to the queue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);
  });

  test('dequeue method should remove and return the front element', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    const dequeuedElement = queue.dequeue();
    expect(dequeuedElement).toBe(1);
    expect(queue.size()).toBe(1);
  });

  test('peek method should return the front element without removing it', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    const frontElement = queue.peek();
    expect(frontElement).toBe(1);
    expect(queue.size()).toBe(2);
  });

  test('isEmpty method should correctly determine if the queue is empty', () => {
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(1);
    expect(queue.isEmpty()).toBe(false);
  });

  test('size method should return the number of elements in the queue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.size()).toBe(3);
  });
});

describe('BinaryTree Class', () => {
  let binaryTree;
  let rootNodeValue = 50;

  beforeEach(() => {
    binaryTree = new BinaryTree(rootNodeValue);
  });

  test('should create a binary tree with a root node', () => {
    expect(binaryTree.rootNode.value).toBe(rootNodeValue);
  });

  test('should insert nodes correctly', () => {
    binaryTree.insert(new NodeTree(30));
    binaryTree.insert(new NodeTree(70));
    binaryTree.insert(new NodeTree(20));
    binaryTree.insert(new NodeTree(40));

    expect(binaryTree.rootNode.left.value).toBe(30);
    expect(binaryTree.rootNode.right.value).toBe(70);
    expect(binaryTree.rootNode.left.left.value).toBe(20);
    expect(binaryTree.rootNode.left.right.value).toBe(40);
  });

  test('should search nodes correctly', () => {
    binaryTree.insert(new NodeTree(30));
    binaryTree.insert(new NodeTree(70));

    expect(binaryTree.search(50).value).toBe(50);
    expect(binaryTree.search(30).value).toBe(30);
    expect(binaryTree.search(70).value).toBe(70);
    expect(binaryTree.search(100)).toBe(null);
  });

  test('should perform in-order traversal correctly', () => {
    binaryTree.insert(new NodeTree(30));
    binaryTree.insert(new NodeTree(70));
    binaryTree.insert(new NodeTree(20));
    binaryTree.insert(new NodeTree(40));

    expect(binaryTree.inOrderTraversal(binaryTree.rootNode, [])).toEqual([
      20,
      30,
      40,
      50,
      70
    ]);

    // Pre-Order Traversal
    expect(binaryTree.preOrderTraversal(binaryTree.rootNode, [])).toEqual([
      50,
      30,
      20,
      40,
      70
    ]);

    // Post-Order Traversal
    expect(binaryTree.postOrderTraversal(binaryTree.rootNode, [])).toEqual([
      20,
      40,
      30,
      70,
      50
    ]);
  });

  test('should correctly identify a valid BST', () => {
    binaryTree.insert(new NodeTree(30));
    binaryTree.insert(new NodeTree(70));
    binaryTree.insert(new NodeTree(20));
    binaryTree.insert(new NodeTree(40));

    expect(binaryTree.isBST()).toBe(true);
  });

  test('should correctly identify an invalid BST', () => {
    binaryTree.rootNode = new NodeTree(50);
    binaryTree.rootNode.left = new NodeTree(70); // Invalid, should be less than 50
    binaryTree.rootNode.right = new NodeTree(30); // Invalid, should be greater than 50
    binaryTree.rootNode.left.left = new NodeTree(20);
    binaryTree.rootNode.left.right = new NodeTree(80);

    expect(binaryTree.isBST()).toBe(false);
  });

  test('should return true for a single-node tree', () => {
    expect(new BinaryTree(50).isBST()).toBe(true);
  });
});

describe('Graph Class', () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
  });

  test('should add vertices correctly', () => {
    graph.addVertex('A');
    graph.addVertex('B');

    expect([...graph.depthFirstSearch('A')]).toEqual(['A']);
    expect([...graph.depthFirstSearch('B')]).toEqual(['B']);
  });

  test('should add edges correctly', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addEdge('A', 'B');

    expect([...graph.depthFirstSearch('A')]).toEqual(['A', 'B']);
  });

  test('depthFirstSearch should work correctly', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');

    expect([...graph.depthFirstSearch('A')]).toEqual(['A', 'C', 'B', 'D']);
  });

  test('breadthFirstSearch should work correctly', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');

    expect([...graph.breadthFirstSearch('A')]).toEqual(['A', 'B', 'C', 'D']);
  });

  test('findShortestPathDijkstra should find the shortest path correctly', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'D');
    graph.addEdge('A', 'D');

    const path = graph.dijkstra('A', 'D');
    expect(path).toEqual(['A', 'D']); // The shortest path should be directly from A to D
  });

  test('shortestPathUsingBFS should find the shortest path correctly', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'D');
    graph.addEdge('A', 'D');

    const path = graph.shortestPathUsingBFS('A', 'D');
    expect(path).toEqual(['A', 'D']); // The shortest path should be directly from A to D
  });
});

describe('LinkedList Class', () => {
  let linkedList;

  beforeEach(() => {
    linkedList = new LinkedList();
  });

  test('should insert nodes correctly', () => {
    linkedList.insert('a', 0);
    expect(linkedList.head.value).toBe('a');

    linkedList.insert('b', 1);
    expect(linkedList.getNodeAtIndex(1).value).toBe('b');

    linkedList.insert('c', 1);
    expect(linkedList.getNodeAtIndex(1).value).toBe('c');
    expect(linkedList.getNodeAtIndex(2).value).toBe('b');

    linkedList.insert('d');
    expect(linkedList.getNodeAtIndex(3).value).toBe('d');
  });

  test('should throw error when trying to insert at an index out of bounds', () => {
    expect(() => linkedList.insert('a', -1)).toThrow('Index out of bounds');
    expect(() => linkedList.insert('a', 1)).toThrow('Index out of bounds');
  });

  test('should delete nodes correctly', () => {
    linkedList.insert('a', 0);
    linkedList.insert('b', 1);
    linkedList.insert('c', 2);

    linkedList.delete(1);
    expect(linkedList.getNodeAtIndex(1).value).toBe('c');

    linkedList.delete(0);
    expect(linkedList.getNodeAtIndex(0).value).toBe('c');
  });

  test('should throw error when trying to delete at an index out of bounds', () => {
    expect(() => linkedList.delete(-1)).toThrow('Index out of bounds');
    expect(() => linkedList.delete(0)).toThrow('Index out of bounds');
  });

  test('should search nodes correctly', () => {
    linkedList.insert('a', 0);
    linkedList.insert('b', 1);
    linkedList.insert('c', 2);

    expect(linkedList.search('b').value).toBe('b');
    expect(linkedList.search('d')).toBe(null);
  });
});

describe('StackMinMax class', () => {
  let stack;

  beforeEach(() => {
    stack = new StackMinMax();
  });

  test('should correctly get minimum and maximum values', () => {
    stack.push(5);
    expect(stack.getMin()).toBe(5);
    expect(stack.getMax()).toBe(5);

    stack.push(3);
    expect(stack.getMin()).toBe(3);
    expect(stack.getMax()).toBe(5);

    stack.push(7);
    expect(stack.getMin()).toBe(3);
    expect(stack.getMax()).toBe(7);

    stack.push(3);
    expect(stack.getMin()).toBe(3);
    expect(stack.getMax()).toBe(7);
  });

  test('should correctly update minimum and maximum values when popping', () => {
    stack.push(5);
    stack.push(3);
    stack.push(7);
    stack.push(3);

    stack.pop();
    expect(stack.getMin()).toBe(3);
    expect(stack.getMax()).toBe(7);

    stack.pop();
    expect(stack.getMin()).toBe(3);
    expect(stack.getMax()).toBe(5);

    stack.pop();
    expect(stack.getMin()).toBe(5);
    expect(stack.getMax()).toBe(5);
  });

  test('should return undefined for getMin and getMax when stack is empty', () => {
    expect(stack.getMin()).toBeUndefined();
    expect(stack.getMax()).toBeUndefined();
  });
});
