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
    const response = await fetch(apiUrl + '/api/user/logout', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });

        const {res} = await axios.put(apiurl + URL,updatedData, params)
        return res;
}