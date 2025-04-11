import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [wishlist, setWishlist] = useState([])
  const [formData, setFormData] = useState({
    country: '',
    capital: '',
    currency: '',
    currencySymbol: '',
    flag: '',
    maps: '',
    notes: '',
  })
  const [randomCountry, setRandomCountry] = useState(null)

  // List of country codes for random suggestions
  const countryCodes = [
    'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ',
    'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS',
    'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN',
    'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE',
    'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF',
    'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM',
    'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM',
    'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC',
    'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK',
    'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA',
    'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG',
    'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW',
    'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS',
    'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO',
    'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI',
    'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'
  ]

  const fetchCountryData = async (countryName) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      const data = await response.json()
      if (data.length > 0) {
        const country = data[0]
        const currency = Object.values(country.currencies)[0]
        setFormData({
          ...formData,
          country: country.name.common,
          capital: country.capital?.[0] || 'N/A',
          currency: currency?.name || 'N/A',
          currencySymbol: currency?.symbol || 'N/A',
          flag: country.flags.svg,
          maps: country.maps.googleMaps,
          notes: formData.notes
        })
      }
    } catch (error) {
      console.error('Error fetching country data:', error)
    }
  }

  const getRandomCountry = async () => {
    const randomCode = countryCodes[Math.floor(Math.random() * countryCodes.length)]
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${randomCode}`)
      const data = await response.json()
      if (data.length > 0) {
        const country = data[0]
        const currency = Object.values(country.currencies)[0]
        setRandomCountry({
          name: country.name.common,
          capital: country.capital?.[0] || 'N/A',
          currency: currency?.name || 'N/A',
          currencySymbol: currency?.symbol || 'N/A',
          flag: country.flags.svg,
          maps: country.maps.googleMaps
        })
      }
    } catch (error) {
      console.error('Error fetching random country:', error)
    }
  }

  const handleChange = (e) => {
    if (e.target.name === 'country') {
      fetchCountryData(e.target.value)
    }
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addDestination = (e) => {
    e.preventDefault()
    if (!formData.country) return

    const newDestination = {
      id: Date.now(),
      ...formData,
      visited: false,
    }

    setWishlist([newDestination, ...wishlist])
    setFormData({
      country: '',
      capital: '',
      currency: '',
      currencySymbol: '',
      flag: '',
      maps: '',
      notes: ''
    })
  }

  const toggleVisited = (id) => {
    const updated = wishlist.map(dest =>
      dest.id === id ? { ...dest, visited: !dest.visited } : dest
    )
    setWishlist(updated)
  }

  const deleteDestination = (id) => {
    setWishlist(wishlist.filter(dest => dest.id !== id))
  }

  useEffect(() => {
    getRandomCountry()
  }, [])

  return (
    <div className="container">
      <h1>My Travel Wishlist</h1>

      <div className="main-content">
        <div className="left-section">
          {randomCountry && (
            <div className="random-suggestion">
              <h3>Suggested Destination:</h3>
              <div className="country-card">
                <img src={randomCountry.flag} alt={`${randomCountry.name} flag`} style={{width: '50px'}} />
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

          <div className="add_pais">
            <form onSubmit={addDestination} className="form">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
              />
              <input
                type="text"
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
              />
              <button type="submit">Add Destination</button>
            </form>
          </div>
        </div>

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
    </div>
  )
}

export default App