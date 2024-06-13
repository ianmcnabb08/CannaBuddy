import React, {useState, useEffect} from'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [strains, setStrains] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    method: '',
    rating: 3,
    location: '',
    notes: '',
    terpenes: '',
    effects: '',
    flavors: ''
  });

  useEffect(() => {
    fetch('http://localhost:5002/strains')
      .then(res => res.json())
      .then(data => setStrains(data));
    }, []);

    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData(prevState => ({...prevState, [name]: value}));
      console.log(formData);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      fetch('http://localhost:5002/strains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(data => setStrains([...strains, data]));
    };
    const handleSliderChange = (e) => {
      const ratingValue = parseInt(e.target.value, 10);
      setFormData(prevState => ({ ...prevState, rating: ratingValue }));
    };

    return (
      <div className="container">
        < h1>Light Up</h1>
        <form onSubmit={handleSubmit} className='m-2 col-10 border border-2 p-2 bg-light'>
          <div className='form-group mt-2'>
            <label>Strain</label>
            <input type='text' className='form-control' name='name' value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group mt-2">
            <label>Method of Consumption</label>
            <input type="text" className="form-control" name="method" value={formData.method} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <input type="range" className="form-control-range custom-slider" name="rating" min="0" max="10" value={formData.rating} onChange={handleSliderChange} />
            <div className="rating-scale">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
          </div>
          <div className="form-group mt-2">
            <label>Location</label>
            <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} />
          </div>
          <div className="form-group mt-2">
            <label>Terpenes</label>
            <input type="text" className="form-control" name="terpenes" value={formData.terpenes} onChange={handleChange} />
          </div>
          <div className="form-group mt-2">
            <label>Effects</label>
            <input type="text" className="form-control" name="effects" value={formData.effects} onChange={handleChange} />
          </div>
          <div className="form-group mt-2">
            <label>Flavors</label>
            <input type="text" className="form-control" name="flavors" value={formData.flavors} onChange={handleChange} />
          </div>
          <div className="form-group mt-2">
            <label>Notes</label>
            <textarea className="form-control" name="notes" value={formData.notes} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className="btn btn-success mt-2">Submit</button>
        </form>
        <div>
        <h2 className="my-4">Logged Strains</h2>
        <ul className="list-group">
          {strains.map(strain => (
            <li key={strain._id} className="list-group-item">
              <h5>{strain.name}</h5>
              <p><strong>Method:</strong> {strain.method}</p>
              <p><strong>Rating:</strong> {strain.rating}</p>
              <p><strong>Location:</strong> {strain.location}</p>
              <p><strong>Terpenes:</strong> {strain.terpenes}</p>
              <p><strong>Effects:</strong> {strain.effects}</p>
              <p><strong>Flavors:</strong> {strain.flavors}</p>
              <p><strong>Notes:</strong> {strain.notes}</p>
            </li>
          ))}
        </ul>
        </div>
        
      </div>


    );

};

export default App;