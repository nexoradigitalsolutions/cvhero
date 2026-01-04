# CVHero

A modern, feature-rich CV/Resume builder application built with Next.js and TypeScript. Create, customize, and export professional resumes with AI-powered enhancements and a seamless user experience.

## Features

- **Create & Edit CVs** - Intuitive forms for personal info, education, experience, projects, and skills
- **AI Enhancement** - AI-powered suggestions to improve your CV content
- **Import/Export** - Import existing CVs and export to multiple formats (PDF, JSON)
- **Live Preview** - Real-time preview of your CV as you build it
- **PDF Export** - Generate professional PDF versions of your CV
- **Progressive Web App** - Works offline with PWA support
- **Sample Data** - Quick-start with sample CV data
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 15+
- **Language**: TypeScript
- **Styling**: CSS with PostCSS
- **State Management**: Custom store
- **AI Integration**: OpenAI API for content enhancement
- **PWA**: Service worker for offline support

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Build

Build for production:

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                 # App layout and pages
├── components/          # React components
│   ├── CVImportExport   # Import/export functionality
│   ├── CVPreview        # CV preview component
│   ├── Forms            # Form components for CV sections
│   ├── PWARegister      # PWA registration
│   └── SampleDataButton # Sample data loader
├── lib/                 # Utility libraries
│   ├── aiService        # AI enhancement service
│   ├── cvImportExport   # Import/export logic
│   ├── pdfExport        # PDF generation
│   └── store            # State management
└── types/               # TypeScript type definitions
```

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

## License

This project is open source and available under the MIT License.
