import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (URL, formData)=> {
    try{
        const response = await fetch(apiUrl + URL,{
            method: "POST",
            headers: {
                'Authorization':   `Banner ${localStorage.getItem('token')}`, //Include your API key in the Authorization
                'Content-Type': 'application/json', //Adjust the content type as needed
            },

            body:JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { data };
    } catch (error){
        console.log(error);
        throw error;
    }
}