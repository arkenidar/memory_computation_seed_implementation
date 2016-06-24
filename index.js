/*

Description:
This program implements a machine for step-by-step computations.
It uses memory copy and "lookup tables" techniques.

Quotes:
It can scarcely be denied that the supreme goal of all theory is to make the irreducible basic elements as simple and as few as possible without having to surrender the adequate representation of a single datum of experience. 
“Make things as simple as possible, but not simpler.”

Example:
node . 123exit
(to run the "123exit" program)
More examples and ways to produce programs are work in progress.
*/

var sleep = require('sleep');

// Program is running.
running = true;

// Program name.
name = process.argv[2];

// RAM memory for the program execution.
mem = require('./programs/'+name+'.json');

// IP (Instruction Pointer) for selecting the current instruction.
ip = 0;

// Get current instruction pointed by Instruction Pointer (IP).
function i(n){
  return mem[ ip+n ];
}

// Bi-dimensional array access index.
function index(offset, i, j, stride){
  return offset+i+j*stride;
}

// Dump variables to the console for debugging purposes.
function inspect(){
  console.log('IP:\t'+ip)
  console.log('MEM:\t'+mem);
}

/*
Memory location is selected by index, for read and write access.
Memory index is is calculated from current instruction and its fields.
Memory index 0 is reserved for Input (reading) and Output (writing),
activated on respective read/write operations on memory index 0.
*/
function mem_index(){
  var mem_index = index(i(field++), i(field++), i(field++), i(field++));
  //console.log('mem_index:\t'+mem_index);
  return mem_index;
}

// Bebug initial conditions.
inspect();

// Conditions for running the program are checked.
while( running && ip >=0 ){
  
  // Begin from the first field of the current instruction
  // continuing to the successive fields of the current instruction.
  field = 0;

  // Change in memory (copy of memory content).
  // Functions are implemented as "lookup tables".
  mem[ mem_index() ] = mem[ mem_index() ];
  
  // Current instruction is changed.
  ip = mem[ mem_index() ];

  // Debug this step of the computation.
  inspect();
  
  // ... repeat ...
  
  //sleep.sleep(1);

}
