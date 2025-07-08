const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getPortfolioStats = async () => {
    try {
        const response = await fetch(`${API_URL}/api/stats/portfolio`);
        if (!response.ok) {
            const errorMessage = response.statusText || 'Network response was not ok';
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching portfolio stats:', error);
        throw error;
    }
};

export const getTechnologyStats = async () => {
    try {
        const response = await fetch(`${API_URL}/api/stats/technologies`);
        if (!response.ok) {
            const errorMessage = response.statusText || 'Network response was not ok';
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching technology stats:', error);
        throw error;
    }
};

export const getProjectComplexityStats = async () => {
    try {
        const response = await fetch(`${API_URL}/api/stats/complexity`);
        if (!response.ok) {
            const errorMessage = response.statusText || 'Network response was not ok';
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching project complexity stats:', error);
        throw error;
    }
};

export const getTimelineStats = async () => {
    try {
        const response = await fetch(`${API_URL}/api/stats/timeline`);
        if (!response.ok) {
            const errorMessage = response.statusText || 'Network response was not ok';
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching timeline stats:', error);
        throw error;
    }
};
