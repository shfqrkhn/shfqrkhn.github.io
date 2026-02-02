
const { performance } = require('perf_hooks');

// Simulation parameters
const PAGES = 100; // Increased to make the difference more visible
const ITEMS_PER_PAGE = 100;

function createData(size) {
    return Array.from({ length: size }, (_, i) => ({ id: i, name: `repo-${i}` }));
}

// Generate data pages upfront to isolate concatenation performance
const pagesData = Array.from({ length: PAGES }, () => createData(ITEMS_PER_PAGE));

function testConcat() {
    let allRepos = [];
    const start = performance.now();
    for (const data of pagesData) {
        allRepos = allRepos.concat(data);
    }
    const end = performance.now();
    return end - start;
}

function testPush() {
    let allRepos = [];
    const start = performance.now();
    for (const data of pagesData) {
        allRepos.push(...data);
    }
    const end = performance.now();
    return end - start;
}

// Warm up
testConcat();
testPush();

// Run benchmark
const ITERATIONS = 1000;
let concatTotal = 0;
let pushTotal = 0;

for (let i = 0; i < ITERATIONS; i++) {
    concatTotal += testConcat();
    pushTotal += testPush();
}

console.log(`Average execution time over ${ITERATIONS} iterations (simulating ${PAGES} pages of ${ITEMS_PER_PAGE} items):`);
console.log(`Array.concat: ${(concatTotal / ITERATIONS).toFixed(4)} ms`);
console.log(`Array.push(...): ${(pushTotal / ITERATIONS).toFixed(4)} ms`);
console.log(`Improvement: ${((concatTotal - pushTotal) / concatTotal * 100).toFixed(2)}%`);
