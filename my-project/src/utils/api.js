import axios from 'axios';


export const postData = async (URL, formData) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + URL, {
            method: "POST",
            headers: {
                'Authorization': `Banner ${localStorage.getItem('token')}`, //Include your API key in the Authorization
                'Content-Type': 'application/json', //Adjust the content type as needed
            },

            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        console.error("Error:", error);}
}

