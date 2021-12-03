# N-Queens Linear Time Complexity Conflict Checker
01/06/2020

## Overview
Given an array representing a N-Queens board where:

* Index `i` of the array represents the column where the queen is found, and
* `array[i]` represents the row where the queen is found,

such as the following:

```
N-Queens(4) = [1, 3, 0, 2]

   -----------------
0  |   |   | x |   |
   -----------------
1  | x |   |   |   |
   -----------------
2  |   |   |   | x |
   -----------------
3  |   | x |   |   |
   -----------------
```

here is an algorithm that checks for conflicts in linear time (and space) complexity.

## Algorithm steps

#### Check that every row contains only one queen.

```
   -----------------
   | 0 | 0 | x | 0 |
   -----------------
   | x | 1 | 1 | 1 |
   -----------------  ---> rows: [1, 1, 1, 1]
   | 2 | 2 | 2 | x |              0  1  2  3
   -----------------
   | 3 | x | 3 | 3 |
   -----------------
```

#### Check that n primary diagonals (left to right, top to bottom, starting in the bottom left corner) only contain one queen per diagonal.

```
   -----------------                  
   | 4 | 5 | x | 7 |
   -----------------
   | x | 4 | 5 | 6 |
   -----------------  ---> diagonals: [0, 0, 1, 1, 0, 1, 1, 0]
   | 2 | 3 | 4 | x |                   0  1  2  3  4  5  6  7
   -----------------
   | 1 | x | 3 | 4 |
   -----------------
```

#### Check that n secondary diagonals (right to left, top to bottom, starting in the bottom right corner) only contain one queen per diagonal.

```
   -----------------                  
   | 7 | 6 | x | 4 |
   -----------------
   | x | 5 | 4 | 3 |
   -----------------  ---> diagonals: [0, 0, 1, 1, 0, 1, 1, 0]
   | 5 | 4 | 3 | x |                   0  1  2  3  4  5  6  7
   -----------------
   | 4 | x | 2 | 1 |
   -----------------
```

## Design

Some considerations on the design of the algorithm:

* Step number 3 can be introduced in the main `for` loop even though it reverses the order of the diagonals. Simple index calculations can be used to iterate through the board in both directions at the same time, hence avoiding having to run two or three `for` loops sequentially. 

* Due to the way the board is represented we only need to check for rows containing more than one queen (not columns). It is assumed that the algorithm that solves the problem moves forward / backwards in the array, only modifying the value of the row of every queen.

* The algorithm takes into account that the default value for the N-Queens board is `-1`. That means,
`-1` is the value for a queen that hasn't been placed in index `i` by the solving algorithm yet. Upon reaching this number it will be assumed that if the conflict checker hasn't returned yet it must be because there are no conflicts, so the default option will be executed. This means that the algorithm is safe to run both _while_ looking for a solution for the board as well as when board has been finished. Remaining `n - i` cases will not be tested, but it barely affects runtime complexity anyways. 

## Implementation

An algorithm implementation in Javascript can be found in the root folder of this repository. To run it, clone the repository and run:

```
node example.js
```

You can modify the `board` variable inside of the source code to test different board configurations and sizes. 

## Analysis

* Time complexity: `O(n)`
* Space complexity: `O(n)`
