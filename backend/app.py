# backend/app.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import torch
import torch.nn.functional as F
import torchvision.transforms as transforms

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev, restrict in production
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load model
model = torch.load("model/skin_cancer_model.pth", map_location="cpu")
model.eval()

# Classes focused on skin cancer detection
CLASSES = ["Melanoma", "Basal Cell Carcinoma (BCC)", "Squamous Cell Carcinoma (SCC)", "No Cancer"]

# Transform for images
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image = Image.open(io.BytesIO(await file.read())).convert("RGB")
        image = transform(image).unsqueeze(0)

        with torch.no_grad():
            outputs = model(image)
            probabilities = F.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)

        result = CLASSES[predicted.item()]
        confidence = round(confidence.item() * 100, 2)

        return {
            "prediction": result,
            "confidence": f"{confidence}%",
            "advice": "Consult a dermatologist for confirmation." if result != "No Cancer" else "Keep monitoring your skin regularly."
        }

    except Exception as e:
        return {"error": str(e)}
