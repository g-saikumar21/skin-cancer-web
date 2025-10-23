import React, { useState } from "react";
import axios from "axios";

function UploadForm({ setResult }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [bodyPart, setBodyPart] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleBodyPartChange = (e) => setBodyPart(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please upload a dermoscopic image first.");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (err) {
      alert("Error analyzing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setBodyPart("");
    setResult(null);
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <h3>Upload Dermoscopic Image</h3>
      <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} />
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
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>
        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      <p className="upload-note">
        Upload clear dermoscopic images. Supported formats: JPG, PNG.
      </p>
    </form>
  );
}

export default UploadForm;
