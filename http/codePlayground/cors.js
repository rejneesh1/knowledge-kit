// ... existing content ...

// ## Sample code to implement cors in a secure way

// ### Node.js/Express Implementation
const express = require('express');
const cors = require('cors');

const app = express();

// Basic CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests only from trusted domains
    const allowedOrigins = ['https://trusted-domain.com', 'https://api.trusted-domain.com'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Protected route example
app.get('/api/protected-resource', (req, res) => {
  res.json({ message: 'This is a protected resource' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// ### Security Best Practices
// - Always specify allowed origins explicitly instead of using `*`
// - Limit allowed HTTP methods to only those needed
// - Set appropriate max age for preflight caching
// - Enable credentials only if necessary
// - Validate origin headers server-side
// - Use HTTPS for all cross-origin requests