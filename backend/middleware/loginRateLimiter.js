let loginAttempts = 0;
let lastAttemptTime = null;

function loginLimiter(req, res, next) {
    const { password } = req.body;

    if (password !== "correctPassword") {
        loginAttempts++;
        lastAttemptTime = Date.now();

        if (loginAttempts > 3) {
            const currentTime = Date.now();
            const timeDifference = Math.floor((currentTime - lastAttemptTime) / 1000);

            if (timeDifference < 30) {
                return res.status(403).json({ message: "Trop de tentatives échouées. Veuillez réessayer dans " + (30 - timeDifference) + " secondes." });
            } else {
                loginAttempts = 0;
            }
        }
    }

    next();
}

module.exports = loginLimiter;