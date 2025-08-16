import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const formInitialDetails = {
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    message: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Envoyer");
  const [status, setStatus] = useState({});

  // Récupération des IDs depuis les env vars
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  // Debug des variables d'environnement
  console.log("EmailJS Config:", {
    SERVICE_ID,
    TEMPLATE_ID,
    PUBLIC_KEY: PUBLIC_KEY ? "✓ Défini" : "✗ Manquant"
  });

  const onFormUpdate = (category, value) => {
    setFormDetails((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Envoi...");

    // Validation basique
    if (!formDetails.nom || !formDetails.prenom || !formDetails.email || !formDetails.message) {
      setButtonText("Envoyer");
      setStatus({ succes: false, message: "Veuillez remplir tous les champs obligatoires." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formDetails.email)) {
      setButtonText("Envoyer");
      setStatus({ succes: false, message: "Veuillez entrer une adresse email valide." });
      return;
    }

    // Paramètres attendus par ton template EmailJS
    const templateParams = {
      from_name: `${formDetails.prenom} ${formDetails.nom}`,
      reply_to: formDetails.email,   // dans EmailJS, utilise {{reply_to}}
      phone: formDetails.phone || "",
      message: formDetails.message,
      subject: `Nouveau message de ${formDetails.prenom} ${formDetails.nom} - Portfolio`,
      // to_email: "hichamrdln@gmail.com", // seulement si ton template s’appuie sur cette variable
    };

    // Vérification des variables d'environnement
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("Variables EmailJS manquantes:", { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY });
      setButtonText("Envoyer");
      setStatus({ 
        succes: false, 
        message: "Configuration EmailJS manquante. Vérifiez les variables d'environnement." 
      });
      return;
    }

    try {
      console.log("Envoi EmailJS avec:", templateParams);
      
      const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      
      console.log("Réponse EmailJS:", res);
      
      if (res.status === 200) {
        setFormDetails(formInitialDetails);
        setStatus({ 
          succes: true, 
          message: `Message envoyé avec succès ! Je vous répondrai à ${formDetails.email} bientôt.` 
        });
      } else {
        throw new Error(`EmailJS returned status: ${res.status}`);
      }
    } catch (err) {
      console.error("Erreur EmailJS:", err);
      setStatus({ 
        succes: false, 
        message: `Erreur d'envoi: ${err.message || "Problème de connexion"}. Réessayez plus tard.` 
      });
    } finally {
      setButtonText("Envoyer");
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row>
          <Col size={12} md={10}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Me contacter</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          name="nom" // utile si tu passes à sendForm
                          value={formDetails.nom}
                          placeholder="Nom"
                          onChange={(e) => onFormUpdate("nom", e.target.value)}
                          required
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          name="prenom"
                          value={formDetails.prenom}
                          placeholder="Prénom"
                          onChange={(e) => onFormUpdate("prenom", e.target.value)}
                          required
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          name="email"
                          value={formDetails.email}
                          placeholder="Adresse email"
                          onChange={(e) => onFormUpdate("email", e.target.value)}
                          required
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          name="phone"
                          value={formDetails.phone}
                          placeholder="Téléphone (optionnel)"
                          onChange={(e) => onFormUpdate("phone", e.target.value)}
                        />
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea
                          rows="6"
                          name="message"
                          value={formDetails.message}
                          placeholder="Message"
                          onChange={(e) => onFormUpdate("message", e.target.value)}
                          required
                        />
                        <button type="submit">
                          <span>{buttonText}</span>
                        </button>
                      </Col>

                      {status.message && (
                        <Col>
                          <p className={status.succes === false ? "danger" : "success"}>
                            {status.message}
                          </p>
                        </Col>
                      )}
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
