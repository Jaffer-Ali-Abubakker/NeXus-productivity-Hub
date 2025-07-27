# NeXus Productivity Hub

A modern, secure, and feature-rich productivity web application designed to help you organize your work and personal life in one place.

## 🚀 Features

### 🔐 Secure Access
- Password-protected interface with customizable PIN
- Temporary password: `1234` (can be changed in code)
- Lock/unlock functionality

### 📝 Notes Management
- Create, edit, and organize notes
- Search functionality
- Pin important notes to dashboard
- Rich text formatting

### ✅ Task Management
- Create tasks with due dates and priorities
- Mark tasks as complete/incomplete
- Filter tasks by status (All, Active, Completed)
- Priority levels (Low, Medium, High)

### 📅 Calendar & Events
- Interactive calendar view
- Create and manage events
- Color-coded events
- Upcoming events display

### 🔗 Link Management
- Save and organize important links
- Categorize links (Work, Personal, Learning, Other)
- Search through saved links
- Quick access to frequently used resources

### 🤖 AI Assistant
- Built-in productivity assistant
- Quick suggestions and tips
- Task prioritization help
- Productivity insights and statistics

### 📱 Responsive Design
- Mobile-friendly interface
- Collapsible sidebar navigation
- Touch-optimized controls
- Modern dark theme with green accents

## 🛠️ Technologies Used

- **HTML5** - Structure and markup
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Functionality and interactivity
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome** - Icons
- **Local Storage** - Data persistence

## 📁 Project Structure

```
NeXus-productivity-Hub/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── styles.css          # Custom CSS styles
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Running the Application

#### Method 1: Direct File Opening
1. Download or clone this repository
2. Navigate to the project directory
3. Double-click on `index.html` to open in your default browser

#### Method 2: Using a Local Server (Recommended)
For the best experience, run the application using a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
# Install a simple HTTP server globally
npm install -g http-server

# Run the server
http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

### First Time Setup
1. Open the application in your browser
2. Enter the default password: `1234`
3. Click "Unlock" to access the productivity hub
4. Start creating your notes, tasks, and events!

## 🔧 Customization

### Changing the Default Password
To change the default password, edit the `script.js` file:
```javascript
const state = {
    password: '1234', // Change this to your desired password
    // ... rest of the state
};
```

### Modifying the Theme
The application uses a dark theme with green accents. You can customize the colors by modifying the Tailwind configuration in `index.html`:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    dark: '#0a0a0a',    // Background color
                    light: '#1a1a1a',   // Card background
                },
                accent: {
                    DEFAULT: '#10b981', // Primary accent color
                    dark: '#059669',    // Darker accent
                    light: '#34d399',   // Lighter accent
                }
            }
        }
    }
}
```

## 💾 Data Storage

The application uses browser's Local Storage to persist your data:
- Notes, tasks, events, and links are saved locally
- Data persists between browser sessions
- No external database or server required
- Data is private and stored only on your device

## 🔒 Security Features

- Password-protected access
- Local data storage (no external servers)
- No data transmission to third parties
- Secure password input with visual feedback

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure you're using a modern browser
3. Try clearing browser cache and local storage
4. Open an issue on the project repository

## 🎯 Roadmap

- [ ] Export/import functionality
- [ ] Cloud synchronization
- [ ] Advanced note formatting
- [ ] Task reminders
- [ ] Calendar integration with external services
- [ ] Dark/light theme toggle
- [ ] Offline functionality improvements

---

**Made with ❤️ for productivity enthusiasts**