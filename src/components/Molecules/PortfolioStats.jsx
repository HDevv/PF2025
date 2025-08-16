import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getPortfolioStats, getTimelineStats } from '../../services/statsService';

export const PortfolioStats = () => {
  const [portfolioStats, setPortfolioStats] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const [portfolioData, timelineData] = await Promise.all([
          getPortfolioStats(),
          getTimelineStats()
        ]);

        setPortfolioStats(portfolioData);
        setTimeline(timelineData);
      } catch (err) {
        console.error('Erreur lors du chargement des statistiques:', err);
        setError('Impossible de charger les statistiques');
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  if (loading) {
    return (
      <section className="portfolio-stats py-5">
        <Container>
          <div className="text-center">
            <h2>Chargement des statistiques...</h2>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="portfolio-stats py-5">
        <Container>
          <div className="text-center">
            <h2>Erreur</h2>
            <p>{error}</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="portfolio-stats py-5">
      <Container>
        <h2 className="text-center mb-5" data-testid="stats-title">
          Statistiques du Portfolio
        </h2>

        <Row className="mb-4">
          <Col md={12}>
            <Card className="overview-card">
              <Card.Body>
                <Card.Title data-testid="overview-title">Vue d'ensemble</Card.Title>
                <Row>
                  <Col md={3} className="text-center mb-3">
                    <h3 data-testid="total-projects">{portfolioStats?.total_projects || 0}</h3>
                    <p>Projets totaux</p>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h3 data-testid="total-users">{portfolioStats?.total_users || 0}</h3>
                    <p>Utilisateurs</p>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h3 data-testid="projects-with-image">{portfolioStats?.projects_with_image || 0}</h3>
                    <p>Projets avec image</p>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h3 data-testid="projects-with-image-percentage">
                      {portfolioStats?.projects_with_image_percentage || 0}%
                    </h3>
                    <p>% avec image</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title data-testid="timeline-title">Évolution temporelle</Card.Title>
                {timeline.map((entry, index) => (
                  <div key={index} className="mb-3" data-testid="timeline-item">
                    <h5>{entry.month}</h5>
                    <p className="mb-1">{entry.new_projects} nouveaux projets</p>
                    <p className="mb-1">Technologies : {entry.tech_stack}</p>
                    {entry.contributors && (
                      <small className="text-muted">Contributeurs : {entry.contributors}</small>
                    )}
                  </div>
                ))}
                {timeline.length === 0 && (
                  <p className="text-muted">Aucune donnée temporelle disponible</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
