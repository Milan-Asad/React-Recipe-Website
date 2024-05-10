const apiKey = 'c54ba6b8202141d69cd028ce39a0e087';

export const fetchRandomRecipes = async () => {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=5`);
        const data = await response.json();
        return data.recipes || []; // Return an empty array if recipes are not found
    } catch (error) {
        console.error('Error fetching random recipes:', error);
        throw new Error('Error fetching random recipes. Please try again later.');
    }
};

export const searchRecipes = async (query) => {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`);
        const data = await response.json();
        return data.results || []; // Return an empty array if recipes are not found
    } catch (error) {
        console.error('Error searching for recipes:', error);
        throw new Error('Error searching for recipes. Please try again later.');
    }
};

export const fetchRecipesByCuisine = async (cuisine) => {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${cuisine}`);
        const data = await response.json();
        return data.results || []; // Return an empty array if recipes are not found
    } catch (error) {
        console.error(`Error fetching ${cuisine} recipes:`, error);
        throw new Error(`Error fetching ${cuisine} recipes. Please try again later.`);
    }
};
