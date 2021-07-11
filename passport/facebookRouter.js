const express = require("express");
const jwt = require("jsonwebtoken");
const passportUtil = require("./main")();
const router = express.Router();
const User = require("../models/user");

const saveToDatabase = (entity) => {
    const user = new User(entity);
    user.save();
        
}

const getToken=async (user)=>{
    const token= await jwt.sign({ user: { email: user.email, id: user.id } }, 'secret_key', { expiresIn: 60 * 60 * 24 * 14 })
    return token;    
}

const isUserExist = async (user) => {
    return await User.findOne({ id: user.id }) ? true : false;
}

const getUserFromReq = (req) => {
    const user = req._json;
    return {
        id: user.id,
        firstname: user.name.split(" ")[0],
        lastname: user.name.split(" ")[1],
        email: user.email,
    }
}


router.get('/', passportUtil.passport.authenticate('facebook', { scope: ['email'] }));
router.get('/callback', passportUtil.passport.authenticate('facebook'), async (req, res) => {
    const user = getUserFromReq(req.user);
    const isUserExists = await isUserExist(user);
    const token= await getToken(user);

    res.send(isUserExists? `${req.body.successUrl}?token=${token}` :`${req.body.failureUrl}?token=${token}`).end();
});
router.post("/save",async (req,res)=>{
    const user=req.body;
    await saveToDatabase(user);
    const token=await getToken(user);
    res.json({token}).end();    
})
module.exports = router;
