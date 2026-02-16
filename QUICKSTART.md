# Quick Start Guide

Get your Open When Letters app up and running in minutes!

## First Time Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000)

3. **Login with default password:**
   ```
   password
   ```
   ⚠️ **Change this before deploying!**

## Essential Customizations (Do These First!)

### 1. Change the Login Password
**File:** `/src/App.jsx` (Line 23)
```jsx
// Change this:
const APP_PASSWORD = 'password';

// To something secure:
const APP_PASSWORD = 'yourSecretPassword123';
```

### 2. Update Recipient's Name
**File:** `/src/components/Login/Login.jsx` (Line 28)
```jsx
// Change this:
<h1 className="login-title">Open When Letters for [Her Name]</h1>

// To (example):
<h1 className="login-title">Open When Letters for Sarah</h1>
```

### 3. Update Your Name
**File:** `/src/components/LetterView/LetterView.jsx` (Line 89)
```jsx
// Change this:
<p className="signature-name">[Your Name]</p>

// To (example):
<p className="signature-name">Alex</p>
```

### 4. Personalize Letter Content
**File:** `/src/data/letters.js`
- Replace generic content with your personal memories
- Add inside jokes and specific moments
- Make each letter feel unique to your relationship

## 🎨 Optional Customizations

### Add Photos
1. Create folder: `public/images/`
2. Add photos: `photo-1.jpg` through `photo-12.jpg`
3. In `/src/data/letters.js`, set `hasPhoto: true` for letters with images

### Add Voice Notes
1. Record voice messages
2. Save as: `voice-note-1.mp3` through `voice-note-12.mp3`
3. Place in: `public/audio/`
4. In `/src/data/letters.js`, set `hasVoiceNote: true` for letters with audio

### Add Background Music
1. Add music file: `public/music/background-music.mp3`
2. The music toggle will automatically work

### Change Valentine's Day Date
**File:** `/src/data/letters.js` (Letter #12)
```jsx
unlockDate: "2027-02-14T00:00:00", // Change year or date
```

## 📦 Deployment

### Quick Deploy to Netlify (Easiest):
1. Build the app:
   ```bash
   npm run build
   ```
2. Go to [netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop the `build` folder
4. Share the URL! 💌

### Other Options:
- **Vercel:** Connect your GitHub repo for automatic deploys
- **GitHub Pages:** See [CUSTOMIZATION.md](CUSTOMIZATION.md) for setup instructions

## ✅ Pre-Deployment Checklist

Before you share the app, make sure you've:
- [ ] Changed the login password in `/src/App.jsx`
- [ ] Updated recipient's name in Login.jsx
- [ ] Updated your name in LetterView.jsx
- [ ] Personalized all 12 letter contents
- [ ] Added photos (if desired)
- [ ] Added voice notes (if desired)
- [ ] Tested on mobile and desktop
- [ ] Cleared browser storage and tested fresh experience

## 🧪 Testing Tips

1. **Clear localStorage** to test fresh experience:
   - Open DevTools (F12)
   - Go to Application/Storage tab
   - Clear Local Storage
   - Refresh page

2. **Test on mobile:**
   - Use Chrome DevTools mobile view
   - Test on actual phone if possible

3. **Try all letter types:**
   - Open a few letters
   - Test the locked Valentine's letter
   - Try the password modal (if applicable)

## 📚 Need More Help?

- **Detailed customization:** See [CUSTOMIZATION.md](CUSTOMIZATION.md)
- **Full documentation:** See [README.md](README.md)
- **Issues or questions:** Create an issue on GitHub

## 💡 Pro Tips

1. **Personalization is key** - Generic letters are just templates. Add real memories!
2. **Test thoroughly** - Make sure everything works before sharing
3. **Save backups** - Keep a copy of your customized `letters.js`
4. **Photos matter** - Personal photos make it 10x more special
5. **Don't rush** - Take time to write meaningful letters

---

**Remember:** This is for someone special. Take your time to personalize it! ❤️
