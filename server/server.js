const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const Prediction = require("./models/Prediction");
const User = require("./models/User");

// ==========================================
// APP CONFIGURATION
// ==========================================

const app = express();

const PORT = process.env.PORT || 5000;

const JWT_SECRET =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "production"
    ? ""
    : "crop_disease_secret_key");

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be configured in production.");
}

const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL ||
  "http://127.0.0.1:8000";

// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb://127.0.0.1:27017/cropDiseaseDB"
  )
  .then(() => {
    console.log(
      "MongoDB connected successfully!"
    );
  })
  .catch((error) => {
    console.error(
      "MongoDB connection error:",
      error.message
    );
  });

// ==========================================
// MIDDLEWARE
// ==========================================

const allowedOrigins = (
  process.env.CLIENT_ORIGIN || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());

// ==========================================
// MULTER CONFIGURATION
// ==========================================

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only image files are allowed."
        ),
        false
      );
    }
  },
});

// ==========================================
// JWT AUTHENTICATION MIDDLEWARE
// ==========================================

function authenticateToken(req, res, next) {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error:
        "Authentication required. Please login.",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error:
        "Invalid authorization format",
    });
  }

  const token =
    authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error:
        "Authentication token missing",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    req.user = decoded;

    console.log(
      "Authenticated user:",
      decoded.userId
    );

    next();
  } catch (error) {
    console.error(
      "JWT verification error:",
      error.message
    );

    return res.status(401).json({
      error:
        "Invalid or expired token. Please login again.",
    });
  }
}

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    message:
      "Crop Disease Backend is running!",
    status: "success",
  });
});

app.get("/health", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;
  res.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? "ok" : "database_unavailable",
  });
});

// ==========================================
// SIGNUP ROUTE
// ==========================================

