// Import necessary libraries and components
import React, { useState, useEffect } from 'react';  // React hooks for state management and lifecycle effects
import { useParams } from 'react-router-dom'; // For accessing route parameters (e.g., recipe ID)
import axios from 'axios'; // For making API requests
import { Link } from 'react-router-dom'; // For creating a link to the home page
import '@fortawesome/fontawesome-free/css/all.min.css'; // For Font Awesome icons (used for serving size and cooking time)

function RecipeDetail() {
    // State for storing the detailed recipe information
    const [recipeDetail, setRecipeDetail] = useState(null);

    // Access the 'id' parameter from the URL (provided by React Router)
    const { id } = useParams();

    // Fetch recipe details from the API when the component loads or when the 'id' changes
    useEffect(() => {
        const fetchRecipeDetail = async () => {
            try {
                // API call to fetch detailed information about the recipe using its ID
                const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
                    params: {
                        apiKey: 'bc68f14bb2ff4f6cae885ce96305d618', // Spoonacular API key
                    }
                });
                setRecipeDetail(response.data); // Update the state with the fetched recipe details
            } catch (error) {
                console.error('Error fetching recipe details:', error); // Log any errors
            }
        };

        fetchRecipeDetail(); // Trigger the API call
    }, [id]); // Dependency array ensures this runs when 'id' changes

    // Display a loading message until the recipe data is fetched
    if (!recipeDetail) {
        return <div>Loading...</div>; // Rendered while waiting for the API response
    }

    return (
        <div className="recipe-detail">
            {/* "Cook With Me!" title box that links back to the home page */}
            <div className="home-box">
                <Link to="/" className="home-link">
                    <h1 className="page-title">Cook With Me!</h1>
                </Link>
            </div>
            
            {/* Recipe title */}
            <h2 className="recipe-title">{recipeDetail.title}</h2>

            {/* Recipe image */}
            <div className="recipe-image-container">
                <img 
                    src={recipeDetail.image} 
                    alt={recipeDetail.title} 
                    className="recipe-image-large" 
                />
            </div>

            {/* Additional recipe information: servings and cooking time */}
            <div className="recipe-info">
                <div className="serving-time-info">
                    {/* Font Awesome icons for serving size and cooking time */}
                    <div><i className="fas fa-utensils"></i> Servings: {recipeDetail.servings}</div>
                    <div><i className="far fa-clock"></i> Cooking Time: {recipeDetail.readyInMinutes} minutes</div>
                </div>
            </div>

            {/* Ingredients list */}
            <div className="recipe-box">
                <h3>Ingredients:</h3>
                <ul>
                    {recipeDetail.extendedIngredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.original} {/* Displays the original ingredient description */}
                        </li>
                    ))}
                </ul>
            </div>
           
            {/* Recipe instructions */}
            <div className="recipe-box">
                <h3>Instructions:</h3>
                {/* Render the instructions directly as HTML */}
                <div dangerouslySetInnerHTML={{ __html: recipeDetail.instructions }} />
            </div>
        </div>
    );
}

export default RecipeDetail; // Export the component for use in other parts of the app
