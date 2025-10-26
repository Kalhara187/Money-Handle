const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Request logger middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // Log request
  const logEntry = {
    timestamp,
    method: req.method,
    url: req.url,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    headers: {
      'content-type': req.get('Content-Type'),
      'authorization': req.get('Authorization') ? '[REDACTED]' : undefined,
    }
  };

  console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${logEntry.ip}`);

  // Log to file
  fs.appendFile(
    path.join(logsDir, 'requests.log'),
    JSON.stringify(logEntry) + '\n',
    (err) => {
      if (err) console.error('Failed to write request log:', err);
    }
  );

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const responseLog = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.connection.remoteAddress,
    };

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);

    // Log to file
    fs.appendFile(
      path.join(logsDir, 'responses.log'),
      JSON.stringify(responseLog) + '\n',
      (err) => {
        if (err) console.error('Failed to write response log:', err);
      }
    );
  });

  next();
};

// Error logger middleware
const errorLogger = (error, req, res, next) => {
  const timestamp = new Date().toISOString();
  const errorLog = {
    timestamp,
    method: req.method,
    url: req.url,
    ip: req.ip || req.connection.remoteAddress,
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    headers: req.headers,
    body: req.body, // Be careful with sensitive data
  };

  console.error(`[${timestamp}] ERROR: ${error.message}`);
  console.error(`[${timestamp}] Stack: ${error.stack}`);

  // Log to file
  fs.appendFile(
    path.join(logsDir, 'errors.log'),
    JSON.stringify(errorLog) + '\n',
    (err) => {
      if (err) console.error('Failed to write error log:', err);
    }
  );

  next(error);
};

// Security logger for suspicious activities
const securityLogger = (activity, details) => {
  const timestamp = new Date().toISOString();
  const securityLog = {
    timestamp,
    activity,
    details,
  };

  console.warn(`[${timestamp}] SECURITY: ${activity}`);

  fs.appendFile(
    path.join(logsDir, 'security.log'),
    JSON.stringify(securityLog) + '\n',
    (err) => {
      if (err) console.error('Failed to write security log:', err);
    }
  );
};

module.exports = {
  requestLogger,
  errorLogger,
  securityLogger,
};
