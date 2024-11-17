# Cook With Me Web Application

## Project Overview

- This web application allows users to discover recipes by entering ingredients or filtering them by specific diets
- It gets data from an external API (Spoonacular) and displays the recipes dynamically
- The app is respondive and adapts to different screen sizes

## Features

- Search for recipes by entering ingredients
- Display recipes with details like cooking time, serving size, ingredients and instructions
- Responsive layout for mobile and desktop views
- Integrates with Spoonacular API for recipe data generation
- Interactive interface with dynamically updated content

## Technologies Used

- Frontend: React.js, HTML, CSS, Bootstrap
- Backend: Spoonacular API (external API)
- JavaScript for dynamic aspects (e.g., fetching recipe data)
- React router for navigation

## Prerequisites

- Node.js (v18.x or later recommended) installed on your system
- npm (or yarn if your prefer it)
- modern web browser (e.g., Chrome, Safari, Firefox)

## Instalation Steps

1. Clone the repository:
   git clone https://github.com/majaii/Cook-With-Me.git

2. Navigate into the project directory:
   cd cook-with-me-recipe-generator

3. Install dependencies:

   - using npm: npm install
   - using yarn: yarn install

4. Set up Enviroment Variables:

   - create a .env file in the root of the project and add the following line:
     REACT_APP_API_KEY='bc68f14bb2ff4f6cae885ce96305d618'

5. Start the development server:

   - using npm: npm start
     -using yarn: yarn start

6. If it doesn't open automatically, open your browser and visit http://localhost:3000
