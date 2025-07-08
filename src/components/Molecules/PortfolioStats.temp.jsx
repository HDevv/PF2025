import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export const PortfolioStats = () => {
  const stats = {
    portfolio: {
      total_projects: 11,
      total_technologies: 8,
      projects_with_video: 2,
      avg_technologies_per_project: 3.2
    },
    technologies: [
      { technology: 'React', usage_count: 4, usage_percentage: 36.4 },
      { technology: 'JavaScript', usage_count: 11, usage_percentage: 100 },
      { technology: 'HTML/CSS', usage_count: 11, usage_percentage: 100 },
      { technology: 'PHP', usage_count: 1, usage_percentage: 9.1 },
      { technology: 'SQL', usage_count: 1, usage_percentage: 9.1 }
    ],
    complexity: [
      {
        title: 'KASA',
        tech_count: 4,
        technologies: 'React, JavaScript, HTML/CSS, API',
        created_at: '2023-01-15'
      },
      {
        title: 'URL Shortener',
        tech_count: 3,
        technologies: 'PHP, SQL, HTML/CSS',
        created_at: '2023-02-20'
      }
    ],
    timeline: [
      {
        month: '2023-06',
        new_projects: 2,
        technologies_used: 4,
        tech_stack: 'React, JavaScript, HTML/CSS, API'
      },
      {
        month: '2023-05',
        new_projects: 3,
        technologies_used: 3,
        tech_stack: 'JavaScript, HTML/CSS, React'
      }
    ]
  };

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
                    <h3 data-testid="total-projects">{stats.portfolio.total_projects}</h3>
                    <p>Projets totaux</p>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h3 data-testid="total-technologies">{stats.portfolio.total_technologies}</h3>
                    <p>Technologies</p>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h3 data-testid="projects-with-video">{stats.portfolio.projects_with_video}</h3>
                    <p>Projets avec vidéo</p>
                  </Col>
                  <Col md={3} className="text-center mb-3">
                    <h3 data-testid="avg-technologies">
                      {stats.portfolio.avg_technologies_per_project}
                    </h3>
                    <p>Moy. technologies/projet</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title data-testid="tech-title">
                  Technologies les plus utilisées
                </Card.Title>
                <ul className="list-unstyled">
                  {stats.technologies.map((tech, index) => (
                    <li key={index} className="mb-2" data-testid={`tech-item-${index}`}>
                      {tech.technology} - {tech.usage_count} projets ({tech.usage_percentage}%)
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title data-testid="complex-title">Projets complexes</Card.Title>
                {stats.complexity.map((project, index) => (
                  <div key={index} className="mb-3" data-testid={`complex-project-${index}`}>
                    <h5>{project.title}</h5>
                    <p className="text-muted mb-1">
                      {project.tech_count} technologies -{' '}
                      {new Date(project.created_at).toLocaleDateString()}
                    </p>
                    <p className="mb-0">{project.technologies}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title data-testid="timeline-title">Évolution temporelle</Card.Title>
                {stats.timeline.map((entry, index) => (
                  <div key={index} className="mb-3" data-testid="timeline-item">
                    <h5>{entry.month}</h5>
                    <p className="mb-1">{entry.new_projects} nouveaux projets</p>
                    <p className="mb-0">Technologies : {entry.tech_stack}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
