// Test authentication utility
export const setTestToken = () => {
    // This is a temporary token for testing - replace with actual login
    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzZhZjI4ZjU4YzQzMzJhMzE2YzQyYSIsImlhdCI6MTczNTg0NzY5NiwiZXhwIjoxNzM1ODUxMjk2fQ.test';
    localStorage.setItem('accessToken', testToken);
};

export const clearTestToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};