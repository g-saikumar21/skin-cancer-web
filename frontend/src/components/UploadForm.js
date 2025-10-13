import React, { useState } from "react";

function UploadForm({ setResult }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [bodyPart, setBodyPart] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleBodyPartChange = (e) => {
    setBodyPart(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please choose an image first!");
      return;
    }
    // Mock prediction logic, replace with actual API call
    const mockResult = Math.random() > 0.5 ? "Cancer Detected" : "No Cancer";
    setResult(mockResult);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setBodyPart("");
    setResult(null);
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input
        type="file"
        id="file-input"
        accept="image/*"
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">Choose Image</label>

      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="preview-image" />
        </div>
      )}

      <select
        className="skin-type-select"
        value={bodyPart}
        onChange={handleBodyPartChange}
      >
        <option value="">Select Body Part</option>
        <option value="face">Face</option>
        <option value="arm">Arm</option>
        <option value="leg">Leg</option>
        <option value="back">Back</option>
        <option value="chest">Chest</option>
      </select>

      <div className="buttons-container">
        <button type="submit">Check</button>
        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      <p className="upload-note">
        Only upload clear images of skin lesions. Supported formats: JPG, PNG.
      </p>
    </form>
  );
}

export default UploadForm;
