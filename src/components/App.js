import React, { useState, useEffect } from 'react';
import Header from './Header'; // Import Header component from the same directory

export default function App() {
    const [recipes, setRecipes] = useState([]); // Initialize with an empty array
    const [searchQuery, setSearchQuery] = useState('');
    const [italianSelected, setItalianSelected] = useState(false); // State to track if Italian button is selected
    const [americanSelected, setAmericanSelected] = useState(false); // State to track if American button is selected
    const [indianSelected, setIndianSelected] = useState(false); // State to track if American button is selected
    const [thaiSelected, setThaiSelected] = useState(false); // State to track if American button is selected



    const [error, setError] = useState(null); // State to track API errors

    const apiKey = 'c54ba6b8202141d69cd028ce39a0e087';

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=5`);
            const data = await response.json();
            setRecipes(data.recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setError('Error fetching recipes. Please try again later.'); // Set error message
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}`);
            const data = await response.json();
            setRecipes(data.results);
        } catch (error) {
            console.error('Error searching for recipes:', error);
            setError('Error searching for recipes. Please try again later.'); // Set error message
        }
    };

    // 
    const handleNationalityClick = async (nationality) => {
        try {
            let url;
            if (nationality === 'italian' && !italianSelected) {
                url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${nationality}`;
                setItalianSelected(true); // Toggle Italian button
                setAmericanSelected(false); // Deselect American button if it's selected
                setIndianSelected(false);
                setThaiSelected(false);
            } else if (nationality === 'american' && !americanSelected) {
                url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${nationality}`;
                setAmericanSelected(true); 
                setItalianSelected(false); 
                setIndianSelected(false);
                setThaiSelected(false);
            } else if (nationality === 'indian' && !indianSelected) {
                url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${nationality}`;
                setIndianSelected(true);
                setAmericanSelected(false); 
                setItalianSelected(false); 
                setThaiSelected(false);         
                
            } else if (nationality === 'thai' && !thaiSelected) {
                url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${nationality}`;
                setThaiSelected(true);    
                setIndianSelected(false);
                setAmericanSelected(false); 
                setItalianSelected(false); 
                     
                
            }
            
            else {
                url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=5`;
                setItalianSelected(false); // Deselect Italian button
                setAmericanSelected(false); // Deselect American button
                setIndianSelected(false);
                setThaiSelected(false);         

            }
            const response = await fetch(url);
            const data = await response.json();
            setRecipes(data.recipes || data.results);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setError('Error fetching recipes. Please try again later.'); // Set error message
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
        className={`button-italian${italianSelected ? ' selected' : ''}`} // Apply 'selected' class if Italian button is selected
        onClick={() => handleNationalityClick('italian')}
    >
        ITALIAN
    </button>
    <button
        className={`button-american${americanSelected ? ' selected' : ''}`} // Apply 'selected' class if American button is selected
        onClick={() => handleNationalityClick('american')}
    >
        AMERICAN
    </button>
    <button
        className={`button-indian${indianSelected ? ' selected' : ''}`} // Apply 'selected' class if American button is selected
        onClick={() => handleNationalityClick('indian')}
    >
        INDIAN
    </button>
    <button
        className={`button-thai${thaiSelected ? ' selected' : ''}`} // Apply 'selected' class if American button is selected
        onClick={() => handleNationalityClick('thai')}
    >
        THAI
    </button>
    
</div>


            <div className="daily-picks-text">
                <p>Daily Picks:</p>
            </div>

            {error ? ( // Render error message if there's an error
                <div className="error-message">{error}</div>
            ) : (
                <div className="recipe-cards-wrapper">
                    {recipes.length > 0 ? (
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
