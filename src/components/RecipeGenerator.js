// Import necessary libraries and components
import React, { useState, useEffect } from 'react'; // React hooks for state management and lifecycle effects
import { useNavigate } from 'react-router-dom'; // For navigation between pages
import axios from 'axios'; // For making API requests
import Sidebar from './Sidebar'; // Sidebar component for category selection
import './styles.css'; // Custom styling

function RecipeGenerator() {
    // State hooks for managing user inputs and fetched data
    const [ingredient, setIngredient] = useState(''); // Holds the current ingredient input by the user
    const [ingredientsList, setIngredientsList] = useState([]); // List of all added ingredients
    const [recipes, setRecipes] = useState([]); // List of recipes fetched based on ingredients
    const [popularRecipes, setPopularRecipes] = useState([]); // List of preloaded popular recipes
    const navigate = useNavigate(); // React Router hook for programmatic navigation

    // Handles changes in the ingredient input box
    const handleInputChange = (event) => {
        setIngredient(event.target.value); // Update the state with the current input value
    };

    // Adds the current ingredient to the ingredients list
    const handleAddIngredient = () => {
        if (ingredient.trim() !== '') { // Prevent adding empty or whitespace-only inputs
            setIngredientsList([...ingredientsList, ingredient]); // Add the new ingredient to the list
            setIngredient(''); // Clear the input field
        }
    };

    // Removes the specified ingredient
    const handleRemoveIngredient = (index) => {
        // Remove the ingredient at the specified index
        const updatedList = ingredientsList.filter((_, i) => i !== index);
        setIngredientsList(updatedList); // Update the state with the filtered list
    };

    // Fetches recipes based on the entered ingredients
    const handleSearchClick = async () => {
        // Check if ingredients are added to the list
        if (ingredientsList.length === 0) {
            alert('Please add at least one ingredient.'); // Display an alert if no ingredients are added
            return; // Stop the function
        }

        // Clear the existing recipes before fetching new ones
        setRecipes([]);

        const query = ingredientsList.join(', '); // Combine all ingredients into a single query string
        const apiKey = 'bc68f14bb2ff4f6cae885ce96305d618'; // Spoonacular API key

        try {
            // Clear the recipes that were first loaded on homepage before clicking button "Search"
            setPopularRecipes([]);
            
            // API call to fetch recipes based on ingredients
            const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
                params: {
                    ingredients: query,
                    number: 10, // Limit results to 10 recipes
                    ranking: 1, // Prioritize recipes with maximum matching ingredients
                    ignorePantry: true, // Ignore pantry ingredients in the results
                    apiKey: apiKey
                },
            });

            if (response.data.length === 0) {
                // No recipes found
                alert('No recipes found for given ingredients. Please try different ingredients');
                setRecipes([]); // Ensure recipe list is cleared
            } else {
                // Process response to extract necessary details (title, image, id)
                const recipesWithImages = response.data.map(recipe => ({
                    id: recipe.id,
                    title: recipe.title,
                    image: recipe.image
                }));
                setRecipes(recipesWithImages); // Update state with fetched recipes
            }

        } catch (error) {
            console.error('Error fetching recipes:', error); // Log errors
            // Handle invalid API key or network errors
            alert('Unable to fetch recipes. Please check your API key or try again later.');
            setRecipes([]); // Clear existing recipes to avoid confusion
        }
    };

    // Fetches recipes based on a selected category
    const handleSelectCategory = async (type, category) => {
        try {
            // API call to fetch recipes based on a specific category (e.g., "gluten-free")
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                params: {
                    [type]: category, // Dynamic query parameter (e.g., diet type)
                    number: 10, // Limit results to 10 recipes
                    apiKey: 'bc68f14bb2ff4f6cae885ce96305d618', 
                },
            });

            // Process response to extract necessary details
            const recipesWithImages = response.data.results.map(recipe => ({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image
            }));
            setRecipes(recipesWithImages); // Update state with fetched recipes
        } catch (error) {
            console.error('Error fetching recipes:', error); // Log errors
        }
    };

    // Navigates to the recipe detail page when a recipe card is clicked
    const handleRecipeClick = (id) => {
        navigate(`/recipe/${id}`); // Use React Router to navigate to the recipe detail page
    };

    // Fetches a list of random popular recipes when the component loads
    useEffect(() => {
        const fetchPopularRecipes = async () => {
            try {
                // API call to fetch random recipes
                const response = await fetch('https://api.spoonacular.com/recipes/random?number=5&apiKey=bc68f14bb2ff4f6cae885ce96305d618');
                const data = await response.json(); // Convert response to JSON
                setPopularRecipes(data.recipes); // Update state with popular recipes
            } catch (error) {
                console.error('Error fetching random recipes:', error); // Log errors
            }
        };

        fetchPopularRecipes(); // Trigger the fetchPopularRecipes function on component load
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div className="recipe-generator-container">
            <div className="flex-container">
                {/* Sidebar for selecting recipe categories */}
                <Sidebar onSelectCategory={handleSelectCategory} />

                <div className="container mt-4">
                    {/* Cooking icon */}
                    <div className="cooking-icon">
                        <i className="fas fa-utensils"></i>
                    </div>

                    {/* App title */}
                    <h1 className="custom-heading">Welcome to the Cook With Me!</h1>
                    <h2 className="custom-heading">Search for Recipes</h2>

                    {/* Input field for entering ingredients */}
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder='Enter an ingredient'
                        style={{ width: '200px', height: '30px', fontSize: '16px', padding: '8px', borderRadius: '5px' }}
                        value={ingredient}
                        onChange={handleInputChange} // Trigger on input change
                    />

                    {/* Buttons for adding ingredients and searching recipes */}
                    <button onClick={handleAddIngredient} className="custom-button">
                        Add Ingredient
                    </button>
                    
                    <button className="custom-button" onClick={handleSearchClick}>
                        Search
                    </button>

                    {/* Display list of added ingredients */}
                    {ingredientsList.length > 0 && (
                        <div className="ingredients-box">
                            <h3 className="custom-heading">Ingredients:</h3>
                            <ul className="recipe-list">
                                {ingredientsList.map((ingredient, index) => (
                                    <li className="list-group-item" key={index}>
                                        {ingredient}
                                        <button
                                            onClick={() => handleRemoveIngredient(index)} // Remove ingredient on click
                                            className="remove-button"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Conditionally render the heading and recipes fetched from the API */}
                    <h3 className="custom-heading">
                        {recipes.length > 0 ? 'Recipes' : 'Popular Recipes'}
                    </h3>

                    <div className="row">
                        {recipes.length > 0
                            ? recipes.map((recipe, index) => (
                                <div className="col-md-4" key={index}>
                                    <div 
                                        className="card mb-4 recipe-card"
                                        onClick={() => handleRecipeClick(recipe.id)}
                                        style={{ cursor: 'pointer'}}
                                    >
                                        <img src={recipe.image} alt={recipe.title} className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="recipe-title">{recipe.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : popularRecipes.map((recipe, index) => (
                                <div className="col-md-4" key={index}>
                                    <div
                                        className="card mb-4 recipe-card"
                                        onClick={() => handleRecipeClick(recipe.id)}
                                        style={{ cursor: 'pointer'}}
                                    >
                                        <img src={recipe.image} alt={recipe.title} className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="recipe-title">{recipe.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeGenerator; // Export the component for use in other parts of the app
