import tensorflow as tf
from tensorflow.keras import layers, models

# Create CNN model
model = models.Sequential([

    # Input image: 224 x 224 RGB
    layers.Input(shape=(224, 224, 3)),

    # First convolution block
    layers.Conv2D(32, (3, 3), activation="relu"),
    layers.MaxPooling2D(2, 2),

    # Second convolution block
    layers.Conv2D(64, (3, 3), activation="relu"),
    layers.MaxPooling2D(2, 2),

    # Third convolution block
    layers.Conv2D(128, (3, 3), activation="relu"),
    layers.MaxPooling2D(2, 2),

    # Convert feature maps into a vector
    layers.Flatten(),

    # Fully connected layer
    layers.Dense(128, activation="relu"),

    # Dropout helps reduce overfitting
    layers.Dropout(0.5),

    # 6 crop-disease classes
    layers.Dense(38, activation="softmax")
])

# Display model architecture
model.summary()  