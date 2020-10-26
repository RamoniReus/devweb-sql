const logging = (req, res, next) => {
  const now = new Date();
  console.log(now, req.method, req.originalUrl);
  next();
}

module.exports = logging;