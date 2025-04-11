import { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="container">
            <h1>My Travel Wishlist</h1>

            <div className="main-content">
                <div className="left-section">
                    {randomCountry && (
                        <div className="random-suggestion">
                            <h3>Suggested Destination:</h3>
                            <button onClick={getRandomCountry}>Get Another Suggestion</button>
                        </div>
                    )}

                </div>
                )
                }

                export default App