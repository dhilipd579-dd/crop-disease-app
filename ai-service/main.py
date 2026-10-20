from fastapi import FastAPI, File, UploadFile
from PIL import Image
import tensorflow as tf
import numpy as np
import io

app = FastAPI()

MODEL_PATH = "saved_model/crop_disease_model.keras"
CLASS_NAMES_PATH = "saved_model/class_names.txt"

model = tf.keras.models.load_model(MODEL_PATH)

with open(CLASS_NAMES_PATH, "r", encoding="utf-8") as file:
    class_names = [line.strip() for line in file.readlines() if line.strip()]

# Important:
# If the trained Keras model already contains a Rescaling layer,
# pass pixel values in their original 0-255 range.
# This prevents double/wrong normalization during prediction.
has_rescaling_layer = any(
    layer.__class__.__name__.lower() == "rescaling"
    for layer in model.layers
)

print("CNN model loaded successfully!")
print("Number of classes:", len(class_names))
print("Model contains Rescaling layer:", has_rescaling_layer)


@app.get("/")
def home():
    return {
        "message": "Crop Disease AI Service is running!",
        "classes": len(class_names),
        "preprocessing": (
            "model handles rescaling"
            if has_rescaling_layer
            else "service scales image to 0-1"
        ),
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    print("=================================")
    print("Prediction request received by AI service")
    print("Filename:", file.filename)
    print("Content type:", file.content_type)

    image_data = await file.read()

    print("Image received successfully")
    print("Image size:", len(image_data), "bytes")

    try:
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
    except Exception:
        return {
            "filename": file.filename,
            "prediction": "Invalid Image",
            "confidence": 0,
            "top_predictions": [],
            "warning": "Please upload a valid image file.",
        }

    # Use exactly the image size used by the CNN.
    image = image.resize((224, 224))

    # Keep the original pixel range when the Keras model
    # contains its own Rescaling layer.
    image_array = np.asarray(image, dtype=np.float32)

    if not has_rescaling_layer:
        image_array = image_array / 255.0

    image_array = np.expand_dims(image_array, axis=0)

    print("Input shape:", image_array.shape)
    print(
        "Input range:",
        float(image_array.min()),
        "to",
        float(image_array.max()),
    )
    print("Starting CNN prediction...")

    predictions = model.predict(image_array, verbose=0)
    probabilities = np.asarray(predictions[0], dtype=np.float32)

    # Convert logits to probabilities if a model ever returns logits.
    # Normal softmax outputs already sum to approximately 1.
    probability_sum = float(np.sum(probabilities))

    if (
        np.any(probabilities < 0)
        or np.any(probabilities > 1)
        or not np.isclose(probability_sum, 1.0, atol=0.05)
    ):
        probabilities = tf.nn.softmax(probabilities).numpy()

    predicted_index = int(np.argmax(probabilities))
    confidence_percentage = float(probabilities[predicted_index] * 100)

    top_count = min(3, len(class_names))
    top_indices = np.argsort(probabilities)[-top_count:][::-1]

    top_predictions = []

    for index in top_indices:
        top_predictions.append(
            {
                "disease": class_names[int(index)],
                "confidence": round(
                    float(probabilities[int(index)]) * 100, 2
                ),
            }
        )

    print("Prediction:", class_names[predicted_index])
    print("Confidence:", round(confidence_percentage, 2))
    print("Top predictions:", top_predictions)
    print("=================================")

    # Do not present a very uncertain prediction as reliable.
    if confidence_percentage < 50:
        return {
            "filename": file.filename,
            "prediction": "Low Confidence",
            "confidence": round(confidence_percentage, 2),
            "top_predictions": top_predictions,
            "warning": (
                "The model is not confident enough to provide "
                "a reliable prediction. Please upload a clearer "
                "crop leaf image."
            ),
        }

    return {
        "filename": file.filename,
        "prediction": class_names[predicted_index],
        "confidence": round(confidence_percentage, 2),
        "top_predictions": top_predictions,
    }
