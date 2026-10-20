import { useEffect, useState } from "react";
import "./App.css";

/* =========================================================
   DISEASE INFORMATION
   38 PlantVillage Classes
========================================================= */

const diseaseInfo = {
  "Apple___Apple_scab": {
    description:
      "Apple scab is a fungal disease that causes olive-green to dark spots on apple leaves and fruits.",
    prevention:
      "Keep the orchard clean, remove fallen leaves, and provide good air circulation.",
    treatment:
      "Use recommended fungicides and remove infected plant material."
  },

  "Apple___Black_rot": {
    description:
      "Black rot is a fungal disease that causes dark lesions on leaves and black rotting areas on fruit.",
    prevention:
      "Remove infected fruits and branches and maintain good orchard sanitation.",
    treatment:
      "Prune infected parts and apply suitable fungicides."
  },

  "Apple___Cedar_apple_rust": {
    description:
      "Cedar apple rust is a fungal disease that produces yellow-orange spots on apple leaves.",
    prevention:
      "Remove nearby infected plant material and maintain good air circulation.",
    treatment:
      "Use appropriate fungicides during the recommended treatment period."
  },

  "Apple___healthy": {
    description:
      "The apple leaf appears healthy with no major disease symptoms detected.",
    prevention:
      "Continue regular watering, nutrition, monitoring, and proper sunlight.",
    treatment:
      "No treatment is required. Continue normal crop care."
  },

  "Blueberry___healthy": {
    description:
      "The blueberry leaf appears healthy with no major disease symptoms detected.",
    prevention:
      "Maintain proper soil moisture, nutrition, sunlight, and air circulation.",
    treatment:
      "No treatment is required. Continue regular crop monitoring."
  },

  "Cherry_(including_sour)___Powdery_mildew": {
    description:
      "Powdery mildew is a fungal disease that creates white powder-like growth on leaves.",
    prevention:
      "Improve air circulation and avoid excessive moisture on leaves.",
    treatment:
      "Remove severely infected leaves and use suitable fungicides if necessary."
  },

  "Cherry_(including_sour)___healthy": {
    description:
      "The cherry leaf appears healthy with no major disease symptoms detected.",
    prevention:
      "Maintain proper watering, nutrition, sunlight, and regular monitoring.",
    treatment:
      "No treatment is required. Continue normal crop care."
  },

  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
    description:
      "Gray leaf spot is a fungal disease that produces rectangular gray or brown lesions on corn leaves.",
    prevention:
      "Use resistant varieties, maintain field sanitation, and avoid excessive leaf moisture.",
    treatment:
      "Use recommended fungicides when disease pressure is high."
  },

  "Corn_(maize)___Common_rust_": {
    description:
      "Common rust produces small reddish-brown rust-colored spots on corn leaves.",
    prevention:
      "Grow resistant varieties and maintain proper field management.",
    treatment:
      "Apply suitable fungicides when required."
  },

  "Corn_(maize)___Northern_Leaf_Blight": {
    description:
      "Northern leaf blight causes long, gray-green or brown lesions on corn leaves.",
    prevention:
      "Use resistant varieties and remove infected crop residues.",
    treatment:
      "Apply recommended fungicides during severe infections."
  },

  "Corn_(maize)___healthy": {
    description:
      "The corn leaf appears healthy with no major disease symptoms detected.",
    prevention:
      "Maintain balanced fertilizer, proper irrigation, and regular monitoring.",
    treatment:
      "No treatment is required."
  },

  "Grape___Black_rot": {
    description:
      "Grape black rot is a fungal disease that causes brown lesions and dark fruit rot.",
    prevention:
      "Remove infected fruits and leaves and maintain good vineyard sanitation.",
    treatment:
      "Prune infected material and apply suitable fungicides."
  },

  "Grape___Esca_(Black_Measles)": {
    description:
      "Esca, also called black measles, is a grapevine disease that can cause leaf symptoms and fruit damage.",
    prevention:
      "Use healthy planting material and remove severely affected plant parts.",
    treatment:
      "Manage infected vines carefully and consult agricultural experts for severe cases."
  },

  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
    description:
      "Grape leaf blight causes dark spots and damaged areas on grape leaves.",
    prevention:
      "Maintain good air circulation and remove infected leaves.",
    treatment:
      "Use recommended fungicides and maintain vineyard sanitation."
  },

  "Grape___healthy": {
    description:
      "The grape leaf appears healthy with no major disease symptoms detected.",
    prevention:
      "Maintain proper irrigation, nutrition, sunlight, and vineyard sanitation.",
    treatment:
      "No treatment is required."
  },

  "Orange___Haunglongbing_(Citrus_greening)": {
    description:
      "Citrus greening is a serious disease that causes uneven yellowing of citrus leaves and affects fruit production.",
    prevention:
      "Use healthy planting material and control insect vectors such as Asian citrus psyllids.",
    treatment:
      "Remove severely affected trees and manage insect vectors according to local agricultural guidance."
  },

  "Peach___Bacterial_spot": {
    description:
      "Peach bacterial spot causes dark lesions on leaves and fruit.",
    prevention:
      "Use resistant varieties and maintain good orchard sanitation.",
    treatment:
      "Use recommended bacterial disease management practices and approved treatments."
  },

  "Peach___healthy": {
    description:
      "The peach leaf appears healthy with no major disease symptoms detected.",
    prevention:
      "Maintain proper watering, nutrition, sunlight, and regular monitoring.",
    treatment:
      "No treatment is required."
  },

  "Pepper,_bell___Bacterial_spot": {
    description:
      "Bacterial spot causes small dark lesions on pepper leaves and fruit.",
    prevention:
      "Use disease-free seeds, avoid overhead watering, and remove infected plants.",
    treatment:
      "Use recommended bacterial disease control methods."
  },

  "Pepper,_bell___healthy": {
    description:
      "The bell pepper leaf appears healthy with no major disease symptoms detected.",
    prevention:
      "Maintain proper irrigation, nutrition, sunlight, and crop hygiene.",
    treatment:
      "No treatment is required."
  },

  "Potato___Early_blight": {
    description:
      "Early blight is a fungal disease that produces dark circular spots on potato leaves.",
    prevention:
      "Maintain good field sanitation, crop rotation, and avoid prolonged leaf wetness.",
    treatment:
      "Remove infected plant material and apply recommended fungicides."
  },

  "Potato___Late_blight": {
    description:
      "Late blight is a serious disease that causes dark water-soaked lesions on potato leaves.",
    prevention:
      "Use resistant varieties, avoid excessive moisture, and monitor crops regularly.",
    treatment:
      "Remove infected material and use appropriate fungicides as recommended."
  },

  "Potato___healthy": {
    description:
      "The potato leaf appears healthy with no major disease symptoms detected.",
    prevention:
      "Maintain proper irrigation, nutrition, sunlight, and field sanitation.",
    treatment:
      "No treatment is required."
  },

  "Raspberry___healthy": {
    description:
      "The raspberry leaf appears healthy with no major disease symptoms detected.",
    prevention:
      "Maintain proper watering, nutrition, sunlight, and air circulation.",
    treatment:
      "No treatment is required."
  },

  "Soybean___healthy": {
    description:
      "The soybean leaf appears healthy with no major disease symptoms detected.",
    prevention:
      "Maintain balanced nutrition, proper irrigation, and regular field monitoring.",
    treatment:
      "No treatment is required."
  },

  "Squash___Powdery_mildew": {
    description:
      "Powdery mildew causes white powder-like fungal growth on squash leaves.",
    prevention:
      "Provide good air circulation and avoid excessive humidity around the leaves.",
    treatment:
      "Remove severely infected leaves and apply suitable fungicides if needed."
  },

  "Strawberry___Leaf_scorch": {
    description:
      "Strawberry leaf scorch causes dark purple or brown spots that can spread across the leaf.",
    prevention:
      "Maintain good air circulation and remove infected leaves.",
    treatment:
      "Remove affected plant material and use appropriate disease management practices."
  },

  "Strawberry___healthy": {
    description:
      "The strawberry leaf appears healthy with no major disease symptoms detected.",
    prevention:
      "Maintain proper watering, nutrition, sunlight, and crop hygiene.",
    treatment:
      "No treatment is required."
  },

  "Tomato___Bacterial_spot": {
    description:
      "Tomato bacterial spot causes small dark spots on leaves and fruit.",
    prevention:
      "Use disease-free seeds, avoid overhead watering, and maintain field sanitation.",
    treatment:
      "Remove severely infected material and follow recommended bacterial disease control."
  },

  "Tomato___Early_blight": {
    description:
      "Tomato early blight causes dark circular lesions with concentric rings on leaves.",
    prevention:
      "Use crop rotation, remove infected leaves, and avoid prolonged leaf wetness.",
    treatment:
      "Remove infected leaves and apply recommended fungicides."
  },

  "Tomato___Late_blight": {
    description:
      "Tomato late blight causes dark irregular lesions and can spread rapidly under humid conditions.",
    prevention:
      "Improve air circulation, avoid overhead watering, and monitor plants regularly.",
    treatment:
      "Remove infected plant material and use appropriate fungicides."
  },

  "Tomato___Leaf_Mold": {
    description:
      "Tomato leaf mold is a fungal disease that causes yellow patches and mold growth on leaves.",
    prevention:
      "Improve ventilation, reduce humidity, and avoid wetting the leaves.",
    treatment:
      "Remove infected leaves and apply suitable fungicides when required."
  },

  "Tomato___Septoria_leaf_spot": {
    description:
      "Septoria leaf spot causes small circular spots with dark borders on tomato leaves.",
    prevention:
      "Remove infected leaves, avoid overhead watering, and maintain crop sanitation.",
    treatment:
      "Use recommended fungicides and remove severely affected leaves."
  },

  "Tomato___Spider_mites Two-spotted_spider_mite": {
    description:
      "Two-spotted spider mites are tiny pests that cause yellowing, speckling, and leaf damage.",
    prevention:
      "Monitor the underside of leaves and maintain adequate plant moisture.",
    treatment:
      "Use appropriate mite-control methods and approved miticides when necessary."
  },

  "Tomato___Target_Spot": {
    description:
      "Target spot is a fungal disease that produces circular brown lesions on tomato leaves.",
    prevention:
      "Improve air circulation and avoid prolonged moisture on leaves.",
    treatment:
      "Remove infected leaves and apply recommended fungicides."
  },

  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
    description:
      "Tomato yellow leaf curl virus causes yellowing, curling, and reduced plant growth.",
    prevention:
      "Control whiteflies, use healthy seedlings, and remove infected plants.",
    treatment:
      "There is no direct cure; control insect vectors and remove severely infected plants."
  },

  "Tomato___Tomato_mosaic_virus": {
    description:
      "Tomato mosaic virus can cause mottled leaves, distorted growth, and reduced plant development.",
    prevention:
      "Use disease-free seeds, sanitize tools, and remove infected plants.",
    treatment:
      "There is no direct cure; remove infected plants and prevent virus spread."
  },

  "Tomato___healthy": {
    description:
      "The tomato leaf appears healthy with no major disease symptoms detected.",
    prevention:
      "Maintain proper watering, nutrition, sunlight, and regular crop monitoring.",
    treatment:
      "No treatment is required. Continue normal crop care."
  }
};

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  /* =======================================================
     IMAGE & PREDICTION STATE
  ======================================================= */

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  /* =======================================================
     AUTHENTICATION STATE
  ======================================================= */

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("cropUser");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [authMode, setAuthMode] = useState(null);

  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  /* =======================================================
     DASHBOARD ANALYTICS
  ======================================================= */

  const sortedHistory = [...history].sort(
    (a, b) =>
      new Date(b.createdAt || 0) -
      new Date(a.createdAt || 0)
  );

  const totalPredictions = history.length;

  const healthyPredictions = history.filter((item) =>
    item.prediction?.toLowerCase().includes("healthy")
  ).length;

  const diseasedPredictions =
    totalPredictions - healthyPredictions;

  const healthyPercentage =
    totalPredictions > 0
      ? (healthyPredictions / totalPredictions) * 100
      : 0;

  const diseasedPercentage =
    totalPredictions > 0
      ? (diseasedPredictions / totalPredictions) * 100
      : 0;

  const averageConfidence =
    totalPredictions > 0
      ? history.reduce(
          (sum, item) =>
            sum + Number(item.confidence || 0),
          0
        ) / totalPredictions
      : 0;

  const latestPrediction = sortedHistory[0] || null;

  /* =======================================================
     HELPER FUNCTIONS
  ======================================================= */

  const formatDiseaseName = (name) => {
    if (!name) return "Unknown";

    return name
      .replaceAll("___", " - ")
      .replaceAll("_", " ")
      .replaceAll(",", "")
      .replaceAll("(", "")
      .replaceAll(")", "");
  };

  const getDiseaseDetails = (predictionName) => {
    if (!predictionName) {
      return {
        description:
          "No disease information available.",
        prevention:
          "Please monitor the crop regularly.",
        treatment:
          "Consult an agricultural expert if symptoms continue."
      };
    }

    return (
      diseaseInfo[predictionName] || {
        description:
          "Disease information is not available for this prediction.",
        prevention:
          "Maintain proper crop care and monitor the plant regularly.",
        treatment:
          "Consult an agricultural expert for appropriate treatment."
      }
    );
  };

  const getConfidenceLabel = (confidence) => {
    const value = Number(confidence || 0);

    if (value >= 80) return "High Confidence";
    if (value >= 60) return "Moderate Confidence";

    return "Low Confidence";
  };

  const isHealthy = (predictionName) => {
    return predictionName?.toLowerCase().includes("healthy");
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString();
  };

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const goHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  /* =======================================================
     HISTORY FETCH
  ======================================================= */

  const fetchHistory = async () => {
    const token = localStorage.getItem("cropToken");

    if (!token) {
      setHistory([]);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/predictions",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to fetch history"
        );
      }

      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("History error:", err);
    }
  };

  /* =======================================================
     LOAD HISTORY AFTER LOGIN
  ======================================================= */

  useEffect(() => {
    if (user) {
      fetchHistory();
    } else {
      setHistory([]);
    }
  }, [user]);

  /* =======================================================
     CLEANUP IMAGE PREVIEW
  ======================================================= */

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /* =======================================================
     FILE SELECTION
  ======================================================= */

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setPrediction(null);

    if (!file.type.startsWith("image/")) {
      setSelectedFile(null);
      setPreview(null);
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setSelectedFile(null);
      setPreview(null);
      setError("Image size must be less than 10 MB.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const imageUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreview(imageUrl);
  };

  /* =======================================================
     PREDICT DISEASE
  ======================================================= */

  const handlePredict = async () => {
    if (!user) {
      setAuthError("");
      setAuthMode("login");
      return;
    }

    if (!selectedFile) {
      setError("Please select a crop leaf image first.");
      return;
    }

    const token = localStorage.getItem("cropToken");

    if (!token) {
      setError("Please login again.");
      setAuthMode("login");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setPrediction(null);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        "http://localhost:5000/api/predict",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Prediction failed."
        );
      }

      setPrediction(data);

      await fetchHistory();

      setTimeout(() => {
        scrollToSection("prediction-result");
      }, 100);
    } catch (err) {
      console.error("Prediction error:", err);

      setError(
        err.message ||
          "Something went wrong while predicting the disease."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     DELETE PREDICTION
  ======================================================= */

  const handleDeletePrediction = async (predictionId) => {
    if (!predictionId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this prediction?"
    );

    if (!confirmed) return;

    const token = localStorage.getItem("cropToken");

    if (!token) {
      setError("Please login again.");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/predictions/${predictionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete prediction."
        );
      }

      setHistory((currentHistory) =>
        currentHistory.filter(
          (item) => item._id !== predictionId
        )
      );

      if (
        prediction &&
        prediction._id === predictionId
      ) {
        setPrediction(null);
      }
    } catch (err) {
      console.error("Delete error:", err);

      setError(
        err.message ||
          "Failed to delete prediction."
      );
    }
  };

  /* =======================================================
     AUTHENTICATION
  ======================================================= */

  const handleAuth = async (event) => {
    event.preventDefault();

    setAuthError("");

    const email = authForm.email.trim().toLowerCase();
    const password = authForm.password;

    if (!email || !password) {
      setAuthError(
        "Please enter your email and password."
      );
      return;
    }

    if (
      authMode === "signup" &&
      !authForm.name.trim()
    ) {
      setAuthError("Please enter your name.");
      return;
    }

    try {
      setAuthLoading(true);

      const endpoint =
        authMode === "signup"
          ? "http://localhost:5000/api/signup"
          : "http://localhost:5000/api/login";

      const body =
        authMode === "signup"
          ? {
              name: authForm.name.trim(),
              email,
              password
            }
          : {
              email,
              password
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Authentication failed."
        );
      }

      /* ---------------- SIGNUP ---------------- */

      if (authMode === "signup") {
        setAuthMode("login");

        setAuthError(
          "Account created successfully. Please login."
        );

        setAuthForm({
          name: "",
          email,
          password: ""
        });

        return;
      }

      /* ---------------- LOGIN ---------------- */

      if (!data.token) {
        throw new Error(
          "Login successful, but authentication token was not received."
        );
      }

      localStorage.setItem(
        "cropToken",
        data.token
      );

      const loggedInUser =
        data.user || {
          name:
            authForm.name ||
            email.split("@")[0],
          email
        };

      localStorage.setItem(
        "cropUser",
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);

      setAuthForm({
        name: "",
        email: "",
        password: ""
      });

      setAuthError("");
      setAuthMode(null);
    } catch (err) {
      console.error("Auth error:", err);

      setAuthError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setAuthLoading(false);
    }
  };

  /* =======================================================
     LOGIN / SIGNUP MODAL
  ======================================================= */

  const openLogin = () => {
    setAuthMode("login");
    setAuthError("");
  };

  const openSignup = () => {
    setAuthMode("signup");
    setAuthError("");
  };

  const closeAuthModal = () => {
    if (authLoading) return;

    setAuthMode(null);
    setAuthError("");
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    localStorage.removeItem("cropToken");
    localStorage.removeItem("cropUser");

    setUser(null);
    setHistory([]);
    setPrediction(null);
    setSelectedFile(null);
    setPreview(null);
    setError("");
    setAuthMode(null);
  };

  /* =======================================================
     DASHBOARD NAVIGATION
  ======================================================= */

  const handleDashboardNavigation = () => {
    if (!user) {
      openLogin();
      return;
    }

    scrollToSection("dashboard");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="app">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="navbar">
        <div className="navbar-container">

          <button
            className="logo"
            onClick={goHome}
            type="button"
          >
            🌿 CropCare AI
          </button>

          <div className="nav-links">

            <button
              type="button"
              onClick={goHome}
            >
              Home
            </button>

            <button
              type="button"
              onClick={handleDashboardNavigation}
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={() =>
                scrollToSection("detection")
              }
            >
              Disease Detection
            </button>

            <button
              type="button"
              onClick={() =>
                scrollToSection("history")
              }
            >
              History
            </button>

            <button
              type="button"
              onClick={() =>
                scrollToSection("about")
              }
            >
              About
            </button>

          </div>

          <div className="nav-auth">

            {user ? (
              <>
                <span className="user-name">
                  👋 {user.name}
                </span>

                <button
                  className="logout-btn"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="login-btn"
                  type="button"
                  onClick={openLogin}
                >
                  Login
                </button>

                <button
                  className="signup-btn"
                  type="button"
                  onClick={openSignup}
                >
                  Sign Up
                </button>
              </>
            )}

          </div>

        </div>
      </nav>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="hero" id="home">

        <div className="hero-content">

          <div className="hero-text">

            <span className="hero-tag">
              🤖 AI-Powered Agriculture
            </span>

            <h1>
              Detect Crop Diseases
              <br />
              <span>Before They Spread</span>
            </h1>

            <p>
              Upload a crop leaf image and let our
              AI-powered CNN model identify possible
              diseases quickly and accurately.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                type="button"
                onClick={() =>
                  scrollToSection("detection")
                }
              >
                🔍 Detect Disease
              </button>

              {!user && (
                <button
                  className="secondary-btn"
                  type="button"
                  onClick={openSignup}
                >
                  Create Account
                </button>
              )}

            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-plant-card">

              <div className="hero-plant-icon">
                🌱
              </div>

              <div className="hero-scan-line"></div>

              <div className="hero-ai-badge">
                ✨ AI Analysis
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          DASHBOARD
      ===================================================== */}

      {user && (
        <section
          className="dashboard-section"
          id="dashboard"
        >

          <div className="dashboard-header">

            <div>
              <span className="section-tag">
                📊 Your Dashboard
              </span>

              <h2>
                Welcome back, {user.name}!
              </h2>

              <p>
                Track your crop health and AI
                prediction activity.
              </p>
            </div>

            <button
              className="primary-btn"
              type="button"
              onClick={() =>
                scrollToSection("detection")
              }
            >
              + New Detection
            </button>

          </div>

          {/* BASIC STATISTICS */}

          <div className="dashboard-cards">

            <div className="dashboard-card">
              <div className="dashboard-icon">
                🔬
              </div>

              <div>
                <span>
                  Total Predictions
                </span>

                <strong>
                  {totalPredictions}
                </strong>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-icon">
                🌱
              </div>

              <div>
                <span>
                  Healthy Crops
                </span>

                <strong>
                  {healthyPredictions}
                </strong>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-icon">
                🦠
              </div>

              <div>
                <span>
                  Diseased Crops
                </span>

                <strong>
                  {diseasedPredictions}
                </strong>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-icon">
                🎯
              </div>

              <div>
                <span>
                  Average Confidence
                </span>

                <strong>
                  {averageConfidence.toFixed(1)}%
                </strong>
              </div>
            </div>

          </div>

          {/* ADVANCED ANALYTICS */}

          <div className="dashboard-analytics">

            <div className="analytics-grid">

              {/* HEALTH CHART */}

              <div className="analytics-card analytics-chart-card">

                <div className="analytics-card-header">
                  <div>
                    <h3>
                      Crop Health Overview
                    </h3>

                    <p>
                      Healthy vs diseased predictions
                    </p>
                  </div>

                  <span>📈</span>
                </div>

                <div className="chart-layout">

                  <div
                    className="health-chart-circle"
                    style={{
                      background: `conic-gradient(
                        #2f7d46 0 ${healthyPercentage}%,
                        #e05252 ${healthyPercentage}% 100%
                      )`
                    }}
                  >
                    <div className="health-chart-inner">
                      <strong>
                        {healthyPercentage.toFixed(0)}%
                      </strong>

                      <span>
                        Healthy
                      </span>
                    </div>
                  </div>

                  <div className="chart-legend">

                    <div className="legend-item">

                      <span
                        className="legend-dot"
                        style={{
                          background: "#2f7d46"
                        }}
                      ></span>

                      <div>
                        <strong>
                          Healthy
                        </strong>

                        <span>
                          {healthyPredictions} predictions
                        </span>
                      </div>

                      <b>
                        {healthyPercentage.toFixed(1)}%
                      </b>

                    </div>

                    <div className="legend-item">

                      <span
                        className="legend-dot"
                        style={{
                          background: "#e05252"
                        }}
                      ></span>

                      <div>
                        <strong>
                          Diseased
                        </strong>

                        <span>
                          {diseasedPredictions} predictions
                        </span>
                      </div>

                      <b>
                        {diseasedPercentage.toFixed(1)}%
                      </b>

                    </div>

                  </div>

                </div>

              </div>

              {/* LATEST PREDICTION */}

              <div className="analytics-card latest-prediction-card">

                <div className="analytics-card-header">

                  <div>
                    <h3>
                      Latest Prediction
                    </h3>

                    <p>
                      Most recent AI analysis
                    </p>
                  </div>

                  <span>🕐</span>

                </div>

                {latestPrediction ? (

                  <div className="latest-prediction-content">

                    <div
                      className={
                        isHealthy(
                          latestPrediction.prediction
                        )
                          ? "latest-prediction-badge healthy"
                          : "latest-prediction-badge diseased"
                      }
                    >
                      {isHealthy(
                        latestPrediction.prediction
                      )
                        ? "🌱 Healthy"
                        : "🦠 Disease Detected"}
                    </div>

                    <h4>
                      {formatDiseaseName(
                        latestPrediction.prediction
                      )}
                    </h4>

                    <p>
                      {latestPrediction.filename ||
                        "Uploaded crop image"}
                    </p>

                    <div className="latest-prediction-details">

                      <span>
                        🎯{" "}
                        {Number(
                          latestPrediction.confidence || 0
                        ).toFixed(1)}
                        % confidence
                      </span>

                      <span>
                        📅{" "}
                        {formatDate(
                          latestPrediction.createdAt
                        )}
                      </span>

                    </div>

                    <button
                      className="secondary-btn"
                      type="button"
                      onClick={() =>
                        scrollToSection("history")
                      }
                    >
                      View History →
                    </button>

                  </div>

                ) : (

                  <div className="analytics-empty">

                    <div>🌱</div>

                    <h4>
                      No predictions yet
                    </h4>

                    <p>
                      Upload a crop leaf image to
                      start your first AI analysis.
                    </p>

                    <button
                      className="primary-btn"
                      type="button"
                      onClick={() =>
                        scrollToSection("detection")
                      }
                    >
                      Start Detection
                    </button>

                  </div>

                )}

              </div>

            </div>

            {/* RECENT ACTIVITY */}

            <div className="dashboard-recent">

              <div className="recent-header">

                <div>
                  <h3>
                    Recent Activity
                  </h3>

                  <p>
                    Your latest crop disease predictions
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    scrollToSection("history")
                  }
                >
                  View All →
                </button>

              </div>

              {sortedHistory.length > 0 ? (

                <div className="recent-list">

                  {sortedHistory
                    .slice(0, 5)
                    .map((item) => (

                      <div
                        className="recent-item"
                        key={item._id}
                      >

                        <div className="recent-icon">
                          {isHealthy(item.prediction)
                            ? "🌱"
                            : "🦠"}
                        </div>

                        <div className="recent-info">

                          <strong>
                            {formatDiseaseName(
                              item.prediction
                            )}
                          </strong>

                          <span>
                            {item.filename ||
                              "Crop image"}
                          </span>

                        </div>

                        <div className="recent-confidence">

                          <strong>
                            {Number(
                              item.confidence || 0
                            ).toFixed(1)}
                            %
                          </strong>

                          <span>
                            {formatDate(
                              item.createdAt
                            )}
                          </span>

                        </div>

                      </div>

                    ))}

                </div>

              ) : (

                <div className="dashboard-empty">

                  <div>📋</div>

                  <h4>
                    No recent activity
                  </h4>

                  <p>
                    Your prediction history will
                    appear here.
                  </p>

                </div>

              )}

            </div>

          </div>

        </section>
      )}

      {/* =====================================================
          DISEASE DETECTION
      ===================================================== */}

      <section
        className="detection-section"
        id="detection"
      >

        <div className="section-heading">

          <span className="section-tag">
            🔬 AI Disease Detection
          </span>

          <h2>
            Analyze Your Crop Leaf
          </h2>

          <p>
            Upload a clear image of a crop leaf
            and our CNN model will analyze it.
          </p>

        </div>

        {!user ? (

          <div className="login-required-card">

            <div className="login-required-icon">
              🔐
            </div>

            <h3>
              Login Required
            </h3>

            <p>
              Please login or create an account
              before using disease detection.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                type="button"
                onClick={openLogin}
              >
                Login
              </button>

              <button
                className="secondary-btn"
                type="button"
                onClick={openSignup}
              >
                Create Account
              </button>

            </div>

          </div>

        ) : (

          <div className="upload-card">

            <div className="upload-area">

              <input
                id="crop-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              <label htmlFor="crop-image">

                {!preview ? (
                  <>
                    <div className="upload-icon">
                      📷
                    </div>

                    <h3>
                      Upload Crop Leaf Image
                    </h3>

                    <p>
                      Click here to choose an image
                    </p>

                    <span>
                      JPG, JPEG, PNG • Max 10 MB
                    </span>
                  </>
                ) : (

                  <div className="preview-container">

                    <img
                      src={preview}
                      alt="Selected crop leaf"
                      className="preview-image"
                    />

                    <p>
                      {selectedFile?.name}
                    </p>

                  </div>

                )}

              </label>

            </div>

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            <button
              className="predict-btn"
              type="button"
              onClick={handlePredict}
              disabled={loading || !selectedFile}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  🔍 Predict Disease
                </>
              )}
            </button>

          </div>

        )}

      </section>

      {/* =====================================================
          PREDICTION RESULT
      ===================================================== */}

      {prediction && (
        <section
          className="prediction-result-section"
          id="prediction-result"
        >

          <div className="section-heading">

            <span className="section-tag">
              🤖 AI Analysis Result
            </span>

            <h2>
              Prediction Result
            </h2>

          </div>

          <div className="prediction-result">

            <div className="result-header">

              <div>

                <span className="result-label">
                  Detected Condition
                </span>

                <h3>
                  {formatDiseaseName(
                    prediction.prediction
                  )}
                </h3>

              </div>

              <div
                className={
                  isHealthy(prediction.prediction)
                    ? "result-status healthy"
                    : "result-status diseased"
                }
              >
                {isHealthy(prediction.prediction)
                  ? "🌱 Healthy"
                  : "🦠 Disease Detected"}
              </div>

            </div>

            <div className="result-content">

              <div className="result-image-container">

                <img
                  src={preview}
                  alt="Analyzed crop leaf"
                  className="result-image"
                />

              </div>

              <div className="result-details">

                <div className="confidence-header">

                  <div>
                    <span>
                      AI Confidence
                    </span>

                    <strong>
                      {Number(
                        prediction.confidence || 0
                      ).toFixed(1)}
                      %
                    </strong>
                  </div>

                  <span
                    className={`confidence-status ${
                      Number(prediction.confidence || 0) >=
                      80
                        ? "high"
                        : Number(
                            prediction.confidence || 0
                          ) >= 60
                        ? "moderate"
                        : "low"
                    }`}
                  >
                    {getConfidenceLabel(
                      prediction.confidence
                    )}
                  </span>

                </div>

                <div className="confidence-bar">

                  <div
                    className="confidence-fill"
                    style={{
                      width: `${Number(
                        prediction.confidence || 0
                      )}%`
                    }}
                  ></div>

                </div>

                <div className="disease-details">

                  <div className="detail-card">

                    <div className="detail-icon">
                      📋
                    </div>

                    <div>
                      <h4>
                        Description
                      </h4>

                      <p>
                        {
                          getDiseaseDetails(
                            prediction.prediction
                          ).description
                        }
                      </p>
                    </div>

                  </div>

                  <div className="detail-card">

                    <div className="detail-icon">
                      🛡️
                    </div>

                    <div>
                      <h4>
                        Prevention
                      </h4>

                      <p>
                        {
                          getDiseaseDetails(
                            prediction.prediction
                          ).prevention
                        }
                      </p>
                    </div>

                  </div>

                  <div className="detail-card">

                    <div className="detail-icon">
                      💊
                    </div>

                    <div>
                      <h4>
                        Treatment
                      </h4>

                      <p>
                        {
                          getDiseaseDetails(
                            prediction.prediction
                          ).treatment
                        }
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>


            {/* TOP 3 AI PREDICTIONS */}
            {prediction?.top_predictions &&
              prediction.top_predictions.length > 0 && (
                <div className="top-predictions-card">
                  <div className="top-predictions-header">
                    <span className="top-predictions-icon">🤖</span>

                    <div>
                      <h3>Top 3 AI Predictions</h3>
                      <p>
                        Other possible results identified by the CNN model
                      </p>
                    </div>
                  </div>

                  <div className="top-predictions-list">
                    {prediction.top_predictions.map((item, index) => (
                      <div
                        className="top-prediction-item"
                        key={`${item.disease}-${index}`}
                      >
                        <div className="top-prediction-rank">
                          {index === 0
                            ? "🥇"
                            : index === 1
                            ? "🥈"
                            : "🥉"}
                        </div>

                        <div className="top-prediction-info">
                          <strong>
                            {formatDiseaseName(item.disease)}
                          </strong>

                          <div className="top-prediction-bar">
                            <div
                              className="top-prediction-bar-fill"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.max(0, Number(item.confidence || 0))
                                )}%`
                              }}
                            ></div>
                          </div>
                        </div>

                        <span className="top-prediction-confidence">
                          {Number(item.confidence || 0).toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* AI ASSISTANCE NOTICE */}
            <div className="ai-safety-notice">
              <span className="ai-safety-icon">⚠️</span>

              <div className="ai-safety-content">
                <h4>AI Assistance Notice</h4>
                <p>
                  This prediction is generated by an AI model and should be
                  used as a preliminary reference. For serious crop problems,
                  please consult an agricultural expert.
                </p>
              </div>
            </div>

        </section>
      )}

      {/* =====================================================
          HISTORY
      ===================================================== */}

      <section
        className="history-section"
        id="history"
      >

        <div className="section-heading">

          <span className="section-tag">
            📜 Prediction History
          </span>

          <h2>
            Your Previous Predictions
          </h2>

          <p>
            Review your previous crop disease
            detection results.
          </p>

        </div>

        {!user ? (

          <div className="login-required-card">

            <div className="login-required-icon">
              🔐
            </div>

            <h3>
              Login Required
            </h3>

            <p>
              Login to view your prediction history.
            </p>

            <button
              className="primary-btn"
              type="button"
              onClick={openLogin}
            >
              Login
            </button>

          </div>

        ) : history.length === 0 ? (

          <div className="history-empty">

            <div className="history-empty-icon">
              📋
            </div>

            <h3>
              No Predictions Yet
            </h3>

            <p>
              Your AI prediction history will
              appear here after your first detection.
            </p>

            <button
              className="primary-btn"
              type="button"
              onClick={() =>
                scrollToSection("detection")
              }
            >
              Start Detection
            </button>

          </div>

        ) : (

          <div className="history-list">

            {sortedHistory.map((item) => (

              <div
                className="history-item"
                key={item._id}
              >

                <div className="history-item-icon">
                  {isHealthy(item.prediction)
                    ? "🌱"
                    : "🦠"}
                </div>

                <div className="history-info">

                  <h3>
                    {formatDiseaseName(
                      item.prediction
                    )}
                  </h3>

                  <p>
                    📁{" "}
                    {item.filename ||
                      "Crop image"}
                  </p>

                  <span>
                    📅{" "}
                    {formatDate(
                      item.createdAt
                    )}
                  </span>

                </div>

                <div className="history-confidence">

                  <strong>
                    {Number(
                      item.confidence || 0
                    ).toFixed(1)}
                    %
                  </strong>

                  <span>
                    {getConfidenceLabel(
                      item.confidence
                    )}
                  </span>

                </div>

                <div className="history-actions">

                  <button
                    className="delete-history-btn"
                    type="button"
                    onClick={() =>
                      handleDeletePrediction(
                        item._id
                      )
                    }
                    title="Delete prediction"
                  >
                    🗑️
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        className="about-section"
        id="about"
      >

        <div className="section-heading">

          <span className="section-tag">
            🌿 About CropCare AI
          </span>

          <h2>
            Smart Agriculture with AI
          </h2>

          <p>
            CropCare AI uses deep learning to help
            identify crop diseases from leaf images.
          </p>

        </div>

        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🤖
            </div>

            <h3>
              CNN-Based AI
            </h3>

            <p>
              A Convolutional Neural Network analyzes
              crop leaf images and predicts possible
              diseases.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              ⚡
            </div>

            <h3>
              Fast Detection
            </h3>

            <p>
              Upload an image and receive an AI
              prediction within seconds.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Prediction History
            </h3>

            <p>
              Save and review previous predictions
              using your personal dashboard.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              🛡️
            </div>

            <h3>
              Disease Guidance
            </h3>

            <p>
              Get basic information about disease
              symptoms, prevention, and treatment.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">

        <div className="footer-content">

          <div>
            <h3>
              🌿 CropCare AI
            </h3>

            <p>
              AI-powered crop disease detection
              for smarter agriculture.
            </p>
          </div>

          <div>
            <p>
              © 2026 CropCare AI. All rights reserved.
            </p>
          </div>

        </div>

      </footer>

      {/* =====================================================
          LOGIN / SIGNUP MODAL
      ===================================================== */}

      {authMode && (

        <div
          className="auth-modal-overlay"
          onClick={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeAuthModal();
            }
          }}
        >

          <div className="auth-modal">

            <button
              className="auth-close"
              type="button"
              onClick={closeAuthModal}
              disabled={authLoading}
            >
              ✕
            </button>

            <div className="auth-header">

              <div className="auth-icon">
                {authMode === "login"
                  ? "🔐"
                  : "🌱"}
              </div>

              <h2>
                {authMode === "login"
                  ? "Welcome Back"
                  : "Create Account"}
              </h2>

              <p>
                {authMode === "login"
                  ? "Login to continue to CropCare AI."
                  : "Create an account to start detecting crop diseases."}
              </p>

            </div>

            <form
              className="auth-form"
              onSubmit={handleAuth}
            >

              {authMode === "signup" && (

                <div className="form-group">

                  <label htmlFor="auth-name">
                    Full Name
                  </label>

                  <input
                    id="auth-name"
                    type="text"
                    placeholder="Enter your name"
                    value={authForm.name}
                    onChange={(event) =>
                      setAuthForm({
                        ...authForm,
                        name: event.target.value
                      })
                    }
                    disabled={authLoading}
                  />

                </div>

              )}

              <div className="form-group">

                <label htmlFor="auth-email">
                  Email
                </label>

                <input
                  id="auth-email"
                  type="email"
                  placeholder="Enter your email"
                  value={authForm.email}
                  onChange={(event) =>
                    setAuthForm({
                      ...authForm,
                      email: event.target.value
                    })
                  }
                  disabled={authLoading}
                />

              </div>

              <div className="form-group">

                <label htmlFor="auth-password">
                  Password
                </label>

                <input
                  id="auth-password"
                  type="password"
                  placeholder="Enter your password"
                  value={authForm.password}
                  onChange={(event) =>
                    setAuthForm({
                      ...authForm,
                      password: event.target.value
                    })
                  }
                  disabled={authLoading}
                />

              </div>

              {authError && (
                <div className="auth-error">
                  ⚠️ {authError}
                </div>
              )}

              <button
                className="auth-submit-btn"
                type="submit"
                disabled={authLoading}
              >
                {authLoading ? (
                  <>
                    <span className="spinner"></span>
                    Please wait...
                  </>
                ) : authMode === "login" ? (
                  "Login"
                ) : (
                  "Create Account"
                )}
              </button>

            </form>

            <div className="auth-switch">

              {authMode === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={openSignup}
                    disabled={authLoading}
                  >
                    Sign Up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={openLogin}
                    disabled={authLoading}
                  >
                    Login
                  </button>
                </p>
              )}

            </div>

          </div>

        </div>

      )}
    </div>
  );
}

export default App;
