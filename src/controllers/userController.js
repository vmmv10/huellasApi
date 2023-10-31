import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function register(req, res) {
  const data = req.body.data
  const isEmailExist = await prisma.usuario.findFirst({
    where: {
      email: data.email
    },
  });
  if (isEmailExist) {
    return res.status(400).json({ error: 'Email ya registrado' })
  }
  try {
    bcrypt.hash(data.password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ err })
      }
      const savedUser = await prisma.usuario.create({
        data: {
          nombre: data.nombre,
          apellidos: data.apellidos,
          email: data.email,
          password: hash,
        }
      })
      // sendConfirmationEmail(userCreated)
      res.json({
        error: null,
        data: savedUser
      })
    })
  } catch (error) {
    res.status(400).json({ error })
  }
};

export async function login(req, res) {
  const data = req.body
  const user = await prisma.usuario.findFirst({
    where: {
      email: data.email
    },
    // include: {
    //   imagen_tabla: {
    //     select: {
    //       imagen: {
    //         select: {
    //           id: true,
    //           url: true, // Puedes seleccionar los campos de imagen que necesites
    //           nombre: true,
    //           uso: true,
    //           public_id: true
    //         }
    //       }
    //     }
    //   },
    // },
  });
  if (!user) {
    return res.status(400).json({ error: 'Email no registrado' })
  }
  try {
    bcrypt.compare(data.password, user.password, async (err) => {
      if (err) {
        console.log(err)
      }
      const access_token = jwt.sign(Object.assign({}, user), process.env.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 4, // seconds
      });
      user.access_token_backend = access_token
      res.json(
        user
      )
    });
  } catch (error) {
    res.status(400).json({ error })
  }
};

export async function authToken(req, res) {
  const user = req.body
  console.log(user)
  const userSearch = await prisma.usuario.findFirst({
    where: {
      email: user.email
    }
  });
  console.log(userSearch)
  try {
    if (!userSearch) {
      const savedUser = await prisma.usuario.create({
        data: {
          nombre: user.nombre,
          email: user.email,
        }
      })
      const access_token = jwt.sign(Object.assign({}, savedUser), process.env.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 4, // seconds
      });
      savedUser.access_token_backend = access_token
      res.json(savedUser)
    } else {
      const access_token = jwt.sign(Object.assign({}, userSearch), process.env.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 4, // seconds
      });
      userSearch.access_token_backend = access_token
      res.json(userSearch)
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
};

function sendConfirmationEmail(user) {

  const resend = new Resend(process.env.RESEND_API_KEY);

  resend.emails.send({
    from: 'Huellas de Pudú <onboarding@resend.dev>',
    to: 'huelladepudu@gmail.com',
    subject: 'Confirmación de Correo',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
  });
}

function confirmAccount(token) {
  var email = null;
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    email = payload.email;
  } catch (err) {
    throw new Error('invalid token');
  }

  return this.findOne({ email })
    .then(user => {
      if (!user) throw new Error('user not found');
      if (user.emailVerified) throw new Error('user already verified');

      user.emailVerified = true;
      return user.save();
    });
}
