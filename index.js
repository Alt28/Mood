let currentMood = "Neutral";

    // Markov chain transition matrix
    const transitionMatrix = {
      'Happy':   { 'Happy': 0.3, 'Sad': 0.1, 'Neutral': 0.4, 'Excited': 0.15, 'Anxious': 0.05 },
      'Sad':     { 'Happy': 0.1, 'Sad': 0.4, 'Neutral': 0.3, 'Excited': 0.1, 'Anxious': 0.1  },
      'Neutral': { 'Happy': 0.2, 'Sad': 0.2, 'Neutral': 0.3, 'Excited': 0.2, 'Anxious': 0.1  },
      'Excited': { 'Happy': 0.25,'Sad': 0.05,'Neutral': 0.25,'Excited': 0.35,'Anxious': 0.1  },
      'Anxious': { 'Happy': 0.1, 'Sad': 0.2, 'Neutral': 0.2, 'Excited': 0.1, 'Anxious': 0.4  }
    };

    function updateMoodDisplay(mood) {
      currentMood = mood;
      document.getElementById('currentEmoji').textContent = getEmoji(mood);
      addHistoryItem(mood);
    }

    function getEmoji(mood) {
      const emojis = {
        'Happy': '😊',
        'Sad': '😢',
        'Neutral': '😐',
        'Excited': '🤩',
        'Anxious': '😰'
      };
      return emojis[mood];
    }

    function addHistoryItem(mood) {
      const historyList = document.getElementById('historyList');
      const li = document.createElement('li');
      li.className = 'history-item';
      li.innerHTML = `
        <div class="history-mood">
          <span class="history-emoji">${getEmoji(mood)}</span>
          ${mood}
        </div>
        <span class="history-time">${new Date().toLocaleTimeString()}</span>
      `;
      historyList.prepend(li);
      
      // Limit history to 10 items
      if (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastChild);
      }
    }

    function setMood(mood) {
      updateMoodDisplay(mood);
    }

    function simulateNextMood() {
      const transitions = transitionMatrix[currentMood];
      let random = Math.random();
      let cumulative = 0;
      for (let mood in transitions) {
        cumulative += transitions[mood];
        if (random <= cumulative) {
          setMood(mood);
          break;
        }
      }
    }

    // Initialize with the default mood
    updateMoodDisplay(currentMood);