app.post("/api/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error:
          "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error:
          "Password must be at least 6 characters",
      });
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    const normalizedName =
      name.trim();

    if (!normalizedName) {
      return res.status(400).json({
        error:
          "Name cannot be empty",
      });
    }

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return res.status(400).json({
        error:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const newUser = new User({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await newUser.save();

    console.log(
      "New user registered:",
      newUser.email
    );

    return res.status(201).json({
      message:
        "Signup successful",
    });
  } catch (error) {
    console.error(
      "Signup error:",
      error.message
    );

    return res.status(500).json({
      error:
        "Signup failed",
    });
  }
});

// ==========================================
// LOGIN ROUTE
// ==========================================

app.post("/api/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error:
          "Email and password are required",
      });
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    const user =
      await User.findOne({
        email: normalizedEmail,
      });

    if (!user) {
      return res.status(401).json({
        error:
          "Invalid email or password",
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        error:
          "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId:
          user._id.toString(),

        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log(
      "User logged in:",
      user.email
    );

    return res.status(200).json({
      message:
        "Login successful",

      token: token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(
      "Login error:",
      error.message
    );

    return res.status(500).json({
      error:
        "Login failed",
    });
  }
});

// ==========================================
// PREDICTION ROUTE
// ==========================================

app.post(
  "/api/predict",
  authenticateToken,
  upload.single("file"),
  async (req, res) => {
    try {
      console.log(
        "================================="
      );

      console.log(
        "Prediction request received"
      );

      // ==========================================
      // CHECK AUTHENTICATED USER
      // ==========================================

      if (
        !req.user ||
        !req.user.userId
      ) {
        return res.status(401).json({
          error:
            "Invalid user authentication",
        });
      }

      console.log(
        "Authenticated User ID:",
        req.user.userId
      );

      // ==========================================
      // CHECK IMAGE
      // ==========================================

      if (!req.file) {
        console.log(
          "No file received"
        );

        return res.status(400).json({
          error:
            "No image uploaded",
        });
      }

      console.log(
        "Image received:",
        req.file.originalname
      );

      console.log(
        "Image type:",
        req.file.mimetype
      );

      console.log(
        "Image size:",
        req.file.size,
        "bytes"
      );

      // ==========================================
      // SEND IMAGE TO PYTHON AI SERVICE
      // ==========================================

      const form =
        new FormData();

      form.append(
        "file",
        req.file.buffer,
        {
          filename:
            req.file.originalname,

          contentType:
            req.file.mimetype,
        }
      );

      console.log(
        "Sending image to Python AI service..."
      );

      const response =
        await axios.post(
          `${AI_SERVICE_URL}/predict`,
          form,
          {
            headers: {
              ...form.getHeaders(),
            },

            timeout: 120000,

            maxContentLength:
              Infinity,

            maxBodyLength:
              Infinity,
          }
        );

      console.log(
        "CNN Prediction:",
        response.data
      );

      // ==========================================
      // CHECK AI RESPONSE
      // ==========================================

      if (
        !response.data ||
        !response.data.prediction
      ) {
        console.error(
          "Invalid response from AI service"
        );

        return res.status(500).json({
          error:
            "Invalid response received from AI service",
        });
      }

      // ==========================================
      // NORMALIZE TOP 3 PREDICTIONS
      // ==========================================

      let topPredictions = [];

      if (
        Array.isArray(
          response.data.top_predictions
        )
      ) {
        topPredictions =
          response.data.top_predictions
            .filter(
              (item) =>
                item &&
                item.disease !==
                  undefined &&
                item.confidence !==
                  undefined
            )
            .slice(0, 3)
            .map((item) => ({
              disease:
                String(
                  item.disease
                ),

              confidence:
                Number(
                  item.confidence
                ),
            }));
      }

      console.log(
        "TOP 3 FROM PYTHON:",
        topPredictions
      );

      // ==========================================
      // SAVE PREDICTION TO MONGODB
      // ==========================================

      const newPrediction =
        new Prediction({
          userId:
            req.user.userId,

          filename:
            response.data.filename ||
            req.file.originalname,

          prediction:
            response.data.prediction,

          confidence:
            Number(
              response.data.confidence
            ),

          // ==========================================
          // SAVE TOP 3 PREDICTIONS
          // ==========================================

          topPredictions:
            topPredictions,
        });

      await newPrediction.save();

      console.log(
        "Prediction saved to MongoDB successfully!"
      );

      console.log(
        "Saved Top 3 predictions:",
        topPredictions
      );

      // ==========================================
      // PREPARE RESPONSE FOR REACT
      // ==========================================

      const reactResponse = {
        filename:
          response.data.filename ||
          req.file.originalname,

        prediction:
          response.data.prediction,

        confidence:
          Number(
            response.data.confidence
          ),

        // Send Top 3 to React
        top_predictions:
          topPredictions,
      };

      // ==========================================
      // IMPORTANT DEBUG LOG
      // ==========================================

      console.log(
        "================================="
      );

      console.log(
        "SENDING TO REACT:"
      );

      console.log(
        JSON.stringify(
          reactResponse,
          null,
          2
        )
      );

      console.log(
        "================================="
      );

      // ==========================================
      // SEND RESULT TO REACT
      // ==========================================

      return res
        .status(200)
        .json(reactResponse);

    } catch (error) {
      console.error(
        "Prediction error:",
        error.message
      );

      // ==========================================
      // AI SERVICE ERROR
      // ==========================================

      if (error.response) {
        console.error(
          "Python response:",
          error.response.data
        );

        return res.status(500).json({
          error:
            "AI service returned an error",

          details:
            error.response.data,
        });
      }

      // ==========================================
      // AI SERVICE NOT RUNNING
      // ==========================================

      if (
        error.code ===
        "ECONNREFUSED"
      ) {
        return res.status(503).json({
          error:
            "AI service is not running. Please start the FastAPI service.",
        });
      }

      // ==========================================
      // AI SERVICE TIMEOUT
      // ==========================================

      if (
        error.code ===
          "ECONNABORTED" ||
        error.code ===
          "ETIMEDOUT"
      ) {
        return res.status(504).json({
          error:
            "AI service took too long to respond.",
        });
      }

      // ==========================================
      // GENERAL ERROR
      // ==========================================

      return res.status(500).json({
        error:
          "Prediction failed",

        details:
          error.message,
      });
    }
  }
);

// ==========================================
// GET USER-SPECIFIC PREDICTION HISTORY
// ==========================================

app.get(
  "/api/predictions",
  authenticateToken,
  async (req, res) => {
    try {
      console.log(
        "================================="
      );

      console.log(
        "Fetching prediction history"
      );

      if (
        !req.user ||
        !req.user.userId
      ) {
        return res.status(401).json({
          error:
            "Invalid user authentication",
        });
      }

      console.log(
        "User ID:",
        req.user.userId
      );

      const predictions =
        await Prediction.find({
          userId:
            req.user.userId,
        }).sort({
          createdAt: -1,
        });

      console.log(
        "Predictions found:",
        predictions.length
      );

      // ==========================================
      // DEBUG: SHOW SAVED TOP 3
      // ==========================================

      predictions.forEach(
        (prediction, index) => {
          console.log(
            `History ${index + 1}:`,
            {
              id: prediction._id,
              disease:
                prediction.prediction,
              confidence:
                prediction.confidence,
              topPredictions:
                prediction.topPredictions,
            }
          );
        }
      );

      return res.status(200).json(
        predictions
      );

    } catch (error) {
      console.error(
        "Error fetching prediction history:",
        error.message
      );

      return res.status(500).json({
        error:
          "Failed to fetch prediction history",
      });
    }
  }
);

// ==========================================
// DELETE USER-SPECIFIC PREDICTION
// ==========================================

app.delete(
  "/api/predictions/:id",
  authenticateToken,
  async (req, res) => {
    try {
      console.log(
        "================================="
      );

      console.log(
        "Delete prediction request received"
      );

      if (
        !req.user ||
        !req.user.userId
      ) {
        return res.status(401).json({
          error:
            "Invalid user authentication",
        });
      }

      const predictionId =
        req.params.id;

      console.log(
        "Prediction ID:",
        predictionId
      );

      console.log(
        "User ID:",
        req.user.userId
      );

      if (
        !mongoose.Types.ObjectId.isValid(
          predictionId
        )
      ) {
        return res.status(400).json({
          error:
            "Invalid prediction ID",
        });
      }

      const deletedPrediction =
        await Prediction.findOneAndDelete(
          {
            _id: predictionId,

            userId:
              req.user.userId,
          }
        );

      if (!deletedPrediction) {
        return res.status(404).json({
          error:
            "Prediction not found",
        });
      }

      console.log(
        "Prediction deleted successfully:",
        predictionId
      );

      return res.status(200).json({
        message:
          "Prediction deleted successfully",

        deletedPrediction:
          deletedPrediction._id,
      });

    } catch (error) {
      console.error(
        "Delete prediction error:",
        error.message
      );

      return res.status(500).json({
        error:
          "Failed to delete prediction",
      });
    }
  }
);

// ==========================================
// MULTER ERROR HANDLER
// ==========================================

app.use(
  (error, req, res, next) => {
    if (
      error instanceof
      multer.MulterError
    ) {
      if (
        error.code ===
        "LIMIT_FILE_SIZE"
      ) {
        return res.status(400).json({
          error:
            "Image size must be less than 10 MB.",
        });
      }

      return res.status(400).json({
        error:
          error.message,
      });
    }

    if (
      error &&
      error.message ===
        "Only image files are allowed."
    ) {
      return res.status(400).json({
        error:
          "Only image files are allowed.",
      });
    }

    next(error);
  }
);

// ==========================================
// GENERAL ERROR HANDLER
// ==========================================

app.use(
  (error, req, res, next) => {
    console.error(
      "Unhandled server error:",
      error.message
    );

    res.status(500).json({
      error:
        "Internal server error",
    });
  }
);

// ==========================================
// START SERVER
// ==========================================

app.listen(
  PORT,
  () => {
    console.log(
      "================================="
    );

    console.log(
      "Crop Disease Backend Started"
    );

    console.log(
      `Server running at http://localhost:${PORT}`
    );

    console.log(
      "Signup API: POST /api/signup"
    );

    console.log(
      "Login API: POST /api/login"
    );

    console.log(
      "Prediction API: POST /api/predict"
    );

    console.log(
      "History API: GET /api/predictions"
    );

    console.log(
      "Delete API: DELETE /api/predictions/:id"
    );

    console.log(
      `AI Service: ${AI_SERVICE_URL}`
    );

    console.log(
      "JWT Authentication: ENABLED"
    );

    console.log(
      "================================="
    );
  }
);
