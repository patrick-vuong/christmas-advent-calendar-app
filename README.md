# 🎄 Christmas Advent Calendar App

An interactive holiday advent calendar web application that reveals a heartwarming 24-day comic story about Santa's adventure with AI. Each day from December 1st to 24th, users can open a new "door" to discover a chapter of "Deep Sleigh Learning - A Holiday Model."

## ✨ Features

- **Interactive Advent Calendar**: A beautifully designed 24-box calendar grid with festive animations
- **Daily Comic Unlocking**: New story chapters unlock each day throughout December 2025
- **Animated Snowfall**: Realistic falling snowflakes create an immersive winter atmosphere
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Comic Panel Modal**: Engaging popup panels display story chapters with illustrations
- **Visual Indicators**: "Today" badge highlights the current day, locked days are grayed out
- **Festive UI**: Holiday-themed gradients, colors, and decorative elements

## 📖 The Story

"Deep Sleigh Learning - A Holiday Model" is a fun, family-friendly comic story about collaboration between humans and AI. Follow Santa as he faces a Christmas crisis when his Naughty-or-Nice database crashes, leading him to discover the power of AI assistance—and the importance of human touch in making magic happen.

The 24-chapter story explores themes of:
- 🤖 Human-AI collaboration
- ❤️ The importance of kindness and creativity
- 🎁 Holiday spirit and teamwork
- ✨ Finding solutions through innovation

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) 18.3
- **Build Tool**: [Vite](https://vitejs.dev/) 6.3
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives with [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Additional Libraries**:
  - `class-variance-authority` - For component variants
  - `clsx` & `tailwind-merge` - Utility class management

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/patrick-vuong/christmas-advent-calendar-app.git
   cd christmas-advent-calendar-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `build` directory.

## 📁 Project Structure

```
christmas-advent-calendar-app/
├── src/
│   ├── components/
│   │   ├── CalendarBox.tsx      # Individual calendar day box component
│   │   ├── ComicPanel.tsx       # Story chapter modal popup
│   │   ├── figma/               # Figma-generated components
│   │   │   └── ImageWithFallback.tsx
│   │   └── ui/                  # shadcn/ui components library
│   ├── data/
│   │   └── storyData.ts         # 24-day story content and illustrations
│   ├── styles/
│   │   └── globals.css          # Global styles and CSS variables
│   ├── guidelines/              # Development guidelines
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   ├── index.css                # Tailwind CSS configuration
│   └── Attributions.md          # Third-party attributions
├── index.html                   # HTML entry point
├── vite.config.ts               # Vite configuration
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## 🎨 Key Components

### CalendarBox
Individual calendar day boxes that display:
- Day number (1-24)
- Lock/star icon indicating availability
- Gift icon on hover for unlocked days
- "TODAY!" badge for the current day
- Hover animations and visual feedback

### ComicPanel
Modal popup that shows:
- Date badge (December X, 2025)
- Story illustration (emoji-based)
- Chapter title
- Story content in a speech bubble
- Decorative holiday borders

## 🔧 Configuration

The app is configured to unlock days based on the December 2025 calendar. For demo purposes, all 24 days are currently unlocked. To enable date-based unlocking, modify the `getCurrentDay()` function in `src/App.tsx`.

## 📄 License & Attributions

This project includes:
- Components from [shadcn/ui](https://ui.shadcn.com/) used under [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)
- Photos from [Unsplash](https://unsplash.com) used under [Unsplash license](https://unsplash.com/license)

## 🔗 Links

- **Original Figma Design**: [Christmas Advent Calendar App](https://www.figma.com/design/GAvxQC9IXkT5LWlE55M0JL/Christmas-Advent-Calendar-App--Copy-)

---

Made with ❤️ for the holiday season 🎅🎄