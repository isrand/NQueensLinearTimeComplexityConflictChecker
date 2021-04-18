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

#### 1) Check that every row contains only one queen.

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

#### 2) Check that primary diagonals (left to right, top to bottom, starting in the bottom left corner) only contain one queen per diagonal.

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

#### 3) Check that secondary diagonals (right to left, top to bottom, starting in the bottom right corner) only contain one queen per diagonal.

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

* Due to the way the board is represented we only need to check for rows containing more than one queen (not columns). It is assumed that the algorithm that solves the problem moves forward / backwards in the array, only modifying the value of the row of every queen (every `i`).

* The algorithm takes into account that the default value for the N-Queens board is `-1`. That means,
`-1` is the value for a queen that hasn't been placed in index `i` by the solving algorithm yet. Upon reaching this number it will be assumed that if the conflict checker hasn't returned yet it must be because there are no conflicts, so the default option will be executed. This means that the algorithm is safe to run both _while_ looking for a solution for the board as well as when board has been finished. Remaining `n - i` cases will not be tested, but it barely affects runtime complexity anyways. 

## Implementation

An algorithm implementation in pseudocode is presented to illustrate the aforementioned design (with a single `for` loop).

```
   1  |  hasConflicts (board):
   2  |
   3  |    n = board.size
   4  |    rows = [n, 0]            
   5  |    primaryDiagonals = [n * 2, 0]
   6  |    secondaryDiagonals = [n * 2, 0]
   7  |
   8  |    for i in 0 ... n:
   9  |      if board[i] != -1:
   10 |        if rows [board[i]] >= 1:
   11 |           return true
   12 |        rows [board[i]]++
   13 |
   14 |        primaryDiagonal = n + i - board[i]
   15 |
   16 |      primaryDiagonal = n + i - board[i]
   17 |
   18 |      if primaryDiagonals [primaryDiagonal] >= 1:
   19 |        return true
   20 |      primaryDiagonals [primaryDiagonal]++
   21 |
   22 |        if secondaryDiagonals [secondaryDiagonal] >= 1:
   23 |           return true
   24 |        secondaryDiagonals [secondaryDiagonal]++
   25 |
   26 |     return false
```

## Analysis

* Time complexity: `O(n)`
* Space complexity: `O(n)`