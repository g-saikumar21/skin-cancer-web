import React, { useState } from "react";
import "./KnowUs.css";

function KnowUs() {
  const [activeTab, setActiveTab] = useState("model");

  const tabs = [
    { id: "model", label: "About Model" },
    { id: "app", label: "About App" },
    { id: "devs", label: "About Developers" },
  ];

  return (
    <div className="knowus-container">
      <h2>Know Us</h2>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "model" && (
          <div>
            <h3>About Model</h3>
            <p>
              Our system detects skin cancer using advanced deep learning models—VGG16, MobileNetV2, and ResNet50.
              Early and accurate detection is vital, as manual diagnosis can be time-consuming and error-prone.
            </p>
            <ul>
              <li>
                <strong>VGG16:</strong> 16-layer CNN, high accuracy, over 138 million parameters.
              </li>
              <li>
                <strong>MobileNetV2:</strong> Efficient and fast, optimized for mobile devices with depthwise separable convolutions.
              </li>
              <li>
                <strong>ResNet50:</strong> 50 layers with residual connections, balances depth and efficiency.
              </li>
            </ul>
            <p>
              Models are trained on thousands of annotated skin lesion images and ensembled for robust predictions.
            </p>
          </div>
        )}
        {activeTab === "app" && (
          <div>
            <h3>About App</h3>
            <p>
              The Skin Cancer Detection app is user-friendly and allows users to upload skin lesion images for instant prediction.
              Backend preprocesses images and uses trained CNN models to give reliable results.
            </p>
            <ul>
              <li>Seamless image upload and classification</li>
              <li>User-centric result interface</li>
              <li>Real-time risk assessment</li>
              <li>Secure handling of images</li>
              <li>Transparent model performance metrics</li>
            </ul>
          </div>
        )}
        {activeTab === "devs" && (
          <div>
            <h3>About Developers</h3>
            <p>
              Developed by final-year CS students at A.J. Institute of Engineering and Technology.
            </p>
            <ul>
              <li>Shreepathi (4JK22CS052)</li>
              <li>G Saikumar (4JK22CS015)</li>
              <li>Vignesh (4JK22CS060)</li>
              <li>Suhas S (4JK23CS403)</li>
            </ul>
            <p>Guided by Mr. Vijaykumar Dudhanikar, Assistant Professor, Dept. of CSE.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default KnowUs;
