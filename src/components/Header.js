import React, { useState } from 'react';
import '../style.css'; 
import lightmodeIcon from '../images/lightmodeicon.png'; // Import light mode icon
import graymodeIcon from '../images/graymodeicon.png'; // Import gray mode icon
import darkmodeIcon from '../images/darkmodeicon.png'; // Import dark mode icon

export default function Header() {
    const [modeIndex, setModeIndex] = useState(0); // State to track mode index

    const modes = [
        { backgroundColor: 'rgb(255, 255, 255)', icon: lightmodeIcon }, // Light mode
        { backgroundColor: 'rgb(32, 32, 32)', icon: graymodeIcon }, // Dark mode
        { backgroundColor: 'rgb(0, 0, 0)', icon: darkmodeIcon } // Black mode
    ];

    const toggleMode = () => {
        setModeIndex(prevIndex => (prevIndex + 1) % modes.length); // Cycle through modes
        document.body.style.backgroundColor = modes[(modeIndex + 1) % modes.length].backgroundColor;
    };

    return (
        <header className="header">
            <h2 className="header--title">THE RECIPE HUB</h2>
            <img
                src={modes[modeIndex].icon} // Use the icon based on current mode
                alt="Mode Icon"
                className="header--icon"
                style={{ width: '50px', height: '50px', marginRight: '100px', cursor: 'pointer' }}
                onClick={toggleMode} // Toggle mode on image click
            />
        </header>
    );
}


// <h3 className="header--project">Daily recipes for you to choose from</h3>



// NOTES:

// https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Recipe-App.md

// https://www.themealdb.com/api.php