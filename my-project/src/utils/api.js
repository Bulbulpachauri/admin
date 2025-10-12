import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


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


        if (response.ok) {
            const data = await response.json();
            //console.log(data)
            return { data };
        } else {
            const errorData = await response.json();
            return errorData;
        }

    } catch (error) {
        console.error("Error:", error);
    }

}
