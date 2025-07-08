# Tests Unitaires du Portfolio

Ce document résume tous les tests unitaires implémentés dans le projet.

## Service API (statsService.test.js)

Tests du service qui gère les appels API pour les statistiques du portfolio :

- **getPortfolioStats**
  - ✓ Effectue l'appel API correct vers `/api/stats/portfolio`
  - ✓ Retourne les statistiques globales (projets totaux, technologies, etc.)

- **getTechnologyStats**
  - ✓ Effectue l'appel API correct vers `/api/stats/technologies`
  - ✓ Retourne les statistiques d'utilisation des technologies

- **getProjectComplexityStats**
  - ✓ Effectue l'appel API correct vers `/api/stats/complexity`
  - ✓ Retourne les statistiques de complexité des projets

- **getTimelineStats**
  - ✓ Effectue l'appel API correct vers `/api/stats/timeline`
  - ✓ Retourne les statistiques temporelles des projets

- **Gestion des erreurs**
  - ✓ Gère correctement les erreurs HTTP avec message d'erreur
  - ✓ Gère les erreurs HTTP sans message d'erreur
  - ✓ Gère les erreurs réseau

## Composant ProjectCard (ProjectCard.test.jsx)

Tests du composant qui affiche une carte de projet :

- **Rendu**
  - ✓ Affiche correctement le titre et la description
  - ✓ Affiche l'image avec les bons attributs src et alt
  - ✓ Affiche l'indicateur vidéo quand une URL vidéo est fournie
  - ✓ N'affiche pas l'indicateur vidéo sans URL vidéo

- **Modal Vidéo**
  - ✓ Ouvre le modal au clic sur un projet avec vidéo
  - ✓ Ferme le modal au clic sur le bouton fermer
  - ✓ N'ouvre pas le modal au clic sur un projet sans vidéo

## Composant Projects (Projects.test.jsx)

Tests du composant principal qui gère l'affichage des projets :

- **Navigation**
  - ✓ Affiche le titre principal "Projets"
  - ✓ Affiche tous les onglets de navigation
  - ✓ Affiche les projets React par défaut
  - ✓ Change correctement d'onglet au clic

- **Contenu**
  - ✓ Affiche les bons projets dans chaque onglet
  - ✓ Affiche les statistiques dans l'onglet correspondant
  - ✓ Gère correctement les indicateurs vidéo
  - ✓ Applique les classes d'animation correctement

## Composant PortfolioStats (PortfolioStats.test.jsx)

Tests du composant qui affiche les statistiques du portfolio :

- **Données**
  - ✓ Affiche les statistiques globales du portfolio
  - ✓ Affiche les statistiques des technologies
  - ✓ Affiche la complexité des projets
  - ✓ Affiche la timeline des projets

- **Mise en forme**
  - ✓ Formate correctement les dates
  - ✓ Affiche les pourcentages correctement
  - ✓ Gère l'affichage des nombres décimaux

Total : 29 tests passés ✅
