import React, { useState, useEffect } from 'react';
import Header from './Header'; // Import Header component from the same directory

export default function App() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=c54ba6b8202141d69cd028ce39a0e087&number=5`);

            const data = await response.json();
            setRecipes(data.recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    return (
        <div className="master-wrapper">
            <Header />
            <div className="recipe-cards-wrapper">
                {recipes.map(recipe => (
                    <a key={recipe.id} className="recipe-card" href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <img src={recipe.image} alt={recipe.title} />
                        <div className="card-content">
                            <h3>{recipe.title}</h3>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
