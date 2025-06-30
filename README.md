# Product Scraper & Showcase


A demo project that combines web scraping to collect product information and a modern product showcase interface. This app allows you to extract product data, store it in a structured format, and display it with a responsive design.

## ✨ Features

- **Web Scraping**: Automated extraction of product data from configurable sources
- **REST API**: Backend with endpoints to serve product information
- **Image Gallery**: Display multiple images per product with smooth animations
- **Product Details**: Full product information (price, description, features)
- **Size Selector**: UI for selecting available sizes
- **Related Products**: Suggestions for similar products
- **Responsive Design**: Optimized for mobile and desktop

## 🛠️ Technologies Used

### Backend
- **Bun**: Fast, modern JavaScript runtime
- **Hono**: Lightweight, efficient web framework
- **TypeScript**: Static typing for robust development

### Frontend
- **React**: UI library
- **TypeScript**: Strongly typed JavaScript
- **TailwindCSS**: Utility-first CSS framework for rapid design

## 📂 Project Structure

```
imgs-example-test/
├── backend/
│   ├── data/
│   │   └── products.json     # Scraped product data
│   ├── images/               # Product images
│   └── server/
│       ├── constants.ts      # Config and constants
│       ├── data/
│       ├── middleware/
│       ├── routes/
│       ├── types/
│       └── server.ts         # Server entry point
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/             # API services
│       ├── components/      # React components
│       ├── hooks/           # Custom hooks
│       ├── types/           # Type definitions
│       ├── utils/           # Utilities
│       └── App.tsx          # Main component
```

