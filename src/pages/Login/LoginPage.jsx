import React, { useState } from "react";
import "./LoginPage.css";
import { useUser } from "../../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      // Si la réponse n'est pas ok, on récupère le message d'erreur
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur de connexion");
      }

      const data = await response.json();
      console.log("Réponse du serveur:", data);

      if (!data.token) {
        throw new Error("Token non reçu du serveur");
      }

      console.log("Connexion réussie, token reçu");
      localStorage.setItem("token", data.token);
      setUser({ email });
    } catch (error) {
      console.error("Erreur détaillée:", error);
      setError(error.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="login-container">
      <form className="login-page" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Se connecter</button>
        <p className="register-link">
          Pas encore de compte ? <a href="/register">S'inscrire</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
