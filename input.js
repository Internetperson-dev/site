// Handle user input (keyboard, touch, and mouse)
var keys = { left: false, right: false, up: false };
var touchStartY = 0;
var touchStartX = 0;
var touchActive = false;
var mouseActive = false;
var mouseStartX = 0;
var mouseStartY = 0;

// Keyboard event listeners
window.addEventListener('keydown', function(e) {
  if (e.keyCode === 37) keys.left = true;   // Left arrow
  if (e.keyCode === 39) keys.right = true;  // Right arrow
  if (e.keyCode === 38) keys.up = true;     // Up arrow (jump)
});

window.addEventListener('keyup', function(e) {
  if (e.keyCode === 37) keys.left = false;
  if (e.keyCode === 39) keys.right = false;
  if (e.keyCode === 38) keys.up = false;
});

// Touch event listeners
canvas.addEventListener('touchstart', function(e) {
  var touch = e.touches[0];
  touchStartY = touch.clientY;
  touchStartX = touch.clientX;
  touchActive = true;
});

canvas.addEventListener('touchend', function(e) {
  touchActive = false;
  if (touchStartY - e.changedTouches[0].clientY > 30 && player.grounded) {
    player.speedY = player.jumpPower; // Jump on flick
    player.grounded = false;
  }
});

// Mouse event listeners
canvas.addEventListener('mousedown', function(e) {
  mouseStartX = e.clientX;
  mouseStartY = e.clientY;
  mouseActive = true;
});

canvas.addEventListener('mouseup', function(e) {
  mouseActive = false;
  if (mouseStartY - e.clientY > 30 && player.grounded) {
    player.speedY = player.jumpPower; // Jump on flick
    player.grounded = false;
  }
});

// Handle input
function handleInput(player) {
  // Keyboard input
  if (keys.left) {
    player.speedX = -2;
  } else if (keys.right) {
    player.speedX = 2;
  } else {
    player.speedX = 0;
  }

  // Touch input
  if (touchActive) {
    if (touchStartX < canvas.width / 2) {
      player.speedX = -2;
    } else if (touchStartX > canvas.width / 2) {
      player.speedX = 2;
    }
  }

  // Mouse input
  if (mouseActive) {
    if (mouseStartX < canvas.width / 2) {
      player.speedX = -2;
    } else if (mouseStartX > canvas.width / 2) {
      player.speedX = 2;
    }
  }
}
