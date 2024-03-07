document.addEventListener('DOMContentLoaded', () => {
    const moodBoxes = document.querySelectorAll('.mood-box');
    
    moodBoxes.forEach(box => {
      box.addEventListener('click', (event) => {
        const mood = event.currentTarget.dataset.mood;
        window.location.href = `/playlists/${mood}`;
      });
    });
  });