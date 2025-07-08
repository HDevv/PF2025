import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectCard } from './ProjectCard';

describe('ProjectCard Component', () => {
  const mockProps = {
    title: 'Test Project',
    description: 'Test Description',
    imgUrl: 'test-image.jpg',
    videoUrl: 'https://www.loom.com/share/test-video'
  };

  test('renders project card with title and description', () => {
    render(<ProjectCard {...mockProps} />);
    
    expect(screen.getByTestId('project-title')).toHaveTextContent(mockProps.title);
    expect(screen.getByTestId('project-description')).toHaveTextContent(mockProps.description);
    expect(screen.getByTestId('project-container')).toBeInTheDocument();
  });

  test('renders image with correct src and alt', () => {
    render(<ProjectCard {...mockProps} />);
    
    const image = screen.getByTestId('project-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProps.imgUrl);
    expect(image).toHaveAttribute('alt', mockProps.title);
  });

  test('shows video overlay when video URL is provided', () => {
    render(<ProjectCard {...mockProps} />);
    
    const container = screen.getByTestId('project-container');
    expect(container).toHaveStyle({ cursor: 'pointer' });
  });

  test('does not show video cursor when no video URL is provided', () => {
    render(<ProjectCard {...mockProps} videoUrl={undefined} />);
    
    const container = screen.getByTestId('project-container');
    expect(container).toHaveStyle({ cursor: 'default' });
  });

  test('opens modal when clicking on project with video', () => {
    render(<ProjectCard {...mockProps} />);
    
    const projectContainer = screen.getByTestId('project-container');
    fireEvent.click(projectContainer);
    
    const modal = screen.getByRole('dialog', { hidden: true });
    expect(modal).toBeInTheDocument();
    expect(screen.getByTestId('modal-title')).toHaveTextContent(`${mockProps.title} - Vidéo de présentation`);
  });

  test('closes modal when clicking close button', async () => {
    render(<ProjectCard {...mockProps} />);
    
    // Open modal
    const projectContainer = screen.getByTestId('project-container');
    fireEvent.click(projectContainer);
    
    // Close modal
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    
    // Wait for modal to be removed
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
  });

  test('does not open modal when clicking project without video', () => {
    render(<ProjectCard {...mockProps} videoUrl={undefined} />);
    
    const projectContainer = screen.getByTestId('project-container');
    fireEvent.click(projectContainer);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
