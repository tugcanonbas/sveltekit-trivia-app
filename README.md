# SvelteKit Trivia App

Welcome to the SvelteKit Trivia App! This project showcases my skills in frontend development using SvelteKit, a modern framework for building fast and scalable web applications.

# Check the live version [here](https://sveltekit-trivia-app-tgcn.vercel.app/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Interactive trivia game with multiple categories
- Responsive design for optimal user experience on all devices
- State management using Svelte stores
- API integration to fetch trivia questions

## Technologies Used

- **SvelteKit**: Framework for building web applications
- **TypeScript**: Programming language used for development
- **Tailwind CSS**: Utility-first CSS framework for styling
- **ESLint**: Linting tool for code quality
- **Prettier**: Code formatter

## Setup and Installation

To get started with the project, follow these steps:

1. **Clone and navigate to the project directory:**
    ```bash
    git clone https://github.com/tugcanonbas/sveltekit-trivia-app.git
    cd sveltekit-trivia-app
    ```

2. **Set the adapter to `node` in `svelte.config.js`:**
    ```javascript
    import adapter from '@sveltejs/adapter-node';
    ```
    
3. **Update the dependencies in `package.json`:**
    ```json
    "devDependencies": {
        "@sveltejs/adapter-node": "^5.0.1",
        "@sveltejs/kit": "^2.0.0",
    }
    ```

4. **Install dependencies:**
    ```bash
    npm install
    ```

5. **Run the development server:**
    ```bash
    npm run dev
    ```

6. **Build for production:**
    ```bash
    npm run build
    ```
7. **Run the production build:**
    ```bash
    npm run preview
    ```

## Usage

Once the development server is running, you can access the app at `http://localhost:4173`. Navigate through different categories and difficulty levels to play the trivia game.

## Special Thanks

 **Can Güner**: My friend who helped me to design the app and gave feedbacks. You can check his [LinkedIn](https://www.linkedin.com/in/can-guner/) profile.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
