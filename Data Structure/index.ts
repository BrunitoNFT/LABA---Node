interface Stack {
  items: any[];
  count: number;
  push(element: any): number;
  pop(): any;
  peek(): any;
  isEmpty(): boolean;
  size(): number;
  print(): string;
  clear(): any[];
}

class StackClass implements Stack {
  items: any[];
  count: number;
  constructor() {
    this.items = [];
    this.count = 0;
  }

  // Add element to top of stack
  push(element: any) {
    this.items[this.count] = element;
    console.log(`${element} added to ${this.count}`);
    this.count += 1;
    return this.count - 1;
  }

  // Return and remove top element in stack
  // Return undefined if stack is empty
  pop() {
    if (this.count == 0) return undefined;
    let deleteItem = this.items[this.count - 1];
    this.count -= 1;
    console.log(`${deleteItem} removed`);
    return deleteItem;
  }

  // Check top element in stack
  peek() {
    console.log(`Top element is ${this.items[this.count - 1]}`);
    return this.items[this.count - 1];
  }

  // Check if stack is empty
  isEmpty() {
    console.log(this.count == 0 ? 'Stack is empty' : 'Stack is NOT empty');
    return this.count == 0;
  }

  // Check size of stack
  size() {
    console.log(`${this.count} elements in stack`);
    return this.count;
  }

  // Print elements in stack
  print() {
    let str = '';
    for (let i = 0; i < this.count; i++) {
      str += this.items[i] + ' ';
    }
    return str;
  }

  // Clear stack
  clear() {
    this.items = [];
    this.count = 0;
    console.log('Stack cleared..');
    return this.items;
  }
}

class StackMinMax extends StackClass {
  /*
  Maybe just two properties in the object would look great to solve this problem, but what would happen if JS pops an element that is the max or min?
  In that case we should iterate all the stack and wouldn't be 0(1) as asked.
  */
  minStack: any[];
  maxStack: any[];

  constructor() {
    super();
    this.minStack = [];
    this.maxStack = [];
  }
  push(element: any): number {
    let number = super.push(element);

    const min =
      this.minStack.length === 0
        ? element
        : this.minStack[this.minStack.length - 1];
    const max =
      this.maxStack.length === 0
        ? element
        : this.maxStack[this.maxStack.length - 1];

    if (element <= min) {
      this.minStack.push(element);
    }
    if (element >= max) {
      this.maxStack.push(element);
    }

    return number;
  }

  pop() {
    const poppedElement = super.pop();

    if (poppedElement === undefined) return undefined;

    if (poppedElement === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
    if (poppedElement === this.maxStack[this.maxStack.length - 1]) {
      this.maxStack.pop();
    }

    return poppedElement;
  }

  getMin() {
    return this.minStack.length === 0
      ? undefined
      : this.minStack[this.minStack.length - 1];
  }

  getMax() {
    return this.maxStack.length === 0
      ? undefined
      : this.maxStack[this.maxStack.length - 1];
  }
}

interface Queue {
  queue: Object;
  front: number;
  rear: number;
  enqueue(element: any): void;
  dequeue(): any;
  peek(): any;
  isEmpty(): boolean;
  size(): number;
}

interface QueueItem {
  [key: string]: any;
}

class QueueClass implements Queue {
  queue: QueueItem;
  front: number;
  rear: number;

  constructor() {
    this.queue = {}; // Usamos un objeto para almacenar los elementos de la cola
    this.front = 0; // Puntero al frente de la cola
    this.rear = 0; // Puntero a la parte trasera de la cola
  }

  // Agregar un elemento al final de la cola
  enqueue(element: any) {
    this.queue[String(this.rear)] = element;
    this.rear++;
  }

  // Quitar y devolver el elemento del frente de la cola
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const element = this.queue[String(this.front)];
    delete this.queue[String(this.front)];
    this.front++;
    return element;
  }

  // Obtener el elemento del frente de la cola sin quitarlo
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.queue[String(this.front)];
  }

  // Verificar si la cola está vacía
  isEmpty() {
    return this.front === this.rear;
  }

  // Obtener el tamaño de la cola
  size() {
    return this.rear - this.front;
  }
}

interface INode {
  left: INode | null;
  right: INode | null;
  value: number | null;
}

class NodeTree implements INode {
  left: NodeTree | null;
  right: NodeTree | null;
  value: number;

