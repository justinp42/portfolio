# Deployment Guide

## Prerequisites

Before deploying this portfolio, make sure you have:

1. **Node.js** (version 14 or higher) - Download from [nodejs.org](https://nodejs.org/)
2. **npm** (comes with Node.js) or **yarn**

## Local Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Deployment Options

### Option 1: Netlify (Recommended)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `build` folder
   - Or connect your GitHub repository for automatic deployments

3. **Custom domain** (optional):
   - Add your custom domain in Netlify settings
   - Configure DNS records as instructed

### Option 2: Vercel

1. **Connect GitHub repository**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a React app

2. **Deploy**:
   - Vercel will automatically build and deploy
   - Updates will deploy automatically on git push

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   "homepage": "https://yourusername.github.io/portfolio-website",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

### Option 4: Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```

3. **Build and deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

## Environment Variables

If you need environment variables (for contact form, analytics, etc.):

1. **Create `.env` file** in the root directory:
   ```
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```

2. **Use in components**:
   ```javascript
   const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
   ```

## Customization Before Deployment

1. **Update personal information**:
   - Name, title, bio in components
   - Contact information
   - Social media links
   - Project data

2. **Replace placeholder images**:
   - Add your own project screenshots
   - Update profile image
   - Optimize images for web

3. **Configure contact form**:
   - Set up EmailJS or similar service
   - Update form submission logic
   - Test form functionality

4. **SEO optimization**:
   - Update meta tags in `public/index.html`
   - Add Open Graph tags
   - Configure sitemap

## Performance Optimization

1. **Image optimization**:
   - Use WebP format when possible
   - Compress images
   - Use appropriate sizes

2. **Code splitting**:
   - Already configured with React
   - Consider lazy loading for heavy components

3. **Caching**:
   - Configure proper cache headers
   - Use CDN for static assets

## Analytics and Monitoring

1. **Google Analytics**:
   - Add tracking code to `public/index.html`
   - Configure goals and events

2. **Error monitoring**:
   - Consider Sentry for error tracking
   - Monitor performance metrics

## Security Considerations

1. **Environment variables**:
   - Never commit sensitive data
   - Use proper environment variable management

2. **Contact form**:
   - Implement proper validation
   - Use rate limiting
   - Sanitize inputs

## Troubleshooting

### Common Issues:

1. **Build fails**:
   - Check for syntax errors
   - Ensure all dependencies are installed
   - Clear node_modules and reinstall

2. **Images not loading**:
   - Check file paths
   - Ensure images are in public folder
   - Verify image formats are supported

3. **Animations not working**:
   - Check Framer Motion installation
   - Verify component imports
   - Test in different browsers

### Support:

If you encounter issues:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Test in different browsers
4. Check network connectivity for external resources

---

**Happy deploying!** 🚀
