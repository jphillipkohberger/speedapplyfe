import React, { useState } from 'react';

function FileUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      // api call to upload the file
      // const response = await fetch(import.meta.env.VITE_API_URL + '/Api/Users/UploadFile', {
      //   method: 'POST',
      //   body: formData,
      // });
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div style={{ position: 'relative', width: '400px' }}>
      <label htmlFor="Zip">Upload Resume:</label>
      <p>
        <input type="file" onChange={handleFileChange} />
      </p>
      <p>
        <button onClick={handleUpload}>Upload</button>
      </p>
    </div>
  );
}

export default FileUploader;
