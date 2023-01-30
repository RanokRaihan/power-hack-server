const errorHandler = (error, req, res, next) => {
    res.json({ message: error });
};
module.exports = errorHandler;
