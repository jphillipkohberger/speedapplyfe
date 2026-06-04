import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

export default function Profile() {

  const handleClick = e => {
    e.preventDefault();
    // Programmatically click the hidden file input
    hiddenFileInput.current.click();
  };

  var [UserId, setUserId] = useState('');
  const [Street, setStreet] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Zip, setZip] = useState('');
  const [MinSal, setMinSal] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [errors, setErrors] = useState({});

  const hiddenFileInput = useRef(null);


  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/Login", { replace: true });
  }

  /* 
  NEED TO TEST THIS FUNCTIONALITY
  1. User selects a file from the file input
  2. The file is read as a Blob and a local URL is created for preview
  3. The preview is displayed in an iframe
  4. When the component unmounts or the file changes, the local URL is revoked to free memory
  */
  // Manage the preview lifetime
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl('');
      return;
    }

    const blob = new Blob([selectedFile], { type: 'text/plain' });
    const objectUrl = URL.createObjectURL(blob);

    // Create a local blob URL for the selected file
    // const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // Free memory when the component unmounts or the file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (event) => {

    // 1. Extract the file from the input event
    const file = event.target.files[0];
    if (!file) return;

    // 2. The File object is already a subclass of Blob.
    // You can explicitly cast or wrap it into a raw Blob if needed:
    const pdfBlob = new Blob([file], { type: 'application/pdf' });

    console.log('Original File Object:', file);
    console.log('Converted PDF Blob Object:', pdfBlob);

    // 3. Optional: Create a local object URL to view or download the blob
    const generatedUrl = URL.createObjectURL(pdfBlob);
    setPreviewUrl(generatedUrl);

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {

      UserId = user.id;
      // Send these fields to API
      console.log(`Address Submitted: ${UserId}, ${Street}, ${City}, ${State} ${Zip} ${MinSal}`);

      try {
        //API Call
        //fetch the blob data from the preview URL and send it to the server
        fetch(previewUrl)
        .then(response => response.blob())
        .then(blobData => {
         
          const formData = new FormData();
          formData.append('UserId', UserId);
          formData.append('Street', Street);
          formData.append('City', City);
          formData.append('State', State);
          formData.append('Zip', Zip);
          formData.append('MinSal', MinSal);
          formData.append('Resume', blobData);

          const requestOptions = {
            method: 'POST',
            body: formData
          };

          fetch(import.meta.env.VITE_API_URL + '/Api/Users/SaveProfile', requestOptions)
            .then(response => {
              if (!response.ok) {
                console.log(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log(data);
              try {

              } catch (err) {
                setErrors(errors);
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .then(serverResponse => serverResponse.json())
        .then(result => {
          console.log('Upload success:', result);
        })
        .catch(error => {
          console.error('Upload failed:', error);
        });

      } catch (err) {
        setErrors(errors);
      }
    }

    // Clear the form fields after submission
    setStreet('');
    setCity('');
    setState('');
    setZip('');
    setMinSal('');
  };

  const validateForm = () => {
    let newErrors = {};
    if (!Street) newErrors.Street = 'Street is required';
    if (!City) newErrors.City = 'City is required';
    if (!State) newErrors.State = 'State is required';
    if (!Zip) newErrors.Zip = 'Zip is required';
    if (!MinSal) newErrors.MinSal = 'Minimum Salary is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="form-container">
      <h1>SpeedApply User Profile</h1>
      <p style={{ color: 'black', fontSize: '1.2REM', fontWeight: 'bold' }}>Welcome{user?.email ? `, ${user.email}` : ""}!</p>
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
        <div style={{ position: 'relative', width: '400px' }}>
          <label htmlFor="MinSal">Minimum Salary:</label>
          <input
            type="text"
            id="MinSal"
            value={MinSal}
            onChange={(e) => setMinSal(e.target.value)}
          />
          <p className="error">{errors.MinSal}</p>
        </div>
        <div style={{ position: 'relative', width: '400px' }}>
          {/* Render the preview */}
          <div style={{ border: '1px solid #ccc', padding: '10px', maxWidth: '400px', height: '181px' }}>
          {previewUrl && 
            <iframe
              src={previewUrl}
              width="100%"
              height="181px"
              title="PDF Preview"
              style={{ border: '1px solid #ccc' }}
            />
          }
          </div>
          <button 
            className="submit-btn" 
            onClick={handleClick}
            style={{ 
              backgroundColor: 'black', 
              color: 'white', 
            }}
          >
            Upload Resume
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            style={{ display: 'none' }} // Hide the default input
            onChange={handleFileChange}
            accept="application/pdf"
          />
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