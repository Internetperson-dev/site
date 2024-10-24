function Player(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 0.5;
  this.jumpPower = -10;
  this.grounded = false;

  // Update the player's movement and position
  this.update = function(platform) {
    handleInput(this); // Handle keyboard, touch, and mouse inputs

    // Apply gravity
    this.speedY += this.gravity;

    // Update position
    this.x += this.speedX;
    this.y += this.speedY;

    // Keep player within canvas bounds
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;

    // Platform collision detection
    if (this.y + this.height > platform.y && this.x + this.width > platform.x && this.x < platform.x + platform.width) {
      this.y = platform.y - this.height;
      this.speedY = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
    }

    // Reset if the player falls off the screen
    if (this.y > canvas.height) {
      this.x = 50;
      this.y = 180;
      this.speedY = 0;
    }
  };

  // Draw the player on the canvas
  this.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}
