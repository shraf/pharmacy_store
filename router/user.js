const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Product = require('../models/product');
const Order = require('../models/order');
const mongoose = require('mongoose');
const router = express.Router();


const authFacebook = async (id) => {
    const user = await User.findOne({ facebook_id: id });
    return user ? user : false;
}


const signJwt = async (user, callback) => {
    console.log("tetsetbatuib");
  console.log(user);
    jwt.sign({
        user: {
            email: user.email,
            username: user.username
            , id: user.id
            , isAdmin: user.accountType === 'admin'
            , phoneNumber: user.phoneNumber
        }
    }, "secret_key", { expiresIn: 60 * 60 * 24 * 14 }, (err, token) => callback(err, token));
}

///////////////////////Get Requests
router.get('/', (req, res) => {
    User.find().then(users => res.send(users));
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(err => res.status(404).send(err));
});
router.get('/:id/orders', (req, res) => {
    Order.find({ userId: req.params.id }).populate("products.item")
        .exec((err, doc) => {
            console.log(doc);
            res.send(doc);
        });

});

router.get('/:id/cart', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.send(user.cart));
})
router.get('/:id/cart/products', async (req, res) => {
    let products = [];
    let user = await User.findById(req.params.id);
    urls = user.cart.map(order => order._id);
    Product.find({
        '_id': {
            $in: urls

        }
    }).then(products => res.send(products))
}

)

router.get('/:id/review/:oid', (req, res) => {
    Product.findById(req.params.oid)
        .then(product => {
            return res.send(product.reviews.filter(review => review.userId === req.params.id))
        })
})

router.get('/:id/contact', (req, res) => {
    User.findById(req.params.id, 'phoneNumber address -_id')
        .then(user => res.send(user));
})
//////////////////////////////post
router.post('/register', (req, res) => {
    const user = new User({
        ...req.body
        , password: bcrypt.hashSync(req.body.password, 10)
        , accountType: 'user'
    }
    );

    if (user.password.length < 6)
        res.status(403).json("bad password").end();

    user.save()
        .then(user => signJwt(user, (err, token) => res.json({ token }))
        )
        .catch(err => { res.status(403).send(err.message); console.log(err.message) });

})

router.post('/login', (req, res) => {
    console.log('body');
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(404).send('user is not found');
            }
            onCheckingPassword(res, req.body.password, user.password, () => signJwt(user, (err, token) => res.json({ token }))
            )

        }
        )
        .catch(err => {
            console.log('err');
            console.log(err);
        });

});

router.post('/facebook/login', (req, res) => {
    const accessToken = req.body.accessToken;
    const id = req.body.id;
    const options = {
        method: "GET",
        uri: `https://graph.facebook.com/v2.8/${id}`,
        qs: {
            access_token: accessToken,
            fields: "name,email"
        }
    };
    request(options)
        .then(async (fbRes) => {
            const user = await authFacebook(id);
            return user ? signJwt(user, (err, token) => res.json({ "is_signed": true, "token": token }).end()) : res.json({ "is_signed": false }).end()
        });
})
router.post("/facebook/register", (req, res) => {
    const user = new User(req.body);
    user.save().
        then(user => signJwt(user, (err, token) => res.json(token).end()));
})

router.post('/:id/orders', (req, res) => {
    let status = 200;

    User.findById(req.params.id)
        .then(user => {
            const order = new Order({
                userId: user._id,
            });
            order.price = 0;
            req.body.products.forEach((product) => {
                order.products.push({
                    item: mongoose.Types.ObjectId(product.productId),
                    quantity: product.quantity
                });
                order.price += product.price * product.quantity
            });
            console.log("pre post save");
            order.save().then((norder) => {

                user.orders = [];
                user.orders.push(norder._id);
                console.log("useris getting saved");

                user.save().then(user => res.status(200).send('order has been created').end()
                );
            }
            ).catch(err => console.log(err));



            ;
        }).catch(err => {
            console.log('err');
            console.log(err);
        });
})
/* router.post('/:id/cart', (req, res) => {
    console.log('cart order is as following');
    console.log(req.body.order);
    User.findById(req.params.id)
        .then(user => {
            user.cart.push(req.body.order);
            user.save();
            res.send('cart has been posted');
        })
        .catch(err => res.status(403).send(err));
}) */
////////////////////////put requests
router.put('/:id/orders/:oid', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.orders.find(order => {
                if (order.id = req.params.oid) {
                    order = { ...order, quantity: req.body.order.quantity }; return true;
                }
            }
            );
        })
})
router.put('/:id/cart/:cid', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.cart.find(order => {
                if (order.id = req.params.cid) {
                    order = { ...order, quantity: req.body.order.quantity }; return true;
                }
            })
        })
})
router.put('/:id', (req, res,next) => {
    const newPassword = undefined;
    User.findById(req.params.id)
        .then(user => {
            res.status(500).send().end();
            return(next());
                if (user.password) {

                    if (!bcrypt.compareSync(req.body.opassword, user.password))
                        res.status(403).send("Wrong credentials").end();
                    else
                        if (req.body.password != req.body.rpassword)
                            res.status(403).send("Non identical credentials").end();
                    newPassword = bcrypt.hashSync(req.body.password, 10);
                }

            /* const query = {
                email: req.body.email || user.email,
                password: newPassword,
                phoneNumber: req.body.phoneNumber || user.phoneNumber
            }

            User.updateOne({ _id: req.params.id }, { $set: query },).then((user) => signJwt(user, (err, token) => res.json({ token })));
        }).catch(err => { console.log(err); res.status(505).send().end(); }); */
        user.email=req.body.email || user.email;
        user.password=newPassword;
        user.phoneNumber=req.body.phoneNumber || user.phoneNumber;
        user.save().then(user=>signJwt(user,(err,token)=>{console.log(token);res.json(token)}));
    })


})

router.delete('/:id/cart/:productId', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            console.log("removed");
            console.log(user);
            console.log(req.params);
            user.cart = user.cart.filter(product => product._id != req.params.productId);
            user.save();
            res.send('has been removed');
        });
})
router.delete('/:id/cart', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.cart = [];
            user.save();
            res.send('cart has been cleared');
        })
})

const onCheckingPassword = (res, enteredPassword, hashedPassword, callback) => {
    bcrypt.compare(enteredPassword, hashedPassword, function (err, valid) {
        console.log(enteredPassword);
        if (valid) {
            callback();
        }
        else {
            console.log(err);

            console.log("user has been not");

            res.status(403).send('wrong password');
        }

    });

}
module.exports = router;