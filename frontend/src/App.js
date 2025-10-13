import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultCard from "./components/ResultCard";
import FloatingCells from "./components/FloatingCells";

function App() {
  const [result, setResult] = useState(null);
  const [showKnowUs, setShowKnowUs] = useState(false);
  const [activeTab, setActiveTab] = useState("model");

  const handleKnowUsOpen = () => setShowKnowUs(true);
  const handleKnowUsClose = () => setShowKnowUs(false);

  const renderKnowUsContent = () => {
    switch (activeTab) {
      case "model":
        return (
          <div>
            <h3>About Model</h3>
            <p>
              Our system detects skin cancer using advanced deep learning
              models—VGG16, MobileNetV2, and ResNet50. Early and accurate
              skin cancer detection is vital, as manual diagnosis by
              dermatologists can be time-consuming and prone to human error.
            </p>
            <p>
              <strong>VGG16:</strong> Deep CNN with 16 weight layers and over
              138 million parameters, specializing in high-accuracy image
              recognition.
            </p>
            <p>
              <strong>MobileNetV2:</strong> Efficient model for mobile/embedded
              applications. Uses inverted residual blocks and depthwise
              separable convolutions for real-time skin cancer detection.
            </p>
            <p>
              <strong>ResNet50:</strong> 50-layer model with residual
              connections, excellent feature extraction, balances depth and
              efficiency, high classification accuracy.
            </p>
          </div>
        );
      case "app":
        return (
          <div>
            <h3>About App</h3>
            <p>
              The Skin Cancer Detection web app makes early screening
              accessible, user-friendly, and reliable. Users upload images of
              skin lesions to instantly receive a prediction powered by CNN
              models.
            </p>
            <ul>
              <li>Seamless image upload and classification</li>
              <li>User-centric, explanatory results interface</li>
              <li>Real-time, accurate risk assessment</li>
              <li>Secure handling of user images</li>
              <li>Clear model performance metrics</li>
            </ul>
          </div>
        );
      case "developers":
        return (
          <div>
            <h3>About Developers</h3>
            <p>
              Developed by final-year CS students at A.J. Institute of
              Engineering and Technology as part of AI for social good.
            </p>
            <p>
              <strong>Team Members:</strong> Shreepathi, G Sai Kumar, Vignesh,
              Suhas S
            </p>
            <p>
              <strong>Guided by:</strong> Mr. Vijaykumar Dudhanikar, Assistant
              Professor, Dept. of CSE
            </p>
            <p>
              Our work spans research, model training, evaluation, and
              full-stack deployment to make preventive healthcare technology
              more accessible.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <FloatingCells />

      <header className="app-header">
        <div className="logo">Skin Cancer Detection</div>
        <nav className="navbar">
          <a href="#upload">Upload</a>
          <a href="#info">Info</a>
          <a
            onClick={handleKnowUsOpen}
            style={{ cursor: "pointer" }}
          >
            Know Us
          </a>
        </nav>
      </header>

      <section className="hero-section">
        <div>
          <h2>Detect Skin Cancer Early</h2>
          <p>Upload an image of your skin lesion to check for possible cancer.</p>
        </div>
      </section>

      <main className="main-content">
        <section id="upload">
          <UploadForm setResult={setResult} />
          {result && <ResultCard result={result} />}
        </section>

        <section id="info" className="info-section">
          <div className="info-card">
            <h3>Early Detection</h3>
            <p>Helps find skin cancer early, improving chances of successful treatment.</p>
          </div>
          <div className="info-card">
            <h3>Quick Analysis</h3>
            <p>Get instant results without visiting a clinic.</p>
          </div>
          <div className="info-card">
            <h3>Stay Safe</h3>
            <p>Monitor your skin regularly and take preventive measures.</p>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        &copy; {new Date().getFullYear()} Skin Cancer Detection. All rights reserved.
      </footer>

      {/* ===== Know Us Fullscreen Overlay ===== */}
      {showKnowUs && (
        <div className="know-us-overlay">
          <div className="know-us-container">
            <button className="know-us-close" onClick={handleKnowUsClose}>
              ✖
            </button>
            <div className="know-us-tabs">
              <button
                className={activeTab === "model" ? "active" : ""}
                onClick={() => setActiveTab("model")}
              >
                About Model
              </button>
              <button
                className={activeTab === "app" ? "active" : ""}
                onClick={() => setActiveTab("app")}
              >
                About App
              </button>
              <button
                className={activeTab === "developers" ? "active" : ""}
                onClick={() => setActiveTab("developers")}
              >
                About Developers
              </button>
            </div>
            <div className="know-us-content">{renderKnowUsContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
