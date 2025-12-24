# Software Engineer Portfolio

A modern, responsive portfolio website built with React, TailwindCSS, and Framer Motion. Features a clean, minimalist design with smooth animations and a professional layout.

## 🎨 Design Features

- **Color Scheme**: Sage green (#A8BBA4), soft white (#FAFAF7), and warm cream (#F2E8CF)
- **Typography**: Inter and Poppins fonts for clean, modern readability
- **Animations**: Smooth Framer Motion animations throughout
- **Responsive**: Fully responsive design for desktop, tablet, and mobile

## 🚀 Sections

- **Hero Section**: Animated introduction with call-to-action buttons
- **About Section**: Bio, skills showcase, and fun facts
- **Projects Section**: Grid layout with 6 featured projects
- **Experience Section**: Timeline format showing work history
- **Contact Section**: Contact form and social links
- **Navigation**: Sticky navbar with scroll highlighting
- **Footer**: Social links and back-to-top button

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **React Scripts** - Build tooling

## 📦 Installation

1. **Clone or download** this project to your local machine

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 🎯 Customization

### Personal Information
Update the following files with your information:

- **`src/components/Hero.jsx`**: Change name, title, and tagline
- **`src/components/About.jsx`**: Update bio and skills
- **`src/components/Contact.jsx`**: Update contact information
- **`src/data/projects.js`**: Replace with your projects
- **`src/data/experience.js`**: Update work experience and skills

### Styling
- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Fonts**: Update font families in `tailwind.config.js` and `public/index.html`
- **Animations**: Customize animations in individual components

### Content
- **Projects**: Edit `src/data/projects.js` to showcase your work
- **Experience**: Update `src/data/experience.js` with your career history
- **Images**: Replace placeholder images with your own project screenshots

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

## 🎨 Animation Features

- **Page Load**: Staggered entrance animations
- **Scroll Animations**: Elements animate as they come into view
- **Hover Effects**: Interactive hover states on buttons and cards
- **Smooth Scrolling**: Smooth navigation between sections
- **Back to Top**: Animated scroll-to-top button

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Configure custom domain if needed

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on push

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
3. Run: `npm run deploy`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements, consider submitting a pull request!

## 📞 Support

If you have any questions or need help customizing this portfolio, feel free to reach out!

---

**Happy coding!** 🎉
