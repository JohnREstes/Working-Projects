const blueTile = document.querySelector('.blue-tile');
let currentPosition = 0; // Start at position 0 (top-left corner)

/**
 * Calculate the next position in the grid based on the current position.
 * @param {string} direction - 'right', 'down', 'left', 'up'
 */
function moveTile(direction) {
  const currentRow = Math.floor(currentPosition / 4);
  const currentCol = currentPosition % 4;

  if (direction === 'right' && currentCol < 3) {
    currentPosition += 1; // Move to the right
    blueTile.style.transform = `translate(${(currentPosition % 4) * 102}px, ${currentRow * 102}px)`;
  } else if (direction === 'down' && currentRow < 3) {
    currentPosition += 4; // Move down
    blueTile.style.transform = `translate(${(currentCol) * 102}px, ${Math.floor(currentPosition / 4) * 102}px)`;
  } else if (direction === 'left' && currentCol > 0) {
    currentPosition -= 1; // Move to the left
    blueTile.style.transform = `translate(${(currentPosition % 4) * 102}px, ${currentRow * 102}px)`;
  } else if (direction === 'up' && currentRow > 0) {
    currentPosition -= 4; // Move up
    blueTile.style.transform = `translate(${(currentCol) * 102}px, ${Math.floor(currentPosition / 4) * 102}px)`;
  }
}

// Event listener for arrow key presses
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      moveTile('right');
      break;
    case 'ArrowDown':
      moveTile('down');
      break;
    case 'ArrowLeft':
      moveTile('left');
      break;
    case 'ArrowUp':
      moveTile('up');
      break;
    default:
      break;
  }
});
