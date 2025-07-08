import {
  getPortfolioStats,
  getTechnologyStats,
  getProjectComplexityStats,
  getTimelineStats
} from './statsService';

// Mock fetch globally
global.fetch = jest.fn();

// Mock process.env
process.env = {
  ...process.env,
  REACT_APP_API_URL: 'http://localhost:3000'
};

describe('Stats Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('getPortfolioStats makes correct API call', async () => {
    const mockData = {
      total_projects: 11,
      total_technologies: 8,
      projects_with_video: 2,
      avg_technologies_per_project: 3.2
    };

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    );

    const result = await getPortfolioStats();
    
    expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/stats/portfolio`);
    expect(result).toEqual(mockData);
  });

  test('getTechnologyStats makes correct API call', async () => {
    const mockData = [
      { technology: 'React', usage_count: 4, usage_percentage: 36.4 },
      { technology: 'JavaScript', usage_count: 11, usage_percentage: 100 },
      { technology: 'HTML/CSS', usage_count: 11, usage_percentage: 100 },
      { technology: 'PHP', usage_count: 1, usage_percentage: 9.1 },
      { technology: 'SQL', usage_count: 1, usage_percentage: 9.1 }
    ];

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    );

    const result = await getTechnologyStats();
    
    expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/stats/technologies`);
    expect(result).toEqual(mockData);
  });

  test('getProjectComplexityStats makes correct API call', async () => {
    const mockData = [
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
    ];

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    );

    const result = await getProjectComplexityStats();
    
    expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/stats/complexity`);
    expect(result).toEqual(mockData);
  });

  test('getTimelineStats makes correct API call', async () => {
    const mockData = [
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
    ];

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    );

    const result = await getTimelineStats();
    
    expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/stats/timeline`);
    expect(result).toEqual(mockData);
  });

  test('handles API errors correctly', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      })
    );

    await expect(getPortfolioStats()).rejects.toThrow('Internal Server Error');
  });

  test('handles API errors without status text', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404
      })
    );

    await expect(getPortfolioStats()).rejects.toThrow('Network response was not ok');
  });

  test('handles network errors correctly', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    );

    await expect(getPortfolioStats()).rejects.toThrow('Network error');
  });
});
