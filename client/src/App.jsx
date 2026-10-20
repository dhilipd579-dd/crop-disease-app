import { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
).replace(/\/+$/, "");

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
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [capturedFile, setCapturedFile] = useState(null);
  const videoRef = useRef(null);
  const [assistantLanguage, setAssistantLanguage] = useState("en-US");
  const [assistantText, setAssistantText] = useState("");
  const [assistantError, setAssistantError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => () => {
    recognitionRef.current?.abort?.();
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }

    return () => cameraStream?.getTracks().forEach((track) => track.stop());
  }, [cameraStream]);

  useEffect(() => {
    return () => {
      if (capturedPhoto) URL.revokeObjectURL(capturedPhoto);
    };
  }, [capturedPhoto]);

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
     MODERN UI STATE
  ======================================================= */

  const [currentPage, setCurrentPage] = useState("home");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("cropDarkMode") === "true";
  });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileEditing, setProfileEditing] = useState(false);
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("cropDarkMode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (user) {
      setProfileName(user.name || "");
    }
  }, [user]);

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

  const getTopPredictions = (item) => {
    const topPredictions = Array.isArray(item?.topPredictions)
      ? item.topPredictions
      : Array.isArray(item?.top_predictions)
      ? item.top_predictions
      : [];

    return topPredictions
      .filter(
        (topItem) =>
          topItem &&
          topItem.disease !== undefined &&
          topItem.confidence !== undefined
      )
      .slice(0, 3);
  };

  const explainCurrentPrediction = () => {
    if (!prediction) return "";
    const details = getDiseaseDetails(prediction.prediction);
    const top = getTopPredictions(prediction);
    const alternatives = top.length
      ? top.map((item, index) => `${index + 1}. ${formatDiseaseName(item.disease)} (${Number(item.confidence || 0).toFixed(1)}%)`).join("; ")
      : "No alternative predictions were provided by the model.";
    if (assistantLanguage === "ta-IN") {
      return `தாவர நோய் கணிப்பு: ${formatDiseaseName(prediction.prediction)}. நம்பகத்தன்மை ${Number(prediction.confidence || 0).toFixed(1)} சதவீதம். ${details.description} தடுப்பு: ${details.prevention} பரிந்துரைக்கப்பட்ட பராமரிப்பு: ${details.treatment} முதல் மூன்று கணிப்புகள்: ${alternatives}. இது மாதிரியின் கணிப்பு மட்டுமே; உறுதியான நோய் கண்டறிதல் அல்ல. வேளாண் நிபுணரிடம் ஆலோசிக்கவும்.`;
    }
    return `The model predicts ${formatDiseaseName(prediction.prediction)} with ${Number(prediction.confidence || 0).toFixed(1)} percent confidence. ${details.description} Prevention: ${details.prevention} Suggested care: ${details.treatment} Top predictions: ${alternatives}. This is a model prediction, not a confirmed diagnosis. Please consult an agricultural expert.`;
  };

  const speakAssistantText = (text) => {
    if (!text) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setAssistantError("Spoken output is unavailable in this browser. You can read the explanation in the text box.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = assistantLanguage;
    window.speechSynthesis.speak(utterance);
  };

  const showPredictionExplanation = () => {
    const explanation = explainCurrentPrediction();
    setAssistantText(explanation);
    setAssistantError("");
    speakAssistantText(explanation);
  };

  const stopAssistantSpeech = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
  };

  const startVoiceQuestion = () => {
    setAssistantError("");
    const Recognition = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!Recognition) {
      setAssistantError(assistantLanguage === "ta-IN" ? "இந்த உலாவியில் குரல் உள்ளீடு கிடைக்கவில்லை. தயவுசெய்து தட்டச்சு செய்யவும்." : "Voice input is unavailable in this browser. Please type your question instead.");
      return;
    }
    recognitionRef.current?.abort?.();
    const recognition = new Recognition();
    recognitionRef.current = recognition;
    recognition.lang = assistantLanguage;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => setAssistantText(event.results?.[0]?.[0]?.transcript || "");
    recognition.onerror = (event) => setAssistantError(event.error === "not-allowed" ? "Microphone permission was denied. You can type your question instead." : "Voice input stopped. You can type your question instead.");
    recognition.onend = () => setIsListening(false);
    try { recognition.start(); setIsListening(true); }
    catch { setAssistantError("Could not start voice input. Please try again or type your question."); setIsListening(false); }
  };

  const readImageForReport = async () => {
    const file = selectedFile;
    if (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error || new Error("Unable to read image."));
        reader.readAsDataURL(file);
      });
    }

    if (preview) {
      const response = await fetch(preview);
      if (!response.ok) throw new Error("Unable to load image preview.");
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error || new Error("Unable to read image preview."));
        reader.readAsDataURL(blob);
      });
    }

    return null;
  };

  // Download the current AI prediction as a formatted PDF report.
  const downloadPredictionReport = async () => {
    if (!prediction) {
      alert("Please analyze a crop leaf first.");
      return;
    }

    try {
      const details = getDiseaseDetails(prediction.prediction);
      const topPredictions = getTopPredictions(prediction);
      const reportDate = new Date().toLocaleString();
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 18;
      const contentWidth = pageWidth - margin * 2;
      let imageData = null;
      try {
        imageData = await readImageForReport();
      } catch (imageError) {
        console.warn("Prediction image could not be added to the PDF:", imageError);
      }
      let y = 20;

      const ensureSpace = (neededHeight = 12) => {
        if (y + neededHeight > pageHeight - 18) {
          doc.addPage();
          y = 20;
        }
      };

      const addSection = (heading, body) => {
        const bodyText = String(body || "Not available.");
        const lines = doc.splitTextToSize(bodyText, contentWidth);
        ensureSpace(14 + lines.length * 5.5);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(35, 105, 62);
        doc.text(heading, margin, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(45, 55, 45);
        for (const line of lines) {
          ensureSpace(6);
          doc.text(line, margin, y);
          y += 5.2;
        }
        y += 5;
      };

      // Report header
      doc.setFillColor(21, 83, 53);
      doc.rect(0, 0, pageWidth, 42, "F");
      doc.setFillColor(128, 190, 91);
      doc.rect(0, 42, pageWidth, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("CropCare AI", margin, 18);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("CROP HEALTH ASSESSMENT  /  PREDICTION REPORT", margin, 27);
      doc.setFontSize(9);
      doc.text(`Generated ${reportDate}`, pageWidth - margin, 18, { align: "right" });
      y = 54;

      // Image and prediction summary
      const summaryHeight = 62;
      doc.setFillColor(244, 248, 243);
      doc.roundedRect(margin, y, contentWidth, summaryHeight, 3, 3, "F");
      let summaryTextX = margin + 8;
      const imageBox = { x: margin + 5, y: y + 5, w: 52, h: 52 };
      if (imageData) {
        try {
          const imageFormat = String(imageData).startsWith("data:image/png") ? "PNG" : "JPEG";
          doc.addImage(imageData, imageFormat, imageBox.x, imageBox.y, imageBox.w, imageBox.h, undefined, "FAST");
          summaryTextX = imageBox.x + imageBox.w + 8;
        } catch (imageError) {
          console.warn("Prediction image format could not be added to the PDF:", imageError);
        }
      }
      const summaryWidth = margin + contentWidth - 7 - summaryTextX;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(91, 111, 95);
      doc.text("PREDICTED CONDITION", summaryTextX, y + 14);
      doc.setFontSize(13);
      doc.setTextColor(28, 67, 43);
      const predictedLines = doc.splitTextToSize(formatDiseaseName(prediction.prediction), summaryWidth);
      doc.text(predictedLines.slice(0, 2), summaryTextX, y + 23);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(73, 88, 76);
      doc.text("AI confidence", summaryTextX, y + 43);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.setTextColor(35, 105, 62);
      doc.text(`${Number(prediction.confidence || 0).toFixed(2)}%`, summaryTextX, y + 52);
      y += summaryHeight + 10;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(35, 75, 45);
      doc.text("Prediction Summary", margin, y);
      y += 9;
      doc.setDrawColor(218, 228, 217);
      doc.line(margin, y - 3, pageWidth - margin, y - 3);
      y += 2;

      addSection(
        "Top 3 AI Predictions",
        topPredictions.length
          ? topPredictions.map((item, index) =>
              `${index + 1}. ${formatDiseaseName(item.disease)} - ${Number(item.confidence || 0).toFixed(2)}%`
            ).join("\n")
          : "Top predictions are not available."
      );
      addSection("Disease Description", details.description);
      addSection("Prevention", details.prevention);
      addSection("Treatment Guidance", details.treatment);
      addSection(
        "Important Note",
        "This is an AI prediction, not a confirmed diagnosis and not a substitute for expert agricultural advice. AI results may be incorrect. Consult a qualified agricultural expert before making crop management decisions or applying treatments."
      );

      // Add page numbers to every page.
      const pageCount = doc.getNumberOfPages();
      for (let page = 1; page <= pageCount; page += 1) {
        doc.setPage(page);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text(
          `CropCare AI | Page ${page} of ${pageCount}`,
          pageWidth - margin,
          pageHeight - 8,
          { align: "right" }
        );
      }

      doc.save("CropCare-AI-Prediction-Report.pdf");
    } catch (err) {
      console.error("PDF report download error:", err);
      alert("Unable to create the PDF report. Please try again.");
    }
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

  const navigateToPage = (page) => {
    const pageMap = { "prediction-result": "detection" };
    setCurrentPage(pageMap[page] || page);
    setMobileNavOpen(false);
  };

  const goHome = () => navigateToPage("home");

  const saveProfile = () => {
    const trimmedName = profileName.trim();

    if (!trimmedName) return;

    const updatedUser = {
      ...user,
      name: trimmedName
    };

    localStorage.setItem("cropUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setProfileEditing(false);
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
        `${API_BASE_URL}/api/predictions`,
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

  const openCamera = async () => {
    setError("");
    setCapturedPhoto(null);
    setCapturedFile(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera access is not supported by this browser. Please upload an image instead.");
      return;
    }

    setCameraLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false
      });
      setCameraStream(stream);
      setCameraOpen(true);
    } catch (cameraError) {
      const message = cameraError.name === "NotAllowedError" || cameraError.name === "PermissionDeniedError"
        ? "Camera permission was denied. Allow camera access in your browser settings, or upload an image instead."
        : cameraError.name === "NotFoundError" || cameraError.name === "DevicesNotFoundError"
        ? "No camera was found. Connect a camera or upload an image instead."
        : cameraError.name === "NotReadableError"
        ? "The camera is already in use by another app. Close that app and try again."
        : "Unable to open the camera. Check browser permissions and try again, or upload an image.";
      setError(message);
    } finally {
      setCameraLoading(false);
    }
  };

  const closeCamera = () => {
    setCameraOpen(false);
    setCameraStream(null);
    setCapturedPhoto(null);
    setCapturedFile(null);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video?.videoWidth || !video?.videoHeight) {
      setError("The camera is not ready yet. Please wait a moment and try again.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) {
        setError("Could not capture the photo. Please try again.");
        return;
      }
      if (blob.size > 10 * 1024 * 1024) {
        setError("Captured image is larger than 10 MB. Move closer and try again.");
        return;
      }
      setError("");
      setCapturedFile(new File([blob], `crop-camera-${Date.now()}.jpg`, { type: "image/jpeg" }));
      setCapturedPhoto(URL.createObjectURL(blob));
    }, "image/jpeg", 0.92);
  };

  const useCapturedPhoto = () => {
    if (!capturedFile) return;
    if (preview) URL.revokeObjectURL(preview);
    setSelectedFile(capturedFile);
    setPreview(URL.createObjectURL(capturedFile));
    setPrediction(null);
    closeCamera();
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
        `${API_BASE_URL}/api/predict`,
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

      const normalizedPrediction = {
        ...data,
        top_predictions: Array.isArray(data.top_predictions)
          ? data.top_predictions.slice(0, 3)
          : []
      };

      console.log(
        "Prediction response from server:",
        normalizedPrediction
      );

      setPrediction(normalizedPrediction);

      await fetchHistory();

      setTimeout(() => {
        navigateToPage("prediction-result");
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
        `${API_BASE_URL}/api/predictions/${predictionId}`,
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
          ? `${API_BASE_URL}/api/signup`
          : `${API_BASE_URL}/api/login`;

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
      setCurrentPage("dashboard");

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

    navigateToPage("dashboard");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="app">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="topbar-shell">
        <button className="topbar-brand" onClick={goHome} type="button">
          <span className="brand-mark">🌿</span>
          <span>CropCare <b>AI</b></span>
        </button>
        <div className="topbar-actions">
          <button className="topbar-theme" type="button" onClick={() => setDarkMode((value) => !value)} aria-label="Toggle dark mode">
            {darkMode ? "☀️" : "🌙"}
          </button>
          {user ? (
            <button className="topbar-profile" type="button" onClick={() => navigateToPage("profile")}>
              <span className="topbar-avatar">{(user.name || "U").charAt(0).toUpperCase()}</span>
              <span>{user.name}</span>
            </button>
          ) : (
            <button className="topbar-profile" type="button" onClick={openLogin}>
              <span className="topbar-avatar">👤</span>
              <span>Login</span>
            </button>
          )}
        </div>
      </header>

      <nav className="sidebar-shell">
        <div className="sidebar-brand" onClick={goHome}>
          <span className="brand-mark">🌿</span>
          <span>CropCare <b>AI</b></span>
        </div>

        <div className={`sidebar-menu ${mobileNavOpen ? "open" : ""}`}>
          <button className={currentPage === "home" ? "side-link active" : "side-link"} onClick={goHome} type="button"><span>🏠</span><span>Home</span></button>
          <button className={currentPage === "dashboard" ? "side-link active" : "side-link"} onClick={handleDashboardNavigation} type="button"><span>📊</span><span>Dashboard</span></button>
          <button className={currentPage === "detection" ? "side-link active" : "side-link"} onClick={() => navigateToPage("detection")} type="button"><span>🔍</span><span>Detection</span></button>
          <button className={currentPage === "diseases" ? "side-link active" : "side-link"} onClick={() => navigateToPage("diseases")} type="button"><span>🦠</span><span>Diseases</span></button>
          <button className={currentPage === "history" ? "side-link active" : "side-link"} onClick={() => navigateToPage("history")} type="button"><span>📜</span><span>History</span></button>
          {user && <button className={currentPage === "profile" ? "side-link active" : "side-link"} onClick={() => navigateToPage("profile")} type="button"><span>👤</span><span>Profile</span></button>}
          <button className={currentPage === "about" ? "side-link active" : "side-link"} onClick={() => navigateToPage("about")} type="button"><span>ℹ️</span><span>About</span></button>
        </div>

        <div className="sidebar-bottom">
          <button className={currentPage === "settings" ? "side-link active" : "side-link"} onClick={() => navigateToPage("settings")} type="button"><span>⚙️</span><span>Settings</span></button>
          {user ? (
            <button className="sidebar-logout-full" type="button" onClick={handleLogout}><span>🚪</span><span>Logout</span></button>
          ) : (
            <button className="sidebar-login" type="button" onClick={openLogin}><span>🔐</span><span>Login</span></button>
          )}
        </div>
      </nav>

      <button
        className="mobile-menu-toggle"
        type="button"
        onClick={() => setMobileNavOpen((value) => !value)}
        aria-label="Toggle navigation"
      >
        {mobileNavOpen ? "✕" : "☰"}
      </button>

      <button
        className="mobile-theme-toggle"
        type="button"
        onClick={() => setDarkMode((value) => !value)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      {currentPage === "home" && (
      <section className="hero" id="home">

        <div className="hero-content">

          <div className="hero-text">

            <span className="hero-tag">
              🤖 AI-Powered Agriculture
            </span>

            <h1>
              Smarter Crop Care
              <br />
              <span>Powered by AI</span>
            </h1>

            <p>
              Turn a crop leaf image into an AI-assisted health insight in seconds.
              Get the prediction, confidence, alternatives, and practical crop-care guidance in one place.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                type="button"
                onClick={() =>
                  navigateToPage("detection")
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

            <div className="hero-trust-row">
              <span>⚡ Fast analysis</span>
              <span>🎯 Confidence score</span>
              <span>🌱 38 classes</span>
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

              <div className="hero-floating-card hero-floating-card-one">
                <span>🎯</span>
                <div><strong>98.4%</strong><small>Confidence</small></div>
              </div>

              <div className="hero-floating-card hero-floating-card-two">
                <span>🧠</span>
                <div><strong>CNN</strong><small>AI Model</small></div>
              </div>

            </div>

          </div>

        </div>

      </section>
      )}

      {/* =====================================================
          DASHBOARD
      ===================================================== */}

      {currentPage === "dashboard" && user && (
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
                navigateToPage("detection")
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
                        navigateToPage("history")
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
                        navigateToPage("detection")
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
                    navigateToPage("history")
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

      {currentPage === "detection" && (
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

            <div className="camera-actions">
              <span>Or take a fresh photo of the crop leaf</span>
              <button className="secondary-btn" type="button" onClick={openCamera} disabled={cameraLoading || cameraOpen}>
                {cameraLoading ? "Opening camera…" : "📷 Capture with Camera"}
              </button>
            </div>

            {cameraOpen && (
              <div className="camera-panel" aria-label="Capture crop leaf photo">
                <h3>{capturedPhoto ? "Review your photo" : "Position the leaf in the frame"}</h3>
                {capturedPhoto ? (
                  <img className="camera-preview" src={capturedPhoto} alt="Captured crop leaf preview" />
                ) : (
                  <video className="camera-preview" ref={videoRef} autoPlay playsInline muted />
                )}
                <div className="camera-controls">
                  {capturedPhoto ? (
                    <>
                      <button className="secondary-btn" type="button" onClick={() => { setCapturedPhoto(null); setCapturedFile(null); setError(""); }}>
                        Retake
                      </button>
                      <button className="primary-btn" type="button" onClick={useCapturedPhoto}>
                        Use Photo
                      </button>
                    </>
                  ) : (
                    <button className="primary-btn" type="button" onClick={capturePhoto}>
                      Capture Photo
                    </button>
                  )}
                  <button className="camera-close-btn" type="button" onClick={closeCamera}>
                    Close camera
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            <button
              className="predict-btn"
              type="button"
              onClick={handlePredict}
              disabled={loading || !selectedFile || cameraOpen}
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
      )}

      {/* =====================================================
          PREDICTION RESULT
      ===================================================== */}

      {currentPage === "detection" && prediction && (
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
                    <span className="top-predictions-icon">
                      🤖
                    </span>

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
                                width: `${Number(item.confidence || 0)}%`
                              }}
                            />

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

            <section className="voice-assistant-card" aria-labelledby="voice-assistant-title">
              <div className="voice-assistant-heading">
                <div className="voice-assistant-copy"><span className="section-tag">🌿 CropCare guidance</span><h3 id="voice-assistant-title">Understand Your Plant Prediction</h3>
                  <p>Hear an explanation of the current prediction in English or Tamil. You can also ask a question by voice or type it below.</p></div>
                <label className="voice-language"><span>Choose language</span>
                  <select value={assistantLanguage} onChange={(event) => setAssistantLanguage(event.target.value)}>
                    <option value="en-US">English</option><option value="ta-IN">தமிழ் (Tamil)</option>
                  </select>
                </label>
              </div>
              <div className="voice-assistant-controls">
                <button type="button" className="primary-btn" onClick={showPredictionExplanation}>🔊 Explain aloud</button>
                <button type="button" className="secondary-btn" onClick={startVoiceQuestion} disabled={isListening}>{isListening ? "🎙️ Listening…" : "🎙️ Ask by voice"}</button>
                <button type="button" className="secondary-btn" onClick={() => speakAssistantText(assistantText)} disabled={!assistantText}>↻ Replay</button>
                <button type="button" className="secondary-btn" onClick={stopAssistantSpeech}>⏹ Stop</button>
              </div>
              <label className="voice-text-label" htmlFor="assistant-text">Your question or prediction explanation</label>
              <textarea id="assistant-text" value={assistantText} onChange={(event) => setAssistantText(event.target.value)} rows={5} placeholder={assistantLanguage === "ta-IN" ? "உங்கள் கேள்வியைத் தட்டச்சு செய்யவும் அல்லது குரல் உள்ளீட்டைப் பயன்படுத்தவும்…" : "Type your question, use Ask by voice, or show the prediction explanation."} />
              {assistantError && <p className="voice-assistant-error" role="status">{assistantError}</p>}
              <p className="voice-assistant-note"><strong>Please note:</strong> “Explain aloud” reads the built-in explanation of the current prediction in the selected language. “Ask by voice” transcribes your question into text; open-ended answers require an AI service, which is not connected yet. This is not a confirmed diagnosis. For severe or uncertain symptoms, consult a local agricultural expert.</p>
            </section>

            <div className="report-download-area" style={{ display: "flex", justifyContent: "flex-end", margin: "20px 0 28px" }}>
              <button
                type="button"
                className="primary-btn"
                onClick={downloadPredictionReport}
              >
                📄 Download PDF Report
              </button>
            </div>

        </section>
      )}

      {/* =====================================================
          HISTORY
      ===================================================== */}

      {currentPage === "diseases" && (
        <section className="diseases-section page-section" id="diseases">
          <div className="section-heading">
            <span className="section-tag">🦠 Disease Library</span>
            <h2>Crop diseases supported by CropCare AI</h2>
            <p>Browse the 38 PlantVillage classes recognized by the CNN model.</p>
          </div>
          <div className="disease-library-grid">
            {Object.keys(diseaseInfo).map((name) => {
              const details = getDiseaseDetails(name);
              return (
                <article className="disease-library-card" key={name}>
                  <div className="disease-library-icon">🌿</div>
                  <h3>{formatDiseaseName(name)}</h3>
                  <p>{details.description}</p>
                  <div className="disease-library-meta"><span>🛡️ Prevention</span><span>💊 Treatment</span></div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {currentPage === "history" && (
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
                navigateToPage("detection")
              }
            >
              Start Detection
            </button>

          </div>

        ) : (

          <div className="history-list">

            {sortedHistory.map((item) => {

              const historyTopPredictions =
                Array.isArray(item.topPredictions)
                  ? item.topPredictions
                  : Array.isArray(item.top_predictions)
                  ? item.top_predictions
                  : [];

              return (

                <div
                  className="history-item"
                  key={item._id}
                >

                  <div
                    className="history-item-icon"
                    style={{
                      alignSelf: "center"
                    }}
                  >
                    {isHealthy(item.prediction)
                      ? "🌱"
                      : "🦠"}
                  </div>

                  <div
                    className="history-info"
                    style={{
                      alignSelf: "center"
                    }}
                  >

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

                  <div
                    className="history-confidence"
                    style={{
                      alignSelf: "center"
                    }}
                  >

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

                  <div
                    className="history-actions"
                    style={{
                      alignSelf: "center"
                    }}
                  >

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

                  {historyTopPredictions.length > 0 && (

                    <div
                      className="history-top-predictions"
                      style={{
                        gridColumn: "1 / -1",
                        marginTop: "4px",
                        padding: "16px",
                        border: "1px solid #e2ece5",
                        borderRadius: "15px",
                        background: "#fbfdfb"
                      }}
                    >

                      <div
                        className="history-top-title"
                        style={{
                          marginBottom: "12px",
                          color: "#0b3d24",
                          fontSize: "14px",
                          fontWeight: 800
                        }}
                      >
                        🤖 Top 3 AI Predictions
                      </div>

                      <div
                        className="history-top-list"
                        style={{
                          display: "grid",
                          gap: "9px"
                        }}
                      >

                        {historyTopPredictions
                          .slice(0, 3)
                          .map((topItem, index) => (

                            <div
                              className="history-top-row"
                              key={`${topItem.disease}-${index}`}
                              style={{
                                display: "grid",
                                gridTemplateColumns:
                                  "38px 1fr 70px",
                                alignItems: "center",
                                gap: "12px",
                                padding: "10px 12px",
                                border:
                                  "1px solid #e8eee9",
                                borderRadius: "11px",
                                background: "white"
                              }}
                            >

                              <div
                                className="history-top-rank"
                                style={{
                                  fontSize: "20px",
                                  textAlign: "center"
                                }}
                              >
                                {index === 0
                                  ? "🥇"
                                  : index === 1
                                  ? "🥈"
                                  : "🥉"}
                              </div>

                              <div
                                className="history-top-info"
                              >

                                <strong
                                  style={{
                                    display: "block",
                                    marginBottom: "6px",
                                    fontSize: "13px"
                                  }}
                                >
                                  {formatDiseaseName(
                                    topItem.disease
                                  )}
                                </strong>

                                <div
                                  className="history-top-bar"
                                  style={{
                                    height: "6px",
                                    overflow: "hidden",
                                    borderRadius: "99px",
                                    background: "#e8efe9"
                                  }}
                                >

                                  <div
                                    className="history-top-bar-fill"
                                    style={{
                                      width: `${Math.min(
                                        Number(
                                          topItem.confidence || 0
                                        ),
                                        100
                                      )}%`,
                                      height: "100%",
                                      borderRadius: "inherit",
                                      background:
                                        "linear-gradient(90deg, #2f8a4c, #69c978)",
                                      transition:
                                        "width 0.4s ease"
                                    }}
                                  />

                                </div>

                              </div>

                              <div
                                className="history-top-confidence"
                                style={{
                                  textAlign: "right",
                                  color: "#16733a",
                                  fontSize: "12px",
                                  fontWeight: 800
                                }}
                              >
                                {Number(
                                  topItem.confidence || 0
                                ).toFixed(2)}
                                %
                              </div>

                            </div>

                          ))}

                      </div>

                    </div>

                  )}

                </div>

              );

            })}

          </div>

        )}

      </section>
      )}

      {/* =====================================================
          PROFILE
      ===================================================== */}

      {currentPage === "profile" && user && (
        <section className="profile-section">
          <div className="profile-hero-card">
            <div className="profile-avatar-large">{(user.name || "U").charAt(0).toUpperCase()}</div>
            <div className="profile-hero-copy">
              <span className="section-tag">👤 Your Profile</span>
              <h2>Manage your CropCare account</h2>
              <p>Keep your personal details updated while your prediction data stays connected to your account.</p>
            </div>
            <button className="primary-btn profile-edit-button" type="button" onClick={() => setProfileEditing((value) => !value)}>
              {profileEditing ? "Cancel" : "✏️ Edit Profile"}
            </button>
          </div>

          <div className="profile-grid">
            <div className="profile-card profile-details-card">
              <div className="profile-card-heading"><div><span className="mini-label">PERSONAL INFORMATION</span><h3>Account details</h3></div><span className="profile-card-icon">👤</span></div>
              <div className="profile-field-grid">
                <label><span>Full name</span><input value={profileName} onChange={(event) => setProfileName(event.target.value)} disabled={!profileEditing} /></label>
                <label><span>Email address</span><input value={user.email || ""} disabled /></label>
              </div>
              {profileEditing && (
                <button className="primary-btn profile-save-button" type="button" onClick={saveProfile}>Save Changes</button>
              )}
            </div>

            <div className="profile-card profile-stat-card">
              <div className="profile-card-heading"><div><span className="mini-label">YOUR ACTIVITY</span><h3>CropCare snapshot</h3></div><span className="profile-card-icon">📊</span></div>
              <div className="profile-mini-stats">
                <div><strong>{totalPredictions}</strong><span>Total scans</span></div>
                <div><strong>{healthyPredictions}</strong><span>Healthy</span></div>
                <div><strong>{diseasedPredictions}</strong><span>Diseased</span></div>
                <div><strong>{averageConfidence.toFixed(0)}%</strong><span>Avg. confidence</span></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          ABOUT
      ===================================================== */}

      {currentPage === "settings" && (
        <section className="settings-section page-section" id="settings">
          <div className="section-heading">
            <span className="section-tag">⚙️ Settings</span>
            <h2>Customize your CropCare AI experience</h2>
            <p>Manage appearance and account preferences.</p>
          </div>
          <div className="settings-card">
            <div className="settings-row">
              <div><strong>Dark mode</strong><p>Switch between light and dark appearance.</p></div>
              <button className="settings-toggle" type="button" onClick={() => setDarkMode((value) => !value)}>{darkMode ? "☀️ Light" : "🌙 Dark"}</button>
            </div>
            <div className="settings-row">
              <div><strong>Account</strong><p>{user ? user.email : "Not signed in"}</p></div>
              <button className="secondary-btn" type="button" onClick={() => user ? navigateToPage("profile") : openLogin()}>{user ? "View Profile" : "Login"}</button>
            </div>
          </div>
        </section>
      )}

      {currentPage === "about" && (
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
      )}

      {/* =====================================================
          FOOTER
      ===================================================== */}

      {currentPage === "home" && (
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
      )}

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
