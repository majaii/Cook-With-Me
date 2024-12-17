import React from 'react';

// Sidebar component that displays recipe categories
function Sidebar({ onSelectCategory }) {
    // Array of diet types (e.g., gluten-free, vegetarian) and meal types (e.g., breakfast, dessert)
    const categories = ['Gluten-Free', 'Vegetarian', 'Vegan', 'Pescetarian', 'Ketogenic']; // Diet types
    const courses = ['Main-Course', 'Breakfast', 'Side-Dish', 'Dessert', 'Salad']; // Meal types

    return (
        <div className="sidebar"> {/* Container for the sidebar */}
            <h3>Recipe Categories</h3> {/* Sidebar title */}
            
            {/* List of diet types */}
            <h4>Diet Types</h4>
            <ul>
                {categories.map((category) => ( // Iterate over diet types
                    <li 
                        key={category} // Unique key for each list item
                        onClick={() => onSelectCategory('diet', category)} // Pass the selected category to the parent function
                    >
                        {category} {/* Display category name */}
                    </li>
                ))}
            </ul>
            
            {/* List of meal types */}
            <h4>Meal Types</h4>
            <ul>
                {courses.map((course) => ( // Iterate over meal types
                    <li 
                        key={course} // Unique key for each list item
                        onClick={() => onSelectCategory('type', course)} // Pass the selected course to the parent function
                    >
                        {course} {/* Display course name */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar; // Export the Sidebar component
