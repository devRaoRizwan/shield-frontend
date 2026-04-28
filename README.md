# Shield House Frontend

A modern React + Vite frontend for the Shield House e-commerce platform.

## Tech Stack

- **Framework:** React 19.1.0
- **Build Tool:** Vite 6.3.5
- **Routing:** React Router DOM 7.6.2
- **UI Framework:** Material-UI (MUI) 7.0.2
- **Styling:** Emotion
- **Package Manager:** npm
- **Deployment:** Vercel

## Features

- Fast development with Vite HMR
- Modern React 19 with hooks
- Client-side routing with React Router
- Material-UI components
- Responsive design
- Environment-based API URLs

## Project Structure

```
Shield Frontend/
├── public/               # Static assets
│   └── videos/          # Video files
├── src/
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   ├── theme.js         # MUI theme configuration
│   ├── components/      # Reusable components
│   │   ├── Footer.jsx
│   │   ├── MainLayout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/         # React context
│   │   └── AdminAuthContext.jsx
│   ├── data/            # Static data
│   │   └── products.js
│   ├── lib/             # Utilities
│   │   └── api.js       # API client
│   └── pages/           # Page components
│       ├── AboutPage.jsx
│       ├── AdminDashboardPage.jsx
│       ├── AdminLoginPage.jsx
│       ├── ContactPage.jsx
│       ├── HomePage.jsx
│       ├── ProductDetailsPage.jsx
│       └── ShopPage.jsx
├── .gitignore           # Git ignore rules
├── .env.local           # Dev environment variables
├── .env.production      # Production environment variables
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## Prerequisites

- Node.js 18+ or npm 9+
- Git
- Vercel account (for deployment)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/shield-frontend.git
cd shield-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment files

**`.env.local` (for local development):**
```env
VITE_API_URL=http://localhost:8000
```

**`.env.production` (for Vercel deployment):**
```env
VITE_API_URL=https://your-api.onrender.com
```

## Development

### Start Development Server

```bash
npm run dev
```

Development server will run at: **http://localhost:5173**

Hot Module Replacement (HMR) enabled by default.

### Build for Production

```bash
npm run build
```

Creates optimized production build in `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Test production build locally.

## API Integration

### API Client (`src/lib/api.js`)

The API client automatically uses environment variables:

```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

**Development:** `http://localhost:8000`
**Production:** `https://your-api.onrender.com`

### Making API Calls

```javascript
import { fetchProducts, fetchProductById } from './lib/api';

// Fetch all products
const products = await fetchProducts();

// Fetch single product
const product = await fetchProductById(productId);
```

## Deployment on Vercel

### Prerequisites

1. Frontend code pushed to GitHub
2. Backend API running on Render
3. Vercel account (https://vercel.com)

### Step 1: Connect GitHub to Vercel

1. Log in to Vercel dashboard
2. Click **Add New** → **Project**
3. Import GitHub repository: `shield-frontend`
4. Vercel auto-detects Vite configuration

### Step 2: Configure Environment Variables

In Vercel project settings → **Environment Variables**:

Add:
```
VITE_API_URL=https://your-api.onrender.com
```

### Step 3: Deploy

1. Click **Deploy**
2. Wait for build to complete (~1-2 minutes)
3. Once deployed, get your Vercel URL: `https://your-project.vercel.app`

### Step 4: Update Backend CORS

Go to your Render dashboard and update:

```
CORS_ALLOWED_ORIGINS=https://your-project.vercel.app
```

Redeploy backend to apply changes.

## Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new dependency
npm install package-name

# Remove dependency
npm uninstall package-name

# Update all packages
npm update
```

## Environment Variables

### `.env.local` (Development)
```env
VITE_API_URL=http://localhost:8000
```

### `.env.production` (Production)
```env
VITE_API_URL=https://your-api-domain.onrender.com
```

**Note:** Vercel reads from `.env.local` in development and `.env.production` in production.

## Pages & Components

### Pages

- **HomePage.jsx** - Landing page
- **ShopPage.jsx** - Products listing
- **ProductDetailsPage.jsx** - Single product details
- **AboutPage.jsx** - About section
- **ContactPage.jsx** - Contact form
- **AdminLoginPage.jsx** - Admin authentication
- **AdminDashboardPage.jsx** - Admin panel

### Components

- **MainLayout.jsx** - Main layout wrapper with header/footer
- **Footer.jsx** - Footer component
- **ProtectedRoute.jsx** - Protected route for admin pages

### Context

- **AdminAuthContext.jsx** - Admin authentication state management

## Styling

### Material-UI Theme

Customized in `src/theme.js`:

```javascript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});
```

Use throughout components:
```javascript
import { useTheme, styled } from '@mui/material/styles';

const MyComponent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));
```

## Production Checklist

- [x] `.env.production` contains correct `VITE_API_URL`
- [x] Backend API is running on Render
- [x] CORS is configured in backend
- [x] Build passes without warnings: `npm run build`
- [x] All environment variables set in Vercel dashboard
- [x] Code pushed to GitHub
- [x] Vercel project linked to GitHub

## Troubleshooting

### API 404 or CORS Errors

1. Check `VITE_API_URL` matches backend domain
2. Verify backend `CORS_ALLOWED_ORIGINS` includes your Vercel URL
3. Check backend is running and accessible
4. Browser DevTools → Network tab → check actual requests

### Build Fails

```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run build
```

### HMR Not Working

1. Check development server is running: `npm run dev`
2. Check port 5173 is available
3. Restart dev server

### Environment Variables Not Loading

Ensure:
- Variable names start with `VITE_` 
- Accessed as `import.meta.env.VITE_VARIABLE_NAME`
- `.env` files are in project root
- Dev server restarted after changing `.env`

### Blank Page or 404 After Deployment

1. Check build output: `npm run build`
2. Verify `vite.config.js` base path if needed
3. Check Vercel deployment logs in dashboard

## Performance Tips

- Use code splitting with `React.lazy()` for pages
- Optimize images before uploading
- Use MUI's built-in responsive utilities
- Leverage Vite's fast HMR during development

## Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com)
- [Material-UI Documentation](https://mui.com)
- [Vercel Deployment](https://vercel.com/docs)

## Useful Libraries Already Installed

- **@mui/material** - MUI components
- **@mui/icons-material** - MUI icons
- **@emotion/react** - CSS-in-JS
- **@emotion/styled** - Styled components
- **react-router-dom** - Client-side routing

## Adding New Dependencies

```bash
# Install package
npm install package-name

# Install dev dependency
npm install -D package-name

# Uninstall package
npm uninstall package-name
```

## License

MIT License

## Support

If you encounter issues:

1. Check existing issues on GitHub
2. Review Vercel deployment logs
3. Consult [React](https://react.dev) and [Vite](https://vitejs.dev) documentation
4. Check [MUI documentation](https://mui.com) for component issues
