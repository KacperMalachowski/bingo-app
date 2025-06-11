# 🎯 Bingo Game

A modern, interactive bingo game built with HTML, CSS, and JavaScript. Play bingo in your browser with automatic number calling, local storage for game persistence, and beautiful responsive design.

## ✨ Features

- **Interactive 5×5 Bingo Board**: Classic bingo gameplay with B-I-N-G-O columns
- **Automatic Number Calling**: Random number generation following standard bingo rules
- **Smart Cell Marking**: Automatically marks called numbers on your card
- **Win Detection**: Automatic detection of winning patterns (rows, columns, diagonals)
- **Local Storage**: Game state and statistics are saved locally
- **Game Statistics**: Track games played, games won, and win rate
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## 🎮 How to Play

1. Click **"New Game"** to start a fresh bingo game
2. Click **"Call Number"** to draw a random number
3. Numbers on your card that match called numbers are automatically marked
4. You can also manually click cells to mark them (only if the number has been called)
5. Get 5 in a row (horizontally, vertically, or diagonally) to win!
6. The center square is always marked as "FREE"

## 🚀 GitHub Pages Deployment

This game is ready to be deployed to GitHub Pages. To deploy:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"

Your game will be available at: `https://yourusername.github.io/bingo-app/`

## 💾 Data Storage

The game uses localStorage to persist:
- **Game State**: Current game progress, called numbers, and card state
- **Statistics**: Total games played, games won, and win rate
- **Auto-Save**: Game state is automatically saved during gameplay
- **Auto-Load**: Previous game state is restored when you return

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox, grid, and animations
- **JavaScript**: Game logic, local storage, and DOM manipulation
- **Google Fonts**: Poppins font family for beautiful typography

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🎨 Customization

You can easily customize the game by modifying:
- **Colors**: Update the CSS gradient variables
- **Fonts**: Change the Google Fonts import
- **Game Rules**: Modify the JavaScript logic for different winning patterns
- **Card Size**: Adjust the grid size in both CSS and JavaScript

## 📄 License

This project is open source and available under the MIT License.