  constructor(
    value: number,
    left: NodeTree | null = null,
    right: NodeTree | null = null
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

interface IBinaryTree {
  rootNode: NodeTree | null;
  insert(node: NodeTree): void;
  search(value: number): NodeTree | null;

  // These methods will start either in a specific NODE or in the default ROOT.
  inOrderTraversal(node: NodeTree | null, result: number[]): number[];
  preOrderTraversal(node: NodeTree | null, result: number[]): number[];
  postOrderTraversal(node: NodeTree | null, result: number[]): number[];
}

class BinaryTree implements IBinaryTree {
  rootNode: NodeTree | null = null;

  constructor(value: number) {
    this.rootNode = new NodeTree(value);
  }

  insert(node: NodeTree): void {
    if (this.rootNode === null) {
      this.rootNode = node;
      return;
    }

    let currentNode: NodeTree = this.rootNode;

    while (true) {
      if (currentNode.value < node.value) {
        // Our Node that we should insert is greater than currentNode. -> We should go to the right zone
        //
        // If the currentNode has a right pointer to another node we should keep searching deeply in the same tree branch (Right). Otherwise if right pointer is null
        // We have a destination to our inserting node.
        //
        if (currentNode.right === null) {
          currentNode.right = node;
          return;
        }
        currentNode = currentNode.right;
      } else {
        // Our Node that we should insert is less than currentNode. -> We should go to the left zone
        //
        // If the currentNode has a left pointer to another node we should keep searching deeply in the same tree branch (Left). Otherwise if left pointer is null we have a destination to our inserting node.
        //
        if (currentNode.left === null) {
          currentNode.left = node;
          return;
        }
        currentNode = currentNode.left;
      }
    }
  }

  search(value: number): NodeTree | null {
    if (this.rootNode === null) {
      return null;
    }
    let currentNode: NodeTree = this.rootNode;
    while (true) {
      if (currentNode.value === value) {
        return currentNode;
      }
      if (currentNode.value < value) {
        if (currentNode.right === null) {
          return null;
        }
        currentNode = currentNode.right;
      } else {
        if (currentNode.left === null) {
          return null;
        }

        currentNode = currentNode.left;
      }
    }
  }

  isBST(): boolean {
    const values = this.inOrderTraversal();
    for (let i = 1; i < values.length; i++) {
      if (values[i] <= values[i - 1]) {
        return false;
      }
    }
    return true;
  }

  inOrderTraversal(
    node: NodeTree | null = this.rootNode,
    result: number[] = []
  ): number[] {
    if (node === null) {
      return result;
    }
    this.inOrderTraversal(node.left, result);
    result.push(node.value);
    this.inOrderTraversal(node.right, result);

    return result;
  }
  preOrderTraversal(
    node: NodeTree | null = this.rootNode,
    result: number[] = []
  ): number[] {
    if (node === null) {
      return result;
    }
    result.push(node.value);
    this.preOrderTraversal(node.left, result);
    this.preOrderTraversal(node.right, result);
    return result;
  }
  postOrderTraversal(
    node: NodeTree | null = this.rootNode,
    result: number[] = []
  ): number[] {
    if (node === null) {
      return result;
    }
    this.postOrderTraversal(node.left, result);
    this.postOrderTraversal(node.right, result);
    result.push(node.value);
    return result;
  }
}

interface IGraph<T> {
  adjacencyList: Map<T, Set<T>>;
  addVertex(vertex: T): void;
  addEdge(vertex1: T, vertex2: T): void;
  depthFirstSearch(start: T): T[];
  breadthFirstSearch(start: T): T[];
}

class Graph<T> implements IGraph<T> {
  adjacencyList: Map<T, Set<T>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Set());
    }
  }

  addEdge(vertex1: T, vertex2: T): void {
    // If the vertices do not exist, add them to the graph
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.adjacencyList.get(vertex1)?.add(vertex2);
    this.adjacencyList.get(vertex2)?.add(vertex1);
  }

  depthFirstSearch(start: T): T[] {
    const stack: T[] = [start];
    const visited: Set<T> = new Set();
    const result: T[] = [];

    while (stack.length) {
      const vertex = stack.pop();
      if (vertex !== undefined && !visited.has(vertex)) {
        visited.add(vertex);
        result.push(vertex);
        const neighbors = this.adjacencyList.get(vertex) || [];
        stack.push(...neighbors);
      }
    }

    return result;
  }

  breadthFirstSearch(start: T): T[] {
    const queue: T[] = [start];
    const visited: Set<T> = new Set();
    const result: T[] = [];

    while (queue.length) {
      const vertex = queue.shift();
      if (vertex !== undefined && !visited.has(vertex)) {
        visited.add(vertex);
        result.push(vertex);
        const neighbors = this.adjacencyList.get(vertex) || [];
        queue.push(...neighbors);
      }
    }

    return result;
  }

  dijkstra(start: T, end: T): T[] | null {
    const distances = new Map();
    const previousVertices = new Map<T, T | null>();
    const visitedVertices = new Set<T>();
    const priorityQueue = new PriorityQueue<{ vertex: T; distance: number }>();

    this.adjacencyList.forEach((_, vertex) => {
      distances.set(vertex, Infinity);
      previousVertices.set(vertex, null);
    });

    distances.set(start, 0);
    priorityQueue.enqueue({ vertex: start, distance: 0 });

    while (!priorityQueue.isEmpty()) {
      const { vertex } = priorityQueue.dequeue();
      if (!visitedVertices.has(vertex)) {
        visitedVertices.add(vertex);

        const neighbors = this.adjacencyList.get(vertex) || [];
        for (const neighbor of neighbors) {
          const currentDistance = distances.get(vertex) as number;
          const newDistance = currentDistance + 1; // Assuming all edges have weight 1
          if (newDistance < (distances.get(neighbor) as number)) {
            distances.set(neighbor, newDistance);
            previousVertices.set(neighbor, vertex);
            priorityQueue.enqueue({ vertex: neighbor, distance: newDistance });
          }
        }
      }
    }

    const path: T[] = [];
    let currentVertex: T | null = end;

    while (currentVertex) {
      path.push(currentVertex);
      currentVertex = previousVertices.get(currentVertex)!;
    }

    return path.length > 1 ? path.reverse() : null;
  }

  shortestPathUsingBFS(start: T, end: T): T[] | null {
    const previousVertices = new Map<T, T | null>();
    const visited = new Set<T>();
    const queue: T[] = [start];

    visited.add(start);
    previousVertices.set(start, null);

    while (queue.length > 0) {
      const vertex = queue.shift();
      if (vertex) {
        const neighbors = this.adjacencyList.get(vertex) || new Set();
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            previousVertices.set(neighbor, vertex);
            queue.push(neighbor);
            if (neighbor === end) {
              const path: T[] = [];
              let currentVertex: T | null = end;
              while (currentVertex) {
                path.push(currentVertex);
                currentVertex = previousVertices.get(currentVertex)!;
              }
              return path.reverse();
            }
          }
        }
      }
    }

    return null;
  }
}

