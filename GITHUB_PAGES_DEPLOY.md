# 🚀 GitHub Pages Deployment Guide

Your React + Vite app is now configured for **GitHub Pages**!

## ✅ Configuration Added

1. **Vite Config Updated:**
   - Added `base: '/JoinUs/'` for correct asset paths
   - Build outputs to `dist/` folder

2. **GitHub Actions Workflow:**
   - Automatic deployment on push to main
   - Located at `.github/workflows/deploy.yml`

## 🔧 Enable GitHub Pages (One-Time Setup)

Follow these steps to enable GitHub Pages for your repository:

### Step 1: Go to Repository Settings
1. Visit: https://github.com/nandhakumar-kb/JoinUs
2. Click **"Settings"** tab (top right)

### Step 2: Enable GitHub Pages
1. Scroll down to **"Pages"** in the left sidebar
2. Click **"Pages"**

### Step 3: Configure Source
Under **"Build and deployment"**:
- **Source:** Select **"GitHub Actions"**
- That's it! Don't select "Deploy from branch"

### Step 4: Wait for Deployment
1. Go to **"Actions"** tab in your repository
2. You'll see a workflow running called **"Deploy to GitHub Pages"**
3. Wait for the green checkmark ✅ (~2-3 minutes)

### Step 5: Access Your Site
Your site will be live at:
```
https://nandhakumar-kb.github.io/JoinUs/
```

## 🎯 What Happens Now

Every time you push to the `main` branch:
1. GitHub Actions automatically triggers
2. Installs dependencies (`npm install`)
3. Builds your React app (`npm run build`)
4. Deploys to GitHub Pages
5. Your site updates in ~2-3 minutes! 🎉

## 📊 Check Deployment Status

Visit: https://github.com/nandhakumar-kb/JoinUs/actions

You'll see:
- ✅ Green check = Deployed successfully
- 🟡 Yellow dot = Currently deploying
- ❌ Red X = Failed (check logs)

## 🔄 Update Your Site

```bash
# Make changes to your code
# Then push:
git add .
git commit -m "Your changes"
git push origin main

# GitHub automatically deploys! 🚀
```

## 🆚 GitHub Pages vs Vercel

| Feature | GitHub Pages | Vercel |
|---------|-------------|--------|
| **Speed** | Good | Excellent |
| **CDN** | GitHub CDN | Edge Network |
| **Build Time** | 2-3 min | 30-60 sec |
| **Custom Domain** | Free | Free |
| **Analytics** | No | Yes (paid) |
| **Best For** | Open source | Production apps |

**You can use BOTH!** Your code works on either platform.

## 🎨 Your Live URLs

After enabling GitHub Pages:
- **GitHub Pages:** https://nandhakumar-kb.github.io/JoinUs/
- **Or deploy to Vercel:** https://vercel.com (optional)

## 🐛 Troubleshooting

### Issue: Workflow doesn't run
**Solution:** 
1. Go to Settings → Pages
2. Make sure Source is set to **"GitHub Actions"**
3. Push a new commit to trigger workflow

### Issue: 404 on assets
**Solution:** Already fixed! The `base: '/JoinUs/'` in vite.config.js handles this.

### Issue: Blank page
**Solution:** 
1. Check browser console for errors
2. Verify the workflow completed successfully
3. Clear browser cache and refresh

## ✨ Next Steps

1. **Enable GitHub Pages** (follow steps above)
2. **Wait 2-3 minutes** for first deployment
3. **Visit** https://nandhakumar-kb.github.io/JoinUs/
4. **Test all features** (payments, form, sharing)
5. **Share your URL!** 🎊

---

**Your site is ready to go live on GitHub Pages!** 🚀

Just enable it in Settings → Pages and select "GitHub Actions" as the source.
