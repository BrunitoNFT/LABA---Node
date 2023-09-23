"use strict";
/*
PART 1
What are hash functions and how they work?

Hash functions are functions that take an input (password, message, etc...) and convert it into a fixed
amount of bytes.
Depending on the algorithm implemented in the hash function such as md5 (16 bytes)
or sha256 (32 bytes) the output will always be the same length, it doesn't matter the input.
With the same input the output of the function will be the same, for example if we
execute the function with the same input twice, we are going to have exactly the same
amount of bytes in the same order.

What are the application of hash functions in Data Storage and Data Science?

* Data Integrity and Validation:
Ensuring Data Authenticity: In data storage systems, hash functions can be used to validate
the integrity of stored data. By generating a hash of the data at the time of storage and then
later re-generating the hash at the time of retrieval, one can confirm that the data has not
been altered in any way.

* Database Indexing:
Fast Lookup: In databases, hash indices can be created to allow for faster lookup times
when querying the data. It essentially speeds up the operations of finding, updating, and
deleting data records.

* Unique Identification:
Creating a unique fingerprint for data files using hash functions is common in data storage
solutions. This fingerprint helps in quickly identifying files and verifying their
authenticity.

*Anonymization:
Anonymization is the process of protecting private or sensitive information in a dataset by deleting or encrypting personally identifiable information (PII).
Hash functions can be applied to transform PII into a different representation, thereby anonymizing the data.
Real-World Example: In the healthcare sector, researchers might want to analyze patient data to derive insights and develop treatment plans without
exposing individual patients' identities.
A hash function can be employed to transform sensitive fields like "Name" or "Social Security Number" into a hashed representation.
This hashed representation anonymizes the data, as it is computationally infeasible to reverse a well-designed hash function to obtain the original data.
Researchers can carry out their analysis without risking patient confidentiality, adhering to regulations like the Health Insurance Portability and
Accountability Act (HIPAA) in the USA.




*/
function customHashFunction(key, length = 8) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
    }
    return hash.toString(16).padStart(length, '0');
}
class HashTableClass {
    /**
     * HashTableClass Constructor
     * Initializes a new hash table with the specified size (default is 100) and an empty Map to store the keys and values.
     *
     * @param {number} [size=100] - The initial size of the hash table
     */
    constructor(size = 100) {
        this.size = size;
        this.table = new Map();
    }
    /**
     * Hash Function
     * The customHashFunction takes a string and computes a hash code by summing the char codes of all characters in the string.
     * The hash code is then obtained as the remainder of the division of the sum by the size of the hash table, which helps in evenly distributing the keys across the hash table to a certain extent.
     *
     * Time complexity: O(n) where n is the length of the key string.
     *
     * @param {string} key - The key to be hashed
     * @returns {string} - The computed hash code as a string
     */
    customHashFunction(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return (hash % this.size).toString();
    }
    /**
     * Set Method
     * The set method takes a key and a value, computes the hash of the key using the customHashFunction, and stores the key-value pair in the hash table.
     * In the event of a collision (where another key hashes to the same index), the key-value pair is added to a list at that index.
     * If the key already exists, its value is updated.
     *
     * Time complexity:
     * - Best and Average case: O(1)
     * - Worst case: O(m) where m is the number of collisions in the worst-case scenario
     *
     * @param {string} key - The key to be added to the hash table
     * @param {any} value - The value to be associated with the key
     */
    set(key, value) {
        const index = this.customHashFunction(key);
        let tableEntry = this.table.get(index);
        if (tableEntry !== undefined) {
            let existingEntry = tableEntry.find(entry => entry.key === key);
            if (existingEntry) {
                existingEntry.value = value;
            }
            else {
                tableEntry.push({ key, value });
            }
        }
        else {
            this.table.set(index, [{ key, value }]);
        }
    }
    /**
     * Get Method
     * This method computes the hash of the provided key and looks up the value associated with the key in the hash table.
     * If the key does not exist, it throws an error.
     *
     * Time complexity:
     * - Best and Average case: O(1)
     * - Worst case: O(m) where m is the number of collisions at a specific index
     *
     * @param {string} key - The key whose associated value is to be retrieved
     * @returns {any} - The value associated with the key
     */
    get(key) {
        const index = this.customHashFunction(key);
        let tableEntry = this.table.get(index);
        if (tableEntry !== undefined) {
            const hashTableEntry = tableEntry.find(entry => entry.key === key);
            if (hashTableEntry !== undefined) {
                return hashTableEntry.value;
            }
            else {
                throw new Error(`The key ${key} doesn't exist in the HASH TABLE`);
            }
        }
        else {
            throw new Error(`The key ${key} doesn't exist in the HASH TABLE`);
        }
    }
    /**
     * Delete Method
     * This method computes the hash for the given key and removes the key-value pair from the hash table.
     * If the key does not exist in the table, it throws an error.
     *
     * Time complexity:
     * - Best and Average case: O(1)
     * - Worst case: O(m) where m is the number of collisions at a specific index
     *
     * @param {string} key - The key to be removed from the hash table
     */
    delete(key) {
        const index = this.customHashFunction(key);
        let tableEntry = this.table.get(index);
        if (tableEntry !== undefined) {
            this.table.set(index, tableEntry.filter(entry => entry.key !== key));
        }
        else {
            throw new Error(`The key ${key} doesn't exist in the HASH TABLE`);
        }
    }
}
/*
HashTable with Map
Advantages:
Dynamic Sizing: Maps in JavaScript (and many other languages) can dynamically resize. This can lead to better memory utilization.
Built-in Methods: Maps come with built-in methods that make certain operations more straightforward, such as delete, has, and iterators like keys, values, and entries.
No Explicit Collision Handling: The underlying implementation of a Map handles collisions, so you don't have to write code for that.
Key Flexibility: Maps allow for more flexible key types. While your hash table implementation uses strings, Maps can use objects, functions, and other types as keys.
Disadvantages:
Performance Overhead: As seen in tests, Maps can introduce some performance overheads, possibly due to their dynamic nature and added functionalities.
Complexity: While Maps handle many complexities for you, understanding their underlying workings might be more challenging than a simple array.
Memory Usage: Due to their dynamic nature and added functionalities, Maps might consume more memory compared to an array, especially for very small datasets.

*/
class HashTableClassArray {
    constructor(size = 100) {
        this.size = size;
        this.table = new Array(size).fill(null);
    }
    customHashFunction(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }
    set(key, value) {
        const index = this.customHashFunction(key);
        if (this.table[index] === null) {
            this.table[index] = [{ key, value }];
        }
        else {
            const existingEntry = this.table[index].find(entry => entry.key === key);
            if (existingEntry) {
                existingEntry.value = value;
            }
            else {
                this.table[index].push({ key, value });
            }
        }
    }
    get(key) {
        const index = this.customHashFunction(key);
        if (this.table[index] === null) {
            throw new Error(`The key ${key} doesn't exist in the HASH TABLE`);
        }
        else {
            const entry = this.table[index].find(e => e.key === key);
            if (entry) {
                return entry.value;
            }
            else {
                throw new Error(`The key ${key} doesn't exist in the HASH TABLE`);
            }
        }
    }
    delete(key) {
        const index = this.customHashFunction(key);
        if (this.table[index] === null) {
            throw new Error(`The key ${key} doesn't exist in the HASH TABLE`);
        }
        else {
            this.table[index] = this.table[index].filter(entry => entry.key !== key);
            if (this.table[index].length === 0) {
                this.table[index] = null;
            }
        }
    }
}
/*
HashTable with Array
Advantages:
Predictable Memory Usage: Arrays have a fixed size (when they're not dynamically resizing), so they can be more memory efficient for smaller datasets.
Direct Access: Arrays allow direct access to the memory slot, making them slightly faster in certain operations.
Simplicity: Arrays provide a simpler data structure for straightforward hashing scenarios without the need for many of the bells and whistles that come with maps.
Performance: The array-based hash table performed better in tests. This can be attributed to the overhead introduced by map-based operations and internal mechanisms.
Disadvantages:
Fixed Size: Traditional arrays are of fixed size. This means you must either allocate a large chunk of memory upfront or implement dynamic resizing, which can be complex.
Handling Collisions: Arrays require explicit handling of hash collisions, which can add complexity to the code.
Memory Wastage: If the hash table size is much larger than the number of entries, there's potential for wasted memory.
Manual Management: Array-based implementations often require more manual management of data storage and retrieval.
*/
/*
The choice between an array-based hash table and a map-based one largely depends on the requirements of the project.
 If absolute control over every aspect of the hashing process is essential, and you're willing to invest the
 time to handle collisions, resizing, and other intricacies manually for the sake of performance or memory efficiency,
 an array-based hash table would be more suitable. This is often the case in performance-intensive applications or
 environments with limited resources.

On the other hand, if the primary concerns are flexibility, ease of development, and handling a dynamically changing dataset,
then a map-based hash table is the way to go. It's a powerful tool for many modern software applications where development speed, adaptability,
and handling complex data types are more pressing than raw performance.

Remember, while these guidelines provide a general direction, always profile and test in your specific environment and use case to make an informed decision.
*/
/*
Should the hash set have a has() method?

Yes, it should. However it wasn’t in the exercise so I avoided it. The hash method is important to know the existence of a value in the HashTable returning a boolean true if exists and false in the counterpart.

What will happen if you exceed 100 items, and what should happen in this case?

If the HashTable has a size of one hundred and it is exceeded in more than one hundred entries, as described in the comments, the methods of the table will tend to a time complexity of O(m) where m is the quantity of values that the array linked to the key hashed has.
However O(m) is not the time complexity that we are looking for, therefore we can take measures such as resizing the HashTable, which means creating a new and bigger one, re-locating all the entries of the previous table into the new and huge one.

*/
class HashTableClassMapResizeHas {
    constructor(size = 3) {
        // Using a small size (3) for testing purposes
        this.size = size;
        this.table = new Map();
        this.entries = 0;
        this.loadFactor = 0.75;
    }
    /**
     * Resize Method
     * This method resizes the hash table when the number of keys stored reaches a certain threshold (like a load factor).
     * We double the size of the table, and re-hash all the current keys into this new table.
     *
     * Time complexity: O(n) where n is the number of keys in the table, as each key needs to be reinserted.
     */
    resize() {
        if (this.entries > this.size * this.loadFactor) {
            // resizing when load factor exceeds 0.75
            const oldTable = new Map(this.table);
            this.size *= 2;
            this.table = new Map();
            this.entries = 0; // resetting entries to 0 because we'll increment it while reinserting
            oldTable.forEach((value, key) => {
                value.forEach(entry => {
                    this.set(entry.key, entry.value);
                });
            });
        }
    }
    /**
     * Hash Function
     * The customHashFunction takes a string and computes a hash code by summing the char codes of all characters in the string.
     * The hash code is then obtained as the remainder of the division of the sum by the size of the hash table, which helps in evenly distributing the keys across the hash table to a certain extent.
     *
     * Time complexity: O(n) where n is the length of the key string.
     *
     * @param {string} key - The key to be hashed
     * @returns {string} - The computed hash code as a string
     */
    customHashFunction(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return (hash % this.size).toString();
    }
    /**
     * Set Method
     * The set method takes a key and a value, computes the hash of the key using the customHashFunction, and stores the key-value pair in the hash table.
     * In the event of a collision (where another key hashes to the same index), the key-value pair is added to a list at that index.
     * If the key already exists, its value is updated.
     *
     * Time complexity:
     * - Best and Average case: O(1)
     * - Worst case: O(m) where m is the number of collisions in the worst-case scenario
     *
     * @param {string} key - The key to be added to the hash table
     * @param {any} value - The value to be associated with the key
     */
    set(key, value) {
        const index = this.customHashFunction(key);
        let tableEntry = this.table.get(index);
        if (tableEntry !== undefined) {
            let existingEntry = tableEntry.find(entry => entry.key === key);
            if (existingEntry) {
                existingEntry.value = value;
            }
            else {
                tableEntry.push({ key, value });
                this.entries++; // incrementing the entries because a new key is added
            }
        }
        else {
            this.table.set(index, [{ key, value }]);
            this.entries++; // incrementing the entries because a new key is added
        }
        this.resize(); // check if resizing is required
    }
    /**
     * Get Method
     * This method computes the hash of the provided key and looks up the value associated with the key in the hash table.
     * If the key does not exist, it throws an error.
     *
     * Time complexity:
     * - Best and Average case: O(1)
     * - Worst case: O(m) where m is the number of collisions at a specific index
     *
     * @param {string} key - The key whose associated value is to be retrieved
     * @returns {any} - The value associated with the key
     */
    get(key) {
        const index = this.customHashFunction(key);
        let tableEntry = this.table.get(index);
        if (tableEntry !== undefined) {
            const hashTableEntry = tableEntry.find(entry => entry.key === key);
            if (hashTableEntry !== undefined) {
                return hashTableEntry.value;
            }
            else {
                throw new Error(`The key ${key} doesn't exist in the HASH TABLE`);
            }
        }
        else {
            throw new Error(`The key ${key} doesn't exist in the HASH TABLE`);
        }
    }
    has(key) {
        try {
            this.get(key);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Delete Method
     * This method computes the hash for the given key and removes the key-value pair from the hash table.
     * If the key does not exist in the table, it throws an error.
     *
     * Time complexity:
     * - Best and Average case: O(1)
     * - Worst case: O(m) where m is the number of collisions at a specific index
     *
     * @param {string} key - The key to be removed from the hash table
     */
    delete(key) {
        const index = this.customHashFunction(key);
        let tableEntry = this.table.get(index);
        if (tableEntry !== undefined) {
            this.table.set(index, tableEntry.filter(entry => entry.key !== key));
            this.entries--;
        }
        else {
            throw new Error(`The key ${key} doesn't exist in the HASH TABLE`);
        }
    }
}
class HashTableClassArrayResizeHas {
    constructor(size = 3) {
        this.size = size;
        this.table = new Array(size).fill(null);
        this.entries = 0;
        this.loadFactor = 0.75;
    }
    customHashFunction(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }
    resize() {
        if (this.entries <= this.size * this.loadFactor)
            return; // if under the load factor, return early
        const oldTable = [...this.table];
        this.size *= 2;
        this.table = new Array(this.size).fill(null); // fix here
        this.entries = 0; // reset count
        oldTable.forEach(array => {
            array && array.forEach(entry => this.set(entry.key, entry.value));
        });
    }
    has(key) {
        try {
            this.get(key);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    set(key, value) {
        const index = this.customHashFunction(key);
        if (!this.table[index]) {
            this.table[index] = [{ key, value }];
            this.entries++;
        }
        else {
            const existingEntry = this.table[index].find(entry => entry.key === key);
            if (existingEntry) {
                existingEntry.value = value;
            }
            else {
                this.table[index].push({ key, value });
                this.entries++;
            }
        }
        this.resize();
    }
    get(key) {
        const index = this.customHashFunction(key);
        if (!this.table[index]) {
            throw new Error(`The key ${key} doesn't exist in the HASH TABLE`);
        }
        const entry = this.table[index].find(e => e.key === key);
        if (entry) {
            return entry.value;
        }
        else {
            throw new Error(`The key ${key} doesn't exist in the HASH TABLE`);
        }
    }
    delete(key) {
        const index = this.customHashFunction(key);
        if (!this.table[index]) {
            throw new Error(`The key ${key} doesn't exist in the HASH TABLE`);
        }
        const initialLength = this.table[index].length;
        this.table[index] = this.table[index].filter(entry => entry.key !== key);
        this.entries -= initialLength - this.table[index].length; // decrement by the number of entries removed
        if (this.table[index].length === 0) {
            this.table[index] = null;
        }
    }
}
module.exports = {
    HashTableClass,
    HashTableClassArray,
    HashTableClassMapResizeHas,
    HashTableClassArrayResizeHas
};
