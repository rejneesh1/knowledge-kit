/**
 * File: codePlayground/headRequest.js
 * Description: Example of HEAD requests using Fetch and Axios
 * 
 * HEAD Request Explanation:
 * - HEAD is identical to GET but returns only headers without body
 * - Useful for:
 *   1. Checking if a resource exists (via status code)
 *   2. Getting metadata (size, type, last modified)
 *   3. Checking if resource has changed
 *   4. Saving bandwidth (no body downloaded)
 * 
 * Common Response Headers:
 * - Status: HTTP status code (e.g., 200 OK, 404 Not Found)
 * - Last-Modified: When the resource was last changed
 * - Content-Length: Size of the resource in bytes
 * - Content-Type: MIME type of the resource
 * 
 * Usage Examples:
 * - Checking if a file exists before downloading
 * - Monitoring if content has been updated
 * - Getting file size before download
 * - Validating cache freshness
 */

const axios = require('axios');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Using Fetch API
async function checkResourceWithFetch(url) {
    try {
        const response = await fetch(url, {
            method: 'HEAD'  // Only retrieve headers, no body
        });
        
        // Get common headers that provide resource metadata
        const lastModified = response.headers.get('last-modified');
        const contentLength = response.headers.get('content-length');
        const contentType = response.headers.get('content-type');

        console.log('Status:', response.status);
        console.log('Last Modified:', lastModified);
        console.log('Size:', contentLength, 'bytes');
        console.log('Content Type:', contentType);
        
        return response.headers;
    } catch (error) {
        console.error('Error making HEAD request:', error);
    }
}

// Using Axios
async function checkResourceWithAxios(url) {
    try {
        // Axios provides a dedicated head() method
        const response = await axios.head(url);
        
        // Headers are automatically parsed in response.headers
        // Note: Axios uses lowercase header names
        console.log('Status:', response.status);
        console.log('Last Modified:', response.headers['last-modified']);
        console.log('Size:', response.headers['content-length'], 'bytes');
        console.log('Content Type:', response.headers['content-type']);
        
        return response.headers;
    } catch (error) {
        console.error('Error making HEAD request:', error);
    }
}

// Example usage with Pokemon API
// This API is:
// - Public (no authentication needed)
// - CORS-enabled (allows cross-origin requests)
// - Reliable with good uptime
// - Returns proper headers
const url = 'https://pokeapi.co/api/v2/pokemon/1';

// Using Fetch
checkResourceWithFetch(url);

// Using Axios (requires axios to be installed: npm install axios)
checkResourceWithAxios(url);

/**
 * Expected Response Headers:
 * - Status: 200 (OK)
 * - Content-Type: application/json
 * - Content-Length: Size of the resource
 * - Last-Modified: Timestamp of last update
 * 
 * Note: Some headers might not be present depending on the server configuration
 */ 