# JoinUs - React + Vite Donation Website

A modern donation website built with React and Vite, supporting Ko-fi (PayPal) and UPI payments with social sharing capabilities.

## 🚀 Features

- ✨ Modern React + Vite architecture
- 💳 Multiple payment options (Ko-fi/PayPal, UPI with QR codes)
- 📱 Mobile UPI deep links (Google Pay, PhonePe)
- 📝 Feedback form with local storage backend
- 🔗 Social sharing (WhatsApp, Twitter, Facebook, Instagram)
- ♿ WCAG 2.1 AA accessibility compliant
- 🎨 Responsive design with smooth animations
- 📊 Admin panel for managing form submissions (`?admin=view`)

## 🛠️ Tech Stack

- **Frontend:** React 18
- **Build Tool:** Vite 5
- **Styling:** CSS3 with custom properties
- **Icons:** Font Awesome 6.4.0
- **Storage:** localStorage for form data
- **Deployment:** Vercel

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment on Vercel

### Option 1: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Via Vercel Dashboard
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "New Project"
5. Import your repository
6. Vercel will auto-detect Vite settings
7. Click "Deploy"

Your site will be live in ~60 seconds! 🎉

## 📁 Project Structure

```
JoinUs/
├── src/
│   ├── App.jsx           # Main React component
│   ├── App.css           # Styles
│   ├── main.jsx          # React entry point
│   ├── index.css         # Global styles
│   └── hooks/
│       ├── useFormHandler.js        # Form submission logic
│       ├── useScrollAnimations.js   # Scroll animations
│       └── useBackToTop.js          # Back to top button
├── public/
│   └── assets/
│       └── images/       # Images and QR codes
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── vercel.json           # Vercel deployment config
└── package.json          # Dependencies
```

## 🔐 Admin Panel

Access the admin panel to view and manage form submissions:
```
https://your-domain.com/?admin=view
```

Features:
- View all submissions with timestamps
- Reply via email directly
- Export submissions to CSV
- Delete submissions
- Track read/unread status

## 🎨 Customization

### Update UPI ID
Edit `src/App.jsx`:
```javascript
const upiId = 'your-upi-id@bank'
```

### Update Ko-fi Link
Edit `src/App.jsx`:
```javascript
href="https://ko-fi.com/your-username"
```

### Change Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  /* ... */
}
```

## 🤝 Contributing

This is a personal donation project, but feel free to fork and customize for your own use!

## 📄 License

MIT License - Feel free to use this for your own projects

## 💖 Support

If you'd like to support this project, visit: [https://ko-fi.com/joinus](https://ko-fi.com/joinus)

---

Built with ❤️ using React + Vite
