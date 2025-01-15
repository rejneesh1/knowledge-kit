const axios = require('axios');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Using Fetch API
async function checkOptionsWithFetch(url) {
    try {
        const response = await fetch(url, {
            method: 'OPTIONS'
        });
        
        // Get CORS and allowed methods headers
        const allowedMethods = response.headers.get('allow');
        const corsAllowMethods = response.headers.get('access-control-allow-methods');
        const corsAllowOrigin = response.headers.get('access-control-allow-origin');
        const corsAllowHeaders = response.headers.get('access-control-allow-headers');

        console.log('Status:', response.status);
        console.log('Allowed Methods:', allowedMethods);
        console.log('CORS Allowed Methods:', corsAllowMethods);
        console.log('CORS Allowed Origin:', corsAllowOrigin);
        console.log('CORS Allowed Headers:', corsAllowHeaders);
        
        return response.headers;
    } catch (error) {
        console.error('Error making OPTIONS request:', error);
    }
}

// Using Axios
async function checkOptionsWithAxios(url) {
    try {
        const response = await axios.options(url);
        
        // Headers are automatically parsed in response.headers
        console.log('Status:', response.status);
        console.log('Allowed Methods:', response.headers['allow']);
        console.log('CORS Allowed Methods:', response.headers['access-control-allow-methods']);
        console.log('CORS Allowed Origin:', response.headers['access-control-allow-origin']);
        console.log('CORS Allowed Headers:', response.headers['access-control-allow-headers']);
        
        return response.headers;
    } catch (error) {
        console.error('Error making OPTIONS request:', error);
    }
}

// Example usage
const url = 'https://pokeapi.co/api/v2/pokemon/1';

// Using Fetch
checkOptionsWithFetch(url);

// Using Axios
checkOptionsWithAxios(url);
/**
 * Expected Response Analysis:
 * 
 * 1. Status: 204
 *    - 204 means "No Content"
 *    - This is a normal response for OPTIONS requests
 *    - Indicates the request was successful but there's no content to return in the body
 * 
 * 2. Allowed Methods: null
 *    - The standard HTTP `Allow` header is not present
 *    - This header is optional in OPTIONS responses
 *    - Some servers don't implement it, preferring to use CORS headers instead
 * 
 * 3. CORS Allowed Methods: GET,HEAD,PUT,PATCH,POST,DELETE
 *    - From the `Access-Control-Allow-Methods` header
 *    - Lists all HTTP methods this endpoint supports
 *    - This server allows all major HTTP methods
 *    - Part of CORS (Cross-Origin Resource Sharing) protocol
 * 
 * 4. CORS Allowed Origin: *
 *    - From the `Access-Control-Allow-Origin` header
 *    - `*` means the resource can be accessed by any domain
 *    - This is a very permissive CORS policy
 *    - Common for public APIs
 * 
 * 5. CORS Allowed Headers: null
 *    - The `Access-Control-Allow-Headers` header is not present
 *    - Means the server accepts standard headers only
 *    - Custom headers might not be allowed
 */
// Example server that only allows GET requests
const express = require('express');
const app = express();

app.use((req, res, next) => {
    // Set basic CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    
    // Handle OPTIONS requests
    if (req.method === 'OPTIONS') {
        // Only allow GET method
        res.header('Access-Control-Allow-Methods', 'GET');
        // Standard headers
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(204).send();
    }
    
    // For non-OPTIONS requests, only allow GET
    if (req.method !== 'GET') {
        return res.status(405).send('Method Not Allowed');
    }
    
    next();
});

// Sample GET endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'GET request successful' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
