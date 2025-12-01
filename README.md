# Bobedi IT Group Website

Professional website for Bobedi IT Group - Your trusted technology partner in South Africa.

## Overview

This website showcases Bobedi IT Group's comprehensive IT services including:
- Web Development
- App Development  
- Hosting & Domain Services
- Email Solutions
- IT Tech Services & Consultation
- Cybersecurity Solutions
- Graphic Design
- AI Advisory
- Hardware & Software Solutions

## Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Service Showcase**: Comprehensive display of all IT services
- **Contact Integration**: Professional contact form and information
- **Performance Optimized**: Fast loading and SEO-friendly
- **Accessibility**: Follows web accessibility best practices

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations and responsive design
- **JavaScript (ES6+)**: Interactive functionality
- **Bootstrap 5**: Responsive framework
- **Font Awesome**: Professional icons

## Project Structure

```
Bobedi_IT_Group/
├── index.html              # Main website file
├── css/
│   └── style.css          # Custom styles
├── js/
│   └── script.js          # JavaScript functionality
├── node_modules/          # Dependencies
├── package.json           # Project configuration
└── README.md             # This file
```

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd "c:\Users\Kamono\desktop\Bobedi_IT_Group"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install development server** (if not already installed):
   ```bash
   npm install --save-dev http-server
   ```

### Running the Website

#### Development Mode (with live reload)
```bash
npm run dev
```
This will start a development server at `http://localhost:3000` with cache disabled for development.

#### Production Mode
```bash
npm start
```
This will start the server at `http://localhost:3000` and automatically open the website in your browser.

#### Alternative Server Port
```bash
npm run serve
```
This will start the server at `http://localhost:8080`.

### Manual Setup (Alternative)

If you prefer not to use npm scripts, you can:

1. Open `index.html` directly in a web browser
2. Or use any local server of your choice

## Customization

### Colors and Branding
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #f8f9fa;
    --accent-color: #28a745;
    --dark-color: #343a40;
    --light-color: #ffffff;
}
```

### Contact Information
Update the contact details in `index.html`:
- Email: `info@bobediitgroup.co.za`
- Phone: `+27 12 345 6789`
- Location: Update as needed

### Services
Modify the services section in `index.html` to add, remove, or update service offerings.

## Key Features Implementation

### Contact Form
- Client-side validation
- Professional styling
- Success/error notifications
- Service pre-selection

### Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Custom breakpoints
- Optimized images

### Performance
- Optimized CSS and JavaScript
- Compressed assets
- Smooth animations
- Fast loading times

### SEO Optimization
- Semantic HTML structure
- Meta tags (add as needed)
- Structured data ready
- Clean URLs

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+ (with some limitations)

## Deployment

### Static Hosting
This website can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Azure Static Web Apps

### Steps for Deployment
1. Ensure all files are properly linked
2. Test the website locally
3. Upload files to your hosting service
4. Configure domain settings (if needed)

## Business Insights

Based on competitor analysis (ASG.co.za), this website implements:

- **Target Market Focus**: SMEs with 10-250 employees
- **Outsourced IT Department Positioning**: Complete IT solutions provider
- **Geographic Targeting**: South African business market
- **Service Integration**: Comprehensive service packages
- **Professional Branding**: Clean, trustworthy design

## Contact & Support

For technical support or customization requests:
- Email: info@bobediitgroup.co.za
- Phone: +27 12 345 6789

## License

This project is licensed under the MIT License - see the package.json file for details.

---

**Bobedi IT Group** - Your trusted technology partner in South Africa
