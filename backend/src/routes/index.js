const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => res.send("Hello Word!"));

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({ email, password });

  await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, "secretkey");

  res.status(200).json({ token });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) return res.status(401).send("The email doesnt exists");

  if (user.password !== password) return res.status(401).send("Wrong password");

  const token = jwt.sign({ _id: user._id }, "secretkey");

  res.status(200).json({ token });
});

router.get("/tasks", async (req, res) => {
  res.json([
    {
      _id: "1",
      name: "Task one",
      description: "Lorem ipsum",
      date: Date()
    },
    {
      _id: "2",
      name: "Task two",
      description: "Lorem ipsum",
      date: Date.now()
    },
    {
      _id: "3",
      name: "Task thre",
      description: "Lorem ipsum",
      date: Date.now()
    }
  ]);
});

router.get("/private-tasks",verifyToken, async (req, res) => {
  res.json([
    {
      _id: "1",
      name: "Task one",
      description: "Lorem ipsum",
      date: Date()
    },
    {
      _id: "2",
      name: "Task two",
      description: "Lorem ipsum",
      date: Date.now()
    },
    {
      _id: "3",
      name: "Task thre",
      description: "Lorem ipsum",
      date: Date.now()
    }
  ]);
});

router.get("/profile",verifyToken, async (req, res) => {
  res.send(req.userId);
});

module.exports = router;

function verifyToken(req, res, next) {

  if (!req.headers.authorization) return res.status(401).send('Unauthorized')
  const token = req.headers.authorization.split(' ')[1]

  if (!token) return res.status(401).send('Unauthorized');

  const payload = jwt.verify(token, 'secretkey')

  req.userId = payload._id;

  next();
}