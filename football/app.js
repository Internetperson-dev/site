const apiUrl = 'https://api.football-data.org/v4/matches';
const apiKey = 'YOUR_API_KEY';  // Get an API key from a service like football-data.org

const matchList = document.getElementById('match-list');
const refreshBtn = document.getElementById('refresh-btn');

const headers = {
  'X-Auth-Token': apiKey
};

async function fetchMatches() {
  try {
    const response = await fetch(apiUrl, { headers });
    const data = await response.json();

    // Clear current match list
    matchList.innerHTML = '';

    // Check if there are matches and display them
    if (data.matches.length > 0) {
      data.matches.forEach(match => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${match.homeTeam.name} vs ${match.awayTeam.name}</strong><br>
          Status: ${match.status}<br>
          Score: ${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}
        `;
        matchList.appendChild(li);
      });
    } else {
      matchList.innerHTML = 'No ongoing matches at the moment.';
    }
  } catch (error) {
    console.error('Error fetching matches:', error);
  }
}

refreshBtn.addEventListener('click', fetchMatches);

// Initial fetch on load
fetchMatches();
