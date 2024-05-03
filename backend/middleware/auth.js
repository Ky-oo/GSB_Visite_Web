const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
       const userId = decodedToken.userId;
       const responsable = decodedToken.responsable;
       req.auth = {
           userId: userId,
           responsable: responsable
       };
    next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