class PriorityQueue<T> {
  private values: T[] = [];

  enqueue(value: T): void {
    this.values.push(value);
    this.values.sort((a, b) => (a as any).distance - (b as any).distance);
  }

  dequeue(): T {
    return this.values.shift() as T;
  }

  isEmpty(): boolean {
    return this.values.length === 0;
  }
}

interface INodeLinked<T> {
  value: T;
  next: NodeLinked<T> | null;
}

class NodeLinked<T> implements INodeLinked<T> {
  value: T;
  next: NodeLinked<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

interface ILinkedList<T> {
  head: NodeLinked<T> | null;
  length: number;
  insert(value: T, index?: number): void;
  delete(index: number): void;
  search(value: T): NodeLinked<T> | null;
  getNodeAtIndex(index: number): NodeLinked<T> | null;
}

class LinkedList<T> implements ILinkedList<T> {
  head: NodeLinked<T> | null = null;
  length: number = 0;

  // Method to insert a node at a specific index
  insert(value: T, index: number = this.length): void {
    if (index < 0 || index > this.length) {
      throw new Error('Index out of bounds');
    }

    const newNode = new NodeLinked(value);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      const prevNode = this.getNodeAtIndex(index - 1);
      newNode.next = prevNode!.next;
      prevNode!.next = newNode;
    }

    this.length++;
  }

  // Helper method to get a node at a specific index
  getNodeAtIndex(index: number): NodeLinked<T> | null {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode!.next;
    }

    return currentNode;
  }

  // Method to delete a node at a specific index
  delete(index: number): void {
    if (index < 0 || index >= this.length) {
      throw new Error('Index out of bounds');
    }

    if (index === 0) {
      this.head = this.head!.next;
    } else {
      const prevNode = this.getNodeAtIndex(index - 1);
      prevNode!.next = prevNode!.next!.next;
    }

    this.length--;
  }

  // Method to search for a node with a specific value
  search(value: T): NodeLinked<T> | null {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }
}

module.exports = {
  StackClass,
  StackMinMax,
  QueueClass,
  BinaryTree,
  NodeTree,
  Graph,
  NodeLinked,
  LinkedList
};
