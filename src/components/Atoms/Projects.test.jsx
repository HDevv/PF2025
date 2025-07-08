import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Projects } from './Projects';

// Mock TrackVisibility component
jest.mock('react-on-screen', () => ({
  __esModule: true,
  default: ({ children }) => children({ isVisible: true })
}));

describe('Projects Component', () => {
  test('renders projects section with title', () => {
    render(<Projects />);
    expect(screen.getByText('Projets')).toBeInTheDocument();
  });

  test('shows all navigation tabs', () => {
    render(<Projects />);
    
    expect(screen.getByText('Projets React')).toBeInTheDocument();
    expect(screen.getByText('Autres Projets')).toBeInTheDocument();
    expect(screen.getByText('Statistiques')).toBeInTheDocument();
  });

  test('displays first set of projects by default', () => {
    render(<Projects />);
    
    expect(screen.getByText('KASA 🏠')).toBeInTheDocument();
    expect(screen.getByText('WEBFIT 🏋️')).toBeInTheDocument();
  });

  test('switches to second tab and shows different projects', () => {
    render(<Projects />);
    
    // Click on second tab
    fireEvent.click(screen.getByText('Autres Projets'));
    
    expect(screen.getByText('Trattoria 🍕')).toBeInTheDocument();
    expect(screen.getByText('URL Shortener ✂️')).toBeInTheDocument();
  });

  test('switches to statistics tab and shows statistics component', () => {
    render(<Projects />);
    
    // Click on statistics tab
    fireEvent.click(screen.getByText('Statistiques'));
    
    expect(screen.getByText('Statistiques du Portfolio')).toBeInTheDocument();
  });

  test('projects have correct content', () => {
    render(<Projects />);
    
    const firstProject = screen.getByText('KASA 🏠');
    expect(firstProject).toBeInTheDocument();
    expect(screen.getByText(/Application web React de location immobilière/)).toBeInTheDocument();
  });

  test('projects with video URLs have video indicators', () => {
    render(<Projects />);
    
    // Get all project containers
    const projectContainers = screen.getAllByTestId('project-container');
    
    // Find the one with video (should have cursor: pointer)
    const projectWithVideo = projectContainers.find(container => 
      window.getComputedStyle(container).cursor === 'pointer'
    );
    
    expect(projectWithVideo).toBeTruthy();
    expect(projectWithVideo).toHaveStyle({ cursor: 'pointer' });
  });

  test('animation classes are applied when visible', () => {
    render(<Projects />);
    
    // The animation class is applied to the div inside the section
    const animatedElement = screen.getByTestId('projects-section')
      .querySelector('.animate__animated');
    
    expect(animatedElement).toHaveClass('animate__animated');
    expect(animatedElement).toHaveClass('animate__fadeIn');
  });
});
