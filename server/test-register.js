import axios from 'axios';

const testData = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    phone: "1234567890"
};

console.log('Testing registration endpoint...');
console.log('Sending data:', testData);

axios.post('http://localhost:8000/api/user/register', testData)
    .then(response => {
        console.log('Success:', response.data);
    })
    .catch(error => {
        console.log('Error:', error.response?.data || error.message);
        console.log('Status:', error.response?.status);
    });