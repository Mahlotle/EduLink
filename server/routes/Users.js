const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");// for hashing passwords
const {validateToken}= require('../middlewares/AuthMiddleware');
const {sign} = require("jsonwebtoken");

//REGISTRATION ROUTER
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

//LOGIN ROUTER
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    return res.json({ error: "User Doesn't Exist" }); // Add return here
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({ error: "Wrong Username And Password Combination" }); // Add return here
    }
//if everything pass redirect
const accessToken= sign({username: user.username, id:user.id},"importantsecret");
    res.json({token: accessToken, username: username , id: user.id});
  });
});

//CHECKING VALID TOKEN
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

//CREATING A GET TO SHOW A USER PROFILE
router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;
  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});


module.exports = router;
