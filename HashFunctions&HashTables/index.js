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
module.exports = {
    HashTableClass
};
