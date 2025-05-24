# Intercom Admin Panel Clone

A modern, responsive admin panel inspired by Intercom, built with React, Vite, and Tailwind CSS.

🔗 **Live Demo:** [https://ai-intercom.vercel.app](https://ai-intercom.vercel.app)

## Features

- 📊 Dashboard with analytics and charts
- 💬 Conversation management
- 👥 Customer management
- 🤖 AI assistant integration
- 🎨 Light and dark mode
- 📱 Fully responsive design
- ⚡ Fast and smooth animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/intercom-admin-clone.git
   cd intercom-admin-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Dependencies

Here are all the dependencies you need to install:

```bash
# Core dependencies
npm install react react-dom react-router-dom

# UI and styling
npm install tailwindcss postcss autoprefixer
npm install clsx tailwind-merge class-variance-authority
npm install lucide-react

# Charts
npm install recharts

# Radix UI components
npm install @radix-ui/react-avatar
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-label
npm install @radix-ui/react-select
npm install @radix-ui/react-switch
npm install @radix-ui/react-tabs
npm install @radix-ui/react-toast
npm install @radix-ui/react-separator
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── Layout.jsx      # Main layout component
│   ├── Sidebar.jsx     # Sidebar navigation
│   └── ...
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── Conversations.jsx
│   ├── Customers.jsx
│   └── ...
├── lib/                # Utility functions
│   └── utils.js
├── App.jsx             # Main application component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Customization

The color scheme and theme can be customized by modifying the CSS variables in `src/index.css`. The application uses Tailwind CSS for styling, making it easy to adjust the design.

## License

This project is open source and available under the [MIT License](LICENSE).
