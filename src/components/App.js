import React, { useState, useEffect } from 'react';
import Header from './Header';
import { fetchRandomRecipes, searchRecipes, fetchRecipesByCuisine } from './RecipeService'; // Import functions from Recipe Service

export default function App() {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [italianSelected, setItalianSelected] = useState(false);
    const [americanSelected, setAmericanSelected] = useState(false);
    const [indianSelected, setIndianSelected] = useState(false);
    const [thaiSelected, setThaiSelected] = useState(false);
    const [mexicanSelected, setMexicanSelected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const recipes = await fetchRandomRecipes(); // Fetch random recipes initially
            setRecipes(recipes);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            const results = await searchRecipes(searchQuery); // Search for recipes based on the query
            setRecipes(results);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleNationalityClick = async (nationality) => {
        try {
            let recipes;
            // Toggle the selected state of the cuisine
            if (nationality === 'italian') {
                if (!italianSelected) {
                    recipes = await fetchRecipesByCuisine('italian');
                    setItalianSelected(true);
                    setAmericanSelected(false);
                    setIndianSelected(false);
                    setThaiSelected(false);
                    setMexicanSelected(false);
                } else {
                    recipes = await fetchRandomRecipes();
                    setItalianSelected(false);
                }
            } else if (nationality === 'american') {
                if (!americanSelected) {
                    recipes = await fetchRecipesByCuisine('american');
                    setAmericanSelected(true);
                    setItalianSelected(false);
                    setIndianSelected(false);
                    setThaiSelected(false);
                    setMexicanSelected(false);
                } else {
                    recipes = await fetchRandomRecipes();
                    setAmericanSelected(false);
                }
            } else if (nationality === 'indian') {
                if (!indianSelected) {
                    recipes = await fetchRecipesByCuisine('indian');
                    setIndianSelected(true);
                    setItalianSelected(false);
                    setAmericanSelected(false);
                    setThaiSelected(false);
                    setMexicanSelected(false);
                } else {
                    recipes = await fetchRandomRecipes();
                    setIndianSelected(false);
                }
            } else if (nationality === 'thai') {
                if (!thaiSelected) {
                    recipes = await fetchRecipesByCuisine('thai');
                    setThaiSelected(true);
                    setItalianSelected(false);
                    setAmericanSelected(false);
                    setIndianSelected(false);
                    setMexicanSelected(false);
                } else {
                    recipes = await fetchRandomRecipes();
                    setThaiSelected(false);
                }
            } else if (nationality === 'mexican') {
                if (!mexicanSelected) {
                    recipes = await fetchRecipesByCuisine('mexican');
                    setMexicanSelected(true);
                    setItalianSelected(false);
                    setAmericanSelected(false);
                    setIndianSelected(false);
                    setThaiSelected(false);
                } else {
                    recipes = await fetchRandomRecipes();
                    setMexicanSelected(false);
                }
            }
            setRecipes(recipes);
        } catch (error) {
            setError(error.message);
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

            <div className="button-container">
                <button
                    className={`button-italian${italianSelected ? ' selected' : ''}`} 
                    onClick={() => handleNationalityClick('italian')}
                >
                    ITALIAN
                </button>
                <button
                    className={`button-american${americanSelected ? ' selected' : ''}`} 
                    onClick={() => handleNationalityClick('american')}
                >
                    AMERICAN
                </button>
                <button
                    className={`button-indian${indianSelected ? ' selected' : ''}`}
                    onClick={() => handleNationalityClick('indian')}
                >
                    INDIAN
                </button>
                <button
                    className={`button-thai${thaiSelected ? ' selected' : ''}`} 
                    onClick={() => handleNationalityClick('thai')}
                >
                    THAI
                </button>
                <button
                    className={`button-mexican${mexicanSelected ? ' selected' : ''}`} 
                    onClick={() => handleNationalityClick('mexican')}
                >
                    MEXICAN
                </button>
            </div>

            <div className="daily-picks-text">
                <p>Daily Picks:</p>
            </div>

            {error ? ( // Render error message if there's an error
                <div className="error-message">{error}</div>
            ) : (
                <div className="recipe-cards-wrapper">
                    {recipes && recipes.length > 0 ? (
                        recipes.map(recipe => (
                            <div key={recipe.id} className="recipe-card" onClick={() => window.open(recipe.sourceUrl, "_blank")} role="button">
                                <img src={recipe.image} alt={recipe.title} />
                                <div className="card-content">
                                    <h3>{recipe.title}</h3>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No recipes found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
