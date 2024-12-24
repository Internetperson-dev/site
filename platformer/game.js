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

// Define the levels and platforms
var levels = [
    {
        platforms: [ // Level 1 platforms
            { x: 0, y: 180, width: 400, height: 20 },
            { x: 100, y: 160, width: 100, height: 20 },
            { x: 200, y: 120, width: 100, height: 20 }
        ],
        endObject: { x: 370, y: 150, width: 20, height: 30 },
        completionURL: "https://internetperson-dev.github.io/site/platformer/3ds1.html" // URL for level 1 completion
    }
];

var currentLevel = 0; // Start with level 0
var currentLevelData = levels[currentLevel]; // Platforms and end object for the current level

// Draw player
function drawPlayer() {
    ctx.fillStyle = '#FF0000'; // Red color for the player
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw platforms
function drawPlatforms() {
    ctx.fillStyle = '#228B22'; // Green color for platforms
    for (var i = 0; i < currentLevelData.platforms.length; i++) {
        var platform = currentLevelData.platforms[i];
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

    // Handle player movement (debugging added)
    console.log('Player keys:', keys);  // Debug: Check keys status
    
    if (keys["Left"]) {
        player.x -= player.speed;
        console.log("Moving left");  // Debug: Print movement direction
    }
    if (keys["Right"]) {
        player.x += player.speed;
        console.log("Moving right");  // Debug: Print movement direction
    }
    if (keys["Up"] && player.grounded) {
        player.dy = player.jumpPower;
        console.log("Jumping");  // Debug: Print jumping action
    }
    if (keys["A"] && player.grounded) {
        player.dy = player.jumpPower; // Jump with "A" key as well
        console.log("Jumping with 'A' key"); // Debug: Print jumping with "A" key
    }

    // Check for collision with platforms
    player.grounded = false; // Reset grounded state
    for (var i = 0; i < currentLevelData.platforms.length; i++) {
        var platform = currentLevelData.platforms[i];
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
