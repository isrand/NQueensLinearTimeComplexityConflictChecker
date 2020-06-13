# N-Queens Linear Time Complexity Conflict Checker
1<sup>st</sup> of June, 2020
<br>Israel Nebot Dominguez
<br>v1.0

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

an algorithm to check for conflicts in linear time complexity (down from O(n<sup>2</sup>)) is presented. It achieves this speed by doing the following:

1) Checking that every row contains only one queen.

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

2) Checking that primary diagonals (left to right, top to bottom, starting in the bottom left corner) only contain one queen per diagonal.

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

3) Checking that secondary diagonals (right to left, top to bottom, starting in the bottom right corner) only contain one queen per diagonal.

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

* The function `getQueenDiagonal` returns a number from 1 to n - 1 that represents the primary diagonal where the queen is located. It does so given a queen's `(i, j)` coordinates in the board, where `i = 0 ... n` and `j = board [i]`.

* Step number 3 can be introduced in the main `for` loop even though it reverses the order of the diagonals. Simple index calculations can be used to iterate through the board in both directions at the same time, hence avoiding having to run two or three `for` loops sequentially. The only piece of code affected by this change is the function discussed in the last bullet point.

* Due to the way the board is represented we only need to check for rows containing more than one queen (not columns). It is assumed that the algorithm that solves the problem moves forward / backwards in the array, only modifying the value of the row of every queen (every `i`).

* The algorithm takes into account that the default value for the N-Queens board is `-1`. That means,
`-1` is the value for a queen that hasn't been placed in index `i` by the solving algorithm yet. Upon reaching this number it will be assumed that if the conflict checker hasn't returned yet it must be because there are no conflicts, so the default option will be executed. Remaining `n - i` cases will not be tested, but it barely affects runtime complexity anyways.

* Due to the implications of the last bullet point this algorithm is safe to run both _while_ looking for a solution for the board as well as when board has been finished.

## Implementation

An algorithm implementation in pseudocode is presented to illustrate the aforementioned design (with a single `for` loop).

```
   1  |  getQueenDiagonal (i, j):
   2  |     return n + i - j
   3  |
   4  |  hasConflicts (board):
   5  |
   6  |    n = board.size
   7  |    rows = [n, 0]            
   8  |    primaryDiagonals = [n * 2, 0]
   9  |    secondaryDiagonals = [n * 2, 0]
   10 |
   11 |    for i in 0 ... n:
   12 |      if board[i] == -1:
   13 |        break
   14 |
   15 |      if rows [board[i]] >= 1:
   16 |        return true
   17 |      rows [board[i]]++
   18 |
   19 |      primaryDiagonal = getQueenDiagonal(i, board [i])
   20 |
   21 |      if primaryDiagonals[primaryDiagonal] >= 1:
   22 |        return true
   23 |      primaryDiagonals [primaryDiagonal]++
   24 |
   25 |      secondaryDiagonal = n * 2 - getQueenDiagonal(i, board [n - i - 1])
   26 |
   27 |      if secondaryDiagonals [secondaryDiagonal] >= 1:
   28 |        return true
   29 |      secondaryDiagonals [secondaryDiagonal]++
   30 |
   31 |    return false
```

Taking the aforementioned board as an example (N-Queens(4)), the trace of the algorithm would be

| i | rows         | primaryDiagonals          | secondaryDiagonals       |
|---|--------------|---------------------------|--------------------------|
| 0 | [0, 1, 0, 0] | [0, 0, 0, 1, 0, 0, 0, 0]  | [0, 0, 0, 0, 0, 0, 1, 0] |
| 1 | [0, 1, 0, 1] | [0, 0, 1, 1, 0, 0, 0, 0]  | [0, 0, 0, 1, 0, 0, 1, 0] |
| 2 | [1, 1, 0, 1] | [0, 0, 1, 1, 0, 0, 1, 0]  | [0, 0, 0, 1, 0, 1, 1, 0] |
| 3 | [1, 1, 1, 1] | [0, 0, 1, 1, 0, 1, 1, 0]  | [0, 0, 1, 1, 0, 1, 1, 0] |
