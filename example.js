const board = [1, 3, 0, 2];

/*

        0     1     2     3
     -------------------------
  0  |     |     |  Q  |     |
     -------------------------
  1  |  Q  |     |     |     |
     -------------------------
  2  |     |     |     |  Q  |
     -------------------------
  3  |     |  Q  |     |     |
     -------------------------

*/

function hasConflicts(board) {

  const n = board.length;

  // Create needed data structures...
  const rows = Array(n).fill(0);
  const primaryDiagonals = Array(n * 2).fill(0);
  const secondaryDiagonals = Array(n * 2).fill(0);

  // O(n)
  for (let i = 0; i < n; i++) {
  
    // If a queen has been placed in index i
    if (board[i] != -1) {

      // If rows array already contains a queen in said position
      if (rows[board[i]] >= 1) {
        return true;
      }

      // Increase rows array value in this position for future checks
      rows[board[i]]++;

      // Calculate primary diagonal
      const primaryDiagonal = n + i - board[i];

      // If primary diagonals array already contains a queen in said position
      if (primaryDiagonals[primaryDiagonal] >= 1) {
        return true;
      }

      // Increase primary diagonals array value in this position for future checks
      primaryDiagonals[primaryDiagonal]++;

      // Calculate secondary diagonal with some twisted math I figured out at 2AM
      const secondaryDiagonal = (n * 2 - 1) - (i + board[i]);

      // If secondary diagonals array already contains a queen in said position
      if (secondaryDiagonals[secondaryDiagonal] >= 1) {
        return true;
      }

      // Increase secondary diagonals array value in this position for future checks
      secondaryDiagonals[secondaryDiagonal]++;

    } else {

      // Defaulting to false as we found a -1 and no conflicts so far
      break;
    }
  }

  // Natural end of loop or broken loop: no conflicts found
  return false;
}

console.log(hasConflicts(board));
