# HTTP (Hypertext Transfer Protocol)

## Table of Contents
1. [Introduction](#introduction)
2. [HTTP Methods](#http-methods)
3. [HTTP Status Codes](#http-status-codes)
4. [HTTP Headers](#http-headers)
5. [HTTP Request/Response](#http-requestresponse)
6. [HTTPS](#https)
7. [HTTP/2 and HTTP/3](#http2-and-http3)

## Introduction
HTTP is the foundation of data communication on the World Wide Web. It's a protocol that allows fetching resources, such as HTML documents, images, and other media.

## HTTP Methods
- **GET**: Retrieve data
- **POST**: Submit data
- **PUT**: Update entire resource
- **PATCH**: Partial resource update
- **DELETE**: Remove resource
- **HEAD**: Get headers only (identical to GET but returns only headers without body, useful for checking resource metadata like size or last-modified date without downloading the full content) - [Example](./codePlayground/headRequest.js)
- **OPTIONS**: Queries the server for supported HTTP methods and other capabilities for a specific URL. Returns allowed methods in the 'Allow' header and CORS details in 'Access-Control-*' headers. Commonly used in CORS preflight requests to check if a cross-origin request is allowed. - [Example](./codePlayground/optionsRequest.js)
- **TRACE**: Debug request path

## HTTP Status Codes
### 1xx - Informational
- 100: Continue
- 101: Switching Protocols

### 2xx - Success
- 200: OK
- 201: Created
- 204: No Content

### 3xx - Redirection
- 301: Moved Permanently
- 302: Found
- 304: Not Modified

### 4xx - Client Errors
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests

### 5xx - Server Errors
- 500: Internal Server Error
- 502: Bad Gateway
- 503: Service Unavailable

## HTTP Headers
### Common Request Headers
- Accept
- Authorization
- Content-Type
- User-Agent
- Cookie

### Common Response Headers
- Cache-Control
- Content-Type
- Set-Cookie
- Access-Control-Allow-Origin

## HTTP Request/Response
### Request Structure


# CORS (Cross-Origin Resource Sharing)

## Introduction
CORS is a security feature implemented by web browsers to prevent web pages from making requests to a different domain than the one that served the web page.

## How it works
1. A web page makes a request to a different domain than the one that served the web page.
2. The browser sends an OPTIONS request to the server to check if the server allows cross-origin requests.
3. The server responds with the necessary headers to allow the cross-origin request.
4. The browser sends the actual request to the server.
5. The server processes the request and sends the response back to the browser.

## How to implement CORS
1. Set the Access-Control-Allow-Origin header in the response to the value of the Origin header in the request.
2. Set the Access-Control-Allow-Methods header in the response to the value of the Access-Control-Request-Method header in the request.
3. Set the Access-Control-Allow-Headers header in the response to the value of the Access-Control-Request-Headers header in the request.
4. Set the Access-Control-Allow-Credentials header in the response to true if the request has the Authorization header.
5. Set the Access-Control-Max-Age header in the response to the number of seconds the results of a preflight request can be cached.

## Sample preflight request
```
OPTIONS /api/resource HTTP/1.1
Origin: https://example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization
```

## Sample preflight response
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

## Why cors is needed?
- To allow web pages to make requests to a different domain than the one that served the web page.



## How cross origin resource sharing is harmfull in general
- It allows web pages to make requests to a different domain than the one that served the web page.
- This is to prevent security issues such as cross-site scripting (XSS) and cross-site request forgery (CSRF).


## Sample code to implement cors in a secure way
[codePlayground/cors.js](./codePlayground/cors.js)







