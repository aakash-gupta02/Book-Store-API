function logger(req, res, next) {
  const now = new Date();
  const timestamp = now.toLocaleString('en-IN', {
    dateStyle: 'short',
    timeStyle: 'medium',
    hour12: true,
  });

  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}

export default logger;
