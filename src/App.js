import React from "react"; // Import React library
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components for navigation
import RecipeGenerator from "./components/RecipeGenerator"; // Import the RecipeGenerator component
import RecipeDetail from './components/RecipeDetail'; // Import the RecipeDetail component

function App() {
  return (
    <div 
      style={{ 
        backgroundColor: '#f9e7d7', // Light beige background for the entire app
        minHeight: '100vh', // Ensure the app takes the full height of the viewport
        margin: 0, // Remove any default margin
        padding: 0 // Remove any default padding
      }}
    >
      {/* Router provides navigation functionality */}
      <Router>
        {/* Routes define the paths and corresponding components */}
        <Routes>
          {/* Default route (homepage) renders the RecipeGenerator component */}
          <Route path="/" element={<RecipeGenerator />} />

          {/* Route for recipe details page, with dynamic ':id' parameter */}
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </Router>
    </div>
  );
}   

export default App; // Export the App component for use in the application

