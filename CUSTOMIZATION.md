# Customization Guide

This guide will walk you through personalizing the Open When Letters app for your loved one.

## IMPORTANT: Update Names First!

Before anything else, replace the placeholder names with real ones in these files:

### 1. **Login Screen** - `/src/components/Login/Login.jsx`
**Line 28:** Change the title to include the recipient's name
```jsx
// Find this line:
<h1 className="login-title">Open When Letters for [Her Name]</h1>

// Change to (example):
<h1 className="login-title">Open When Letters for Sarah</h1>
```

### 2. **Letter Signature** - `/src/components/LetterView/LetterView.jsx`
**Line 89:** Change the signature to your name
```jsx
// Find this line:
<p className="signature-name">[Your Name]</p>

// Change to (example):
<p className="signature-name">Alex</p>
```

### 3. **Letter Content** - `/src/data/letters.js`
Update any remaining placeholders in the letter content with personal details, names, or specific memories.

### 4. **Change the Login Password** - `/src/App.jsx`
**Line 23:** Change the default password
```jsx
// Find this line:
const APP_PASSWORD = 'password';

// Change to something more secure:
const APP_PASSWORD = 'yourSecretPassword123';
```

**⚠️ IMPORTANT:** The default password is `password`

---

## Step 1: Personalize the Letter Content

Edit `/src/data/letters.js`

The app comes with 12 generic letter templates. Make them personal by:

### Adding Personal Details:
- Replace generic phrases with specific memories
- Add inside jokes that are unique to your relationship
- Include specific dates, locations, or events you shared
- Mention things you love about them
- Reference shared experiences

### Example:
```javascript
// Generic template:
content: `Hey there,

I hope this letter finds you and makes you smile today.

Think about that time we laughed so hard we couldn't breathe...`

// Personalized version:
content: `Hey Sarah,

I hope this letter finds you and makes you smile today.

Remember when we got lost trying to find that pizza place and ended up at the beach instead? We laughed so hard...`
```

### Tips:
- Be specific - mention actual moments, not generic situations
- Use their nicknames or pet names
- Reference things only the two of you would understand
- Make each letter feel unique and personal

## Step 2: Set the Valentine's Day Unlock Date

In `/src/data/letters.js`, find letter #12:

```javascript
{
  id: 12,
  title: "Opens on Valentine's Night",
  category: "locked",
  isLocked: true,
  unlockDate: "2027-02-14T00:00:00", // Valentine's Day 2027
```

Change the date to the year you want it to unlock (or any special date):
```javascript
unlockDate: "2028-02-14T00:00:00", // Valentine's Day 2028
// or
unlockDate: "2027-12-25T00:00:00", // Christmas 2027
```

**Note:** The letter will automatically unlock on that date. Before then, it will show as locked.

## Step 3: Add Your Photos

1. Go to photo folder: `/public/images/`
2. Add 12 photos named: `photo-1.jpg` through `photo-12.jpg`
3. Or update the paths in `/src/data/letters.js`:

```javascript
imagePrompt: "/images/my-custom-photo.jpg"
```

## Step 4: Add Voice Notes (Optional)

1. Record 12 voice messages
2. Save as: `voice-note-1.mp3` through `voice-note-12.mp3`
3. Place in `/public/audio/`
4. Update `/src/components/LetterView/LetterView.jsx`:

```javascript
const handleVoiceNote = () => {
  const audio = new Audio(`/audio/voice-note-${letter.id}.mp3`);
  audio.play();
};
```

## Step 5: Add Background Music (Optional)

1. Add a music file: `/public/music/background-music.mp3`
2. Update `/src/App.jsx`:

```javascript
const toggleMusic = () => {
  const audio = new Audio('/music/background-music.mp3');
  if (!musicPlaying) {
    audio.play();
    audio.loop = true;
  } else {
    audio.pause();
  }
  setMusicPlaying(!musicPlaying);
};
```

## Step 6: Customize Colors (Optional)

Edit the CSS files in `/src/components/` to change:
- Background colors
- Button colors
- Text colors
- Font styles

### Main color scheme locations:
- `/src/App.css` - Main background
- `/src/components/LetterView/LetterView.css` - Letter paper style
- `/src/components/LetterCard/LetterCard.css` - Card colors

## Step 7: Test Everything

1. Run the development server:
```bash
npm start
```

2. Test each letter
3. Check all photos load
4. Try the password-protected letter
5. Check on mobile device

## Step 8: Build for Production

When everything looks perfect:

```bash
npm run build
```

## Step 9: Deploy

### Option 1: Netlify (Easiest)
1. Sign up at netlify.com
2. Drag and drop the `build` folder
3. Get your custom URL
4. Share it with her!

### Option 2: Vercel
1. Sign up at vercel.com
2. Connect your GitHub repository
3. Deploy with one click

### Option 3: GitHub Pages
1. Install gh-pages: `npm install gh-pages --save-dev`
2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/open-when-letters",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
3. Run: `npm run deploy`

## Tips

1. **Test on phone** - Make sure it looks good on mobile
2. **Clear localStorage** - Test the experience fresh: Clear browser data or use incognito mode
3. **Double-check spelling** - Check for typos!
4. **Add more letters** - You can easily add more by copying the structure in `letters.js`

## 🔧 Troubleshooting

**Letters not saving:** Check browser localStorage settings
**Images not loading:** Verify file paths match exactly
**Can't log in:** The default password is `password` (make sure to change it in `/src/App.jsx` line 23)
**Password not working:** Check for spaces or typos in your custom password

---

## 📝 Quick Reference: All Files to Customize

Before deploying, make sure you've updated these files:

1. **`/src/App.jsx`** (Line 23)
   - **Change the default password** from `'password'` to something secure

2. **`/src/components/Login/Login.jsx`** (Line 28)
   - Update `[Her Name]` with recipient's name

3. **`/src/components/LetterView/LetterView.jsx`** (Line 89)
   - Update `[Your Name]` with your name

4. **`/src/data/letters.js`**
   - Personalize all 12 letter contents with your own memories
   - Update `unlockDate` for the Valentine's letter (if needed)
   - Set `hasVoiceNote: true` for letters with audio
   - Set `hasPhoto: true` for letters with images

5. **`/public/images/`**
   - Add photos: `photo-1.jpg` through `photo-12.jpg`

6. **`/public/audio/`** (Optional)
   - Add voice notes: `voice-note-1.mp3` through `voice-note-12.mp3`

7. **`/public/music/`** (Optional)
   - Add background music file

---

Need help? Check the README.md or create an issue on GitHub.

Made with ❤️ for someone special.
