import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/users/register", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur lors de l'inscription");
      }

      console.log("Inscription réussie !");
      navigate("/login");
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setError(error.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="register-container">
      <form className="register-page" onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemple@email.com"
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minimum 6 caractères"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">S'inscrire</button>
        <p>
          Déjà inscrit ? <a href="/login">Se connecter</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
