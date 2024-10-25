/* global.css */
body {
    margin: 0;
    overflow: hidden;  /* Prevent scrolling */
    background-color: #87CEEB; /* Sky blue background */
}

/* Game canvas styles */
#gameCanvas {
    display: block;
    margin: 0 auto; /* Center the canvas horizontally */
    background-color: #8B4513; /* Brown ground color */
}

/* Info container for displaying score and other information */
#infoContainer {
    position: absolute;
    bottom: 0; /* Position it at the bottom of the screen */
    width: 100%; /* Full width */
    background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black background */
    color: #FFFFFF; /* White text color */
    text-align: center; /* Center the text */
    font-family: Arial, sans-serif; /* Font family */
    padding: 5px; /* Padding around the text */
}

/* Player style */
.player {
    position: absolute;
    background-color: #FF0000; /* Red player color */
    width: 30px;
    height: 30px;
}

/* Platform styles */
.platform {
    position: absolute;
    background-color: #228B22; /* Green platform color */
    height: 20px;
}
