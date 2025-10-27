import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (URL, formData) => {
    try {
        const response = await fetch(apiUrl + URL, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
        const response = await axios.put(apiUrl + URL, updatedData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Edit Error:", error);
    }
}