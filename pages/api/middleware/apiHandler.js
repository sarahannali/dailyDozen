import errorHandler from './errorHandler';

const apiHandler = (handler) => {
    return async (req, res) => {
        try {
            return await handler(req, res);
        } catch (err) {
            return errorHandler(err, res);
        }
    }
}

export default apiHandler;