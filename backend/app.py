# backend/app.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import torch  # or tensorflow
import torchvision.transforms as transforms

app = FastAPI()

# Allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load your model
model = torch.load("model/skin_cancer_model.pth")
model.eval()

# Define image transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read())).convert("RGB")
    image = transform(image).unsqueeze(0)
    
    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
    
    classes = ["Melanoma", "Nevus", "Basal Cell Carcinoma", "No Cancer"]
    result = classes[predicted.item()]
    
    return {"prediction": result}
