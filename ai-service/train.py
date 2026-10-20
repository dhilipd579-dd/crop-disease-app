import tensorflow as tf
from tensorflow.keras import layers, models
import os

# ==============================
# Dataset paths
# ==============================

train_dir = "dataset/PlantVillage/train"
val_dir = "dataset/PlantVillage/val"

# ==============================
# Settings
# ==============================

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 5

# ==============================
# Load datasets
# ==============================

train_dataset = tf.keras.utils.image_dataset_from_directory(
    train_dir,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=True
)

val_dataset = tf.keras.utils.image_dataset_from_directory(
    val_dir,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False
)

# Get class names
class_names = train_dataset.class_names
num_classes = len(class_names)

print("\nNumber of classes:", num_classes)

print("\nClasses:")
for i, name in enumerate(class_names):
    print(i, "->", name)

# ==============================
# Improve dataset performance
# ==============================

AUTOTUNE = tf.data.AUTOTUNE

train_dataset = train_dataset.prefetch(
    buffer_size=AUTOTUNE
)

val_dataset = val_dataset.prefetch(
    buffer_size=AUTOTUNE
)

# ==============================
# MobileNetV2 base model
# ==============================

base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)

# Freeze pretrained layers
base_model.trainable = False

# ==============================
# Build model
# ==============================

model = models.Sequential([

    layers.Input(shape=(224, 224, 3)),

    layers.Rescaling(
        1.0 / 127.5,
        offset=-1
    ),

    base_model,

    layers.GlobalAveragePooling2D(),

    layers.Dense(
        128,
        activation="relu"
    ),

    layers.Dropout(0.3),

    layers.Dense(
        num_classes,
        activation="softmax"
    )
])

# ==============================
# Compile
# ==============================

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# ==============================
# Show model
# ==============================

model.summary()

# ==============================
# Train
# ==============================

history = model.fit(
    train_dataset,
    validation_data=val_dataset,
    epochs=EPOCHS
)

# ==============================
# Save model
# ==============================

os.makedirs(
    "saved_model",
    exist_ok=True
)

model.save(
    "saved_model/crop_disease_model.keras"
)

# Save class names
with open(
    "saved_model/class_names.txt",
    "w"
) as file:

    for name in class_names:
        file.write(name + "\n")

print("\n===================================")
print("CNN TRAINING COMPLETED!")
print("Model saved successfully.")
print("===================================")