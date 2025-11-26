
  # Christmas Advent Calendar App

A festive and interactive web-based Advent Calendar application built with React, Vite, and Tailwind CSS. This project allows users to count down the days until Christmas with daily surprises, animations, and a responsive design.

## Features

-   **Interactive Calendar Grid**: 25 unlockable days with hover effects and animations.
-   **Daily Surprises**: Click on a day to reveal a modal with content (text, images, or videos).
-   **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
-   **Festive Theme**: Custom holiday-themed styling using Tailwind CSS.
-   **Accessibility**: Built with accessibility in mind using Radix UI primitives.

## Tech Stack

-   **Framework**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/) (Icons)
-   **State Management**: React Hooks

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm (v9 or higher)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/patrick-vuong/christmas-advent-calendar-app.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd christmas-advent-calendar-app
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

Start the local development server:

```bash
npm run dev
```

Open your browser and visit `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist` directory.

## Project Structure

```
src/
├── components/     # Reusable UI components (CalendarGrid, DayCard, Modal)
├── data/           # Static data for advent calendar days
├── theme/          # Design tokens and theme configuration
├── App.tsx         # Main application component
└── main.tsx        # Entry point
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

  