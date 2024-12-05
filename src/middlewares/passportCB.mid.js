import passport from "./passport.mid.js";

export default (strategy) => {
    return async (req, res, next) => {
        if (strategy == "google") {
            passport.authenticate(strategy, { scope: ["email", "profile"] }, (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(info.statusCode || 400).json({
                        statusCode: info.statusCode || 400,
                        message: info.message || "ERROR"
                    });
                }
                req.user = user;
                return next();
            })(req, res, next);
        } else {
            passport.authenticate(strategy, { session: false }, (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(info.statusCode || 400).json({
                        statusCode: info.statusCode || 400,
                        message: info.message || "ERROR"
                    });
                }
                req.user = user;
                return next();
            })(req, res, next);
        }
    };
};

// Passport callback, es un middleware.