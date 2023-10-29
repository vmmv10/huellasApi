import jwt from 'jsonwebtoken'


export function isAuthenticated(req, res, next) {
  const tokens = req.header('Authorization')
  const access_token = tokens.split("Bearer ");

  if (!access_token) return res.status(403).send({ success: false, message: 'user not Authorized', headers: req.headers });

  if (access_token) {
    jwt.verify(access_token[1], process.env.TOKEN_SECRET, function (err, decoded) {
      if (err) {
        console.log(err);
        return res.status(400).json({ err })
      }
      next();
    })
  }
}