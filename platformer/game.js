// Define key mappings for 3DS buttons, WASD, and arrow keys
var keyMap = {
    13: "A",      // 3DS "A" Button (Enter key)
    65: "A",      // "A" key on keyboard (keycode 65)
    87: "Up",     // "W" key on keyboard
    68: "Right",  // "D" key on keyboard
    83: "Down",   // "S" key on keyboard
    37: "Left",   // Left Arrow
    38: "Up",     // Up Arrow
    39: "Right",  // Right Arrow
    40: "Down"    // Down Arrow
};

var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// Player properties
var player = {
    x: 50,
    y: 150,
    width: 30,
    height: 30,
    speed: 4,
    dy: 0,
    gravity: 0.8,
    jumpPower: -12,
    grounded: false
};

// Ensure level1.js is loaded and its `levels` variable is available
var currentLevel = 0;
var currentLevelData = levels[currentLevel]; // Get level data from level1.js

// Draw player
function drawPlayer() {
    ctx.fillStyle = '#FF0000'; // Red color for the player
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw platforms
function drawPlatforms() {
    ctx.fillStyle = '#228B22'; // Green color for platforms
    var platforms = currentLevelData.platforms;
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    }
}

// Draw end object
function drawEndObject() {
    ctx.fillStyle = '#FFD700'; // Gold color for the end object
    var endObject = currentLevelData.endObject;
    ctx.fillRect(endObject.x, endObject.y, endObject.width, endObject.height);
}

// Handle key events
var keys = {};
window.addEventListener('keydown', function(e) {
    if (keyMap[e.keyCode]) keys[keyMap[e.keyCode]] = true;
});
window.addEventListener('keyup', function(e) {
    if (keyMap[e.keyCode]) keys[keyMap[e.keyCode]] = false;
});

// Update player and check collisions
function update() {
    // Apply gravity
    player.dy += player.gravity;
    player.y += player.dy;

    // Handle player movement
    if (keys["Left"]) {
        player.x -= player.speed;
    }
    if (keys["Right"]) {
        player.x += player.speed;
    }
    if (keys["Up"] && player.grounded) {
        player.dy = player.jumpPower;
    }
    if (keys["A"] && player.grounded) {
        player.dy = player.jumpPower; // Jump with "A" key as well
    }

    // Check for collision with platforms
    player.grounded = false; // Reset grounded state
    var platforms = currentLevelData.platforms;
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        // Check for collision
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height < platform.y + platform.height &&
            player.y + player.height + player.dy >= platform.y
        ) {
            player.dy = 0; // Reset vertical speed
            player.y = platform.y - player.height; // Place player on top of platform
            player.grounded = true; // Player is grounded
        }
    }

    // Prevent player from falling through the bottom
    if (player.y > canvas.height) {
        player.y = canvas.height;
        player.dy = 0;
    }

    // Check for collision with the end object
    var endObject = currentLevelData.endObject;
    if (
        player.x < endObject.x + endObject.width &&
        player.x + player.width > endObject.x &&
        player.y < endObject.y + endObject.height &&
        player.y + player.height > endObject.y
    ) {
        var completionURL = currentLevelData.completionURL; // Access the completion URL
        window.location.href = completionURL; // Redirect to the completion URL
    }

    // Check if the player has reached the end of Level 1
    if (currentLevel === 0 && player.x + player.width > canvas.width) {
        currentLevel++; // Move to Level 2
        resetLevel(); // Reset for the new level
    }

    // Keep player within canvas bounds
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    // Clear the canvas and redraw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatforms();
    drawEndObject(); // Draw the end object
    drawPlayer();
}

// Reset the current level
function resetLevel() {
    player.x = 50; // Reset player's position
    player.y = 150; // Reset player's height
    player.dy = 0; // Reset vertical speed
    currentLevelData = levels[currentLevel]; // Load the new level's platforms and endObject
}

// Start game loop at 60 FPS
setInterval(update, 1000 / 60);
