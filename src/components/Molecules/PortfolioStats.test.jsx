import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PortfolioStats } from './PortfolioStats';

describe('PortfolioStats Component', () => {
  test('renders main statistics sections', () => {
    render(<PortfolioStats />);
    
    expect(screen.getByTestId('stats-title')).toHaveTextContent('Statistiques du Portfolio');
    expect(screen.getByTestId('overview-title')).toHaveTextContent('Vue d\'ensemble');
    expect(screen.getByTestId('tech-title')).toHaveTextContent('Technologies les plus utilisées');
    expect(screen.getByTestId('complex-title')).toHaveTextContent('Projets complexes');
  });

  test('displays correct total numbers in overview', () => {
    render(<PortfolioStats />);
    
    expect(screen.getByTestId('total-projects')).toHaveTextContent('11');
    expect(screen.getByTestId('total-technologies')).toHaveTextContent('8');
    expect(screen.getByTestId('projects-with-video')).toHaveTextContent('2');
    expect(screen.getByTestId('avg-technologies')).toHaveTextContent('3.2');
  });

  test('shows technology usage statistics', () => {
    render(<PortfolioStats />);
    
    const techItems = screen.getAllByTestId(/tech-item-/);
    expect(techItems).toHaveLength(5);
    
    expect(techItems[0]).toHaveTextContent('React - 4 projets (36.4%)');
    expect(techItems[1]).toHaveTextContent('JavaScript - 11 projets (100%)');
  });

  test('displays complex projects with their technologies', () => {
    render(<PortfolioStats />);
    
    const complexProjects = screen.getAllByTestId(/complex-project-/);
    expect(complexProjects).toHaveLength(2);
    
    expect(complexProjects[0]).toHaveTextContent('KASA');
    expect(complexProjects[0]).toHaveTextContent('React, JavaScript, HTML/CSS, API');
    expect(complexProjects[1]).toHaveTextContent('URL Shortener');
    expect(complexProjects[1]).toHaveTextContent('PHP, SQL, HTML/CSS');
  });

  test('shows timeline entries with correct information', () => {
    render(<PortfolioStats />);
    
    const timelineItems = screen.getAllByTestId('timeline-item');
    expect(timelineItems).toHaveLength(2);
    
    expect(timelineItems[0]).toHaveTextContent('2023-06');
    expect(timelineItems[0]).toHaveTextContent('2 nouveaux projets');
    expect(timelineItems[0]).toHaveTextContent('React, JavaScript, HTML/CSS, API');
    
    expect(timelineItems[1]).toHaveTextContent('2023-05');
    expect(timelineItems[1]).toHaveTextContent('3 nouveaux projets');
    expect(timelineItems[1]).toHaveTextContent('JavaScript, HTML/CSS, React');
  });

  test('displays all required sections', () => {
    render(<PortfolioStats />);
    
    expect(screen.getByTestId('overview-title')).toBeInTheDocument();
    expect(screen.getByTestId('tech-title')).toBeInTheDocument();
    expect(screen.getByTestId('complex-title')).toBeInTheDocument();
    expect(screen.getByTestId('timeline-title')).toBeInTheDocument();
  });

  test('displays correct date format in complex projects', () => {
    render(<PortfolioStats />);
    
    const complexProjects = screen.getAllByTestId(/complex-project-/);
    expect(complexProjects[0]).toHaveTextContent('15/01/2023');
    expect(complexProjects[1]).toHaveTextContent('20/02/2023');
  });
});
