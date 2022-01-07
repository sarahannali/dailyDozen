const errorHandler = (err, res) => {
  return  res.status(err.status).json(err.message);
}

export default errorHandler;