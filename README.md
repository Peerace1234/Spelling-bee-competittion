# Spelling Bee Competition

A modern, interactive spelling bee competition web application with voice recognition support.

## Features

- **Voice Recognition**: Use your microphone to spell words (supports modern browsers)
- **Manual Input**: Alternative typing mode for spelling
- **Difficulty Levels**: Easy, Medium, and Hard word lists
- **Real-time Timer**: Adjustable time limits (5-120 seconds)
- **Score Tracking**: Track correct answers, streaks, and total attempts
- **History**: View all your attempts and results
- **Word Bank**: Browse all words in the current difficulty level
- **Confetti Animation**: Celebratory animation for correct answers

## Project Structure

```
.
├── index.html      # Main HTML file
├── style.css       # All styling
├── script.js       # All JavaScript logic
└── README.md       # This file
```

## How to Use

1. Open `index.html` in a modern web browser
2. Select your difficulty level (Easy, Medium, or Hard)
3. Choose input mode (Voice or Type)
4. Set the time limit in seconds
5. Click "Start Round" to begin
6. Either spell the word aloud or type it out
7. View your results and compete!

## Browser Compatibility

- Chrome/Chromium: Full support
- Firefox: Full support (type mode only)
- Safari: Full support (type mode only)
- Edge: Full support

Voice recognition is supported in Chrome, Edge, and Safari with specific language settings.

## Word Lists

- **Easy**: 15 common words suitable for beginners
- **Medium**: 15 intermediate words with standard difficulty
- **Hard**: 15 challenging words for experienced spellers

Each word includes:

- Definition
- Etymology/origin information
- Pronunciation guidance

## Scoring

- **Correct**: Word spelled correctly within the time limit
- **Streak**: Consecutive correct answers
- **Total**: Total number of words attempted

## Technologies Used

- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript
- Web Speech API for voice recognition

## Features Details

### Voice Mode

- Real-time transcription feedback
- Automatic answer submission when speaking ends
- Microphone indicator animation

### Type Mode

- Manual spelling input
- Enter key or Submit button to check
- Uppercase conversion for consistency

## Future Enhancements

- Leaderboard functionality
- Custom word lists
- Sound effects
- Difficulty progression system
- Multiplayer mode

## License

MIT License - Feel free to use and modify as needed.
