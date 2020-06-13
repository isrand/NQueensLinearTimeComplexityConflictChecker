# N-Queens Linear Time Complexity Conflict Checker
1<sup>st</sup> of June, 2020
<br>Israel Nebot Dominguez


## Algorithm summary
Given an array representing a finished N-Queens board (all numbers != -1), where:

* Index `i` of the array represents the column where the queen is found, and
* `array[i]` represents the row where the queen is found

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

an algorithm to check for conflicts in linear time complexity (down from O(n<sup>2</sup>)) is proposed. It achieves this speed by doing the following:

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

## Algorithm design

Some considerations on the design of the algorithm:

* The function `getQueenDiagonal` returns a number from 1 to n - 1 that represents the primary diagonal where the queen is located. It does so given a queen's `(i,j)` coordinates in the board, where `i = 0 ... n` and `j = board[i]`:

```
      getQueenDiagonal(i, j):
         return (n - 1) + i - j;
```

* Step number 3 can be introduced in the main `for ... in` loop even though it reverses the order of the diagonals. Simple index calculations can be used to iterate through the board in both directions at the same time, hence avoiding having to run two or three for loops sequentially.

* Due to the way the board is represented we don't need to check for columns containing more than one queen. It is assumed that the algorithm that solves the problem moves forward / backwards in the array, only modifying the value of the row of every queen.

* In its current state, the algorithm assumes a finished board as input. It would have to be redesigned to accept unfinished boards in the future (i.e, a board like `[1, 3, -1, -1]`). Thus, this algorithm can't be used _while_ solving the problem, but rather to check for the validity of its solution afterwards.

## Algorithm implementation