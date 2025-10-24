import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


export const postData = async (URL, formData) => {
    try {
        const response = await fetch(apiUrl + URL, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, //Include your API key in the Authorization
                'Content-Type': 'application/json', //Adjust the content type as needed
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });


        if (response.ok) {
            const data = await response.json();
            //console.log(data)
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
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            credentials: 'include'
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


export const fetchData = async (URL) => {
    try {
        const response = await axios.get(apiUrl + URL, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export const editData = async (URL, updatedData) => {
     const headers = {
         'Authorization': `Bearer ${localStorage.getItem('token')}`,
     };
     
     // Don't set Content-Type for FormData, let browser set it automatically
     if (!(updatedData instanceof FormData)) {
         headers['Content-Type'] = 'application/json';
     }
     
     const params = {
         headers,
         withCredentials: true
     }

     try {
         const response = await axios.put(apiUrl + URL, updatedData, params);
         return response;
     } catch (error) {
         console.error('API Error:', error);
         throw error;
     }
}