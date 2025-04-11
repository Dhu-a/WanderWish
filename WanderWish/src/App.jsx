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
                            <div className="country-card">
                                <img src={randomCountry.flag} alt={${randomCountry.name} flag} style={{width: '50px'}} />
                                <h4>{randomCountry.name}</h4>
                                <p>Capital: {randomCountry.capital}</p>
                                <p>Currency: {randomCountry.currency} ({randomCountry.currencySymbol})</p>
                                <a href={randomCountry.maps} target="_blank" rel="noopener noreferrer">View on Maps</a>
                                <button onClick={() => {
                                    const newDestination = {
                                        id: Date.now(),
                                        country: randomCountry.name,
                                        capital: randomCountry.capital,
                                        currency: randomCountry.currency,
                                        currencySymbol: randomCountry.currencySymbol,
                                        flag: randomCountry.flag,
                                        maps: randomCountry.maps,
                                        notes: '',
                                        visited: false
                                    };
                                    setWishlist([newDestination, ...wishlist]);
                                }}>Add to Wishlist</button>
                            </div>
                            <button onClick={getRandomCountry}>Get Another Suggestion</button>
                        </div>
                    )}
                    <div className="wishlist">
                        {wishlist.map(destination => (
                        <li key={destination.id} className={destination.visited ? 'visited' : ''}>
                            <div className="destination-header">
                            <img src={destination.flag} alt={`${destination.country} flag`} style={{width: '30px'}} />
                            <h2>{destination.country}</h2>
                            </div>
                            <div className="destination-details">
                            <p>Capital: {destination.capital}</p>
                            <p>Currency: {destination.currency} ({destination.currencySymbol})</p>
                            <p>Notes: {destination.notes}</p>
                            <a href={destination.maps} target="_blank" rel="noopener noreferrer">View on Maps</a>
                            <p>{destination.visited ? 'Visited ✅' : 'Not Visited ❌'}</p>
                            </div>

                            <div className="botoes">
                            <button onClick={() => toggleVisited(destination.id)}>
                                Mark as {destination.visited ? 'Not Visited' : 'Visited'}
                            </button>
                            <button onClick={() => deleteDestination(destination.id)} className="delete">
                                Delete
                            </button>
                            </div>
                        </li>
                        ))}
                    </div>
                </div>
                )
                }

                export default App