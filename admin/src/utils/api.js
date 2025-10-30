import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const getAuthToken = () => {
    return localStorage.getItem('accessToken');
};

export const fetchData = async (URL) => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await axios.get(apiUrl + URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return { data: response.data };
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        }
        console.error("Fetch Error:", error);
        throw error;
    }
};

export const postData = async (URL, formData) => {
    try {
        const response = await fetch(apiUrl + URL, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            return errorData;
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export const logout = async () => {
    try {
        const response = await fetch(apiUrl + '/api/user/logout', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            return errorData;
        }
    } catch (error) {
        console.error("Logout Error:", error);
    }
}

export const editData = async (URL, updatedData) => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const isFormData = updatedData instanceof FormData;
        const headers = {
            'Authorization': `Bearer ${token}`,
        };
        
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await axios.put(apiUrl + URL, updatedData, { headers });
        return { data: response.data };
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        }
        console.error("Edit Error:", error);
        throw error;
    }
}

export const deleteData = async (URL) => {
    try {
        const response = await axios.delete(apiUrl + URL, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
            }
        });
        return { data: response.data };
    } catch (error) {
        console.error("Delete Error:", error);
        throw error;
    }
}