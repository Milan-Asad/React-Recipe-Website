import React, { useState, useEffect } from 'react';
import Header from './Header'; // Import Header component from the same directory

export default function App() {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=c54ba6b8202141d69cd028ce39a0e087&query=${searchQuery}`);
            const data = await response.json();
            setRecipes(data.results);
        } catch (error) {
            console.error('Error searching for recipes:', error);
        }
    };

    return (
        <div className="master-wrapper">
            <Header />
            <div className="search-container">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search for recipes"
                        className="search-bar"
                    />
                </form>
            </div>
            <div className="daily-picks-text">
                <p>Daily Picks:</p>
            </div>

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
