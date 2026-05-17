import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

export default function Profile() {

  const [Street, setStreet] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Zip, setZip] = useState('');

  const [errors, setErrors] = useState({});


  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/Login", { replace: true });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {

      // Send these fields to API
      console.log(`Address Submitted: ${Street}, ${City}, ${State} ${Zip}`);

      try {
        //API Call
        // login(Email, Password);
        alert('API Call save address');
      } catch (err) {
        setErrors(errors);
      }
    }

    // Clear the form fields after submission
    setStreet('');
    setCity('');
    setState('');
    setZip('');
  };

  const validateForm = () => {
    let newErrors = {};
    if (!Street) newErrors.Street = 'Street is required';
    if (!City) newErrors.City = 'City is required';
    if (!State) newErrors.State = 'State is required';
    if (!Zip) newErrors.Zip = 'Zip is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="form-container">
      <h1>SpeedApply User Profile</h1>
      <p>Welcome{user?.Email ? `, ${user.Email}` : ""}!</p>
      <h2>Address</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="Street">Street:</label>
          <input
            type="text"
            id="Street"
            value={Street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <p className="error">{errors.Street}</p>
        </div>
        <div style={{ position: 'relative', width: '400px' }}>
          <label htmlFor="City">City:</label>
          <input
            type="text"
            id="City"
            value={City}
            onChange={(e) => setCity(e.target.value)}
          />
          <p className="error">{errors.City}</p>
        </div>
        <div style={{ position: 'relative', width: '400px' }}>
          <label htmlFor="State">State:</label>
          <input
            type="text"
            id="State"
            value={State}
            onChange={(e) => setState(e.target.value)}
          />
          <p className="error">{errors.State}</p>
        </div>
        <div style={{ position: 'relative', width: '400px' }}>
          <label htmlFor="Zip">Zip Code:</label>
          <input
            type="text"
            id="Zip"
            value={Zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <p className="error">{errors.Zip}</p>
        </div>
        <p>
          <button onClick={handleSubmit} className="submit-btn">Save</button>
        </p>
      </form>
      <form noValidate>
        <p>
          <button onClick={handleLogout} className="submit-btn">Log out</button>
        </p>
      </form>
    </div>
  );
}