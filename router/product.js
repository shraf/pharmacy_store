const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const Product = require('../models/product');
const User = require('../models/user');
const Image = require("../models/image");
const router = express.Router();
const multer = require("multer");
var upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const cache = require("node-cache");
const myCache = new cache();
/* router.post('/', (req, res, next) => {
    console.log("dsa");
    console.log(req.headers);
    const jwtDecoded = jwt.verify(req.header('Authorization'), "secret_key");
    const id = jwtDecoded.user.id;
    console.log(jwtDecoded);
    User.findById(id)
        .then(user => {
            if (user.accountType === 'user')
                res.status(401).send('You are unauthorized to do that action');
            else
                next();
        }).catch(err =>
            res.status(404).send(err)
        )
}) */
//////////////////////////get 

router.get('/', (req, res) => {
    const pagination = req.query.pagination ? req.query.pagination : 10;
    const pageNumber = req.query.pagenumber ? req.query.pagenumber : 1;
    const category = req.query.category || "";
    const name = req.query.name || "";
    const rating = req.query.rating || 0;
    const cache_key = `${name}/&${category}/&${pageNumber}`;
    const is_cashed = myCache.has(cache_key);
    if (is_cashed) {
        console.log(myCache.get(cache_key));
        res.json(myCache.get(cache_key)).end();
    }
    else
        Product.find({
            "name": { "$regex": name, "$options": "i" },
            "avgRating": { $gte: rating },
            "category": { "$regex": category }

        })
            .skip((pageNumber - 1) * pagination)
            .limit(pagination)
            .then(products => { myCache.set(cache_key, products); res.send(products) });
});

router.get("/category/:category", (req, res) => {

    Product.find({ category: req.params.category }, "name")
        .then(products => res.json(products));

}
)


router.get('/:name', (req, res) => {
    Product.findOne({ name: req.params.name })
        .populate("product_image")
        .then(product =>
            res.send(product));
});

router.get('/:id/review', (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.send(product.reviews));
});

router.get('/:id/review/detailed', async (req, res) => {
    const product = await Product.findById(req.params.id);
    console.log(product);
    const reviews = product.reviews;
    let ratingCount = {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0
    };
    reviews.forEach(review =>
        ratingCount[review.rating]++
    );
    return res.send(ratingCount);

})

router.get('/test', (req, res) => {
    res.send("test");
})


//////////////////////////post

router.post('/', upload.single('file'), (req, res) => {
    const product = new Product(req.body);
    const image = new Image();
    image.img = fs.readFileSync(req.file.path);
    image.name = req.file.filename;
    image.save()
        .then(img => {
            product.product_image = img._id;
            product.save()
                .then((product) => {
                    const key = myCache.keys()
                        .filter(key => key.includes(`/&${product.category}/&`))[0];
                    myCache.set(key, myCache.get(key).concat([product]));
                    res.status(200).json(product).end()
                }).catch(err => res.status(403).send(err))
        }).catch(err => res.status(403).send(err));
});
router.post('/:id/review', async (req, res) => {
    console.log(req.get('Authorization'));
    const jwtDecoded = jwt.verify(req.get('Authorization'), "secret_key");
    const uid = jwtDecoded.user.id;
    const username = jwtDecoded.user.username;

    const product = await Product.findById(req.params.id);
    let filtered = product.reviews.filter(review => {
        return review.userId === uid;

    });
    console.log(filtered);
    if (filtered.length > 0)
        return res.status(409).send("user can't send multible reviews on same product");
    const totalReviews = product.reviews.length;
    const totalRating = totalReviews * product.avgRating;
    product.avgRating = product.avgRating > 0 ? (totalRating + req.body.review.rating) / (totalReviews + 1) : req.body.review.rating;
    product.reviews.push({ ...req.body.review, userId: uid, userName: username });
    console.log('ddd');

    product.save();
    return res.send("review has been added");

})
/////////////////////put

    router.put("/:id",upload.single('file'),(req,res)=>{
        console.log(req.body);
        Product.findOneAndUpdate(req.params.id,req.body,{runValidators: true})
        .then(()=>res.status(200).end())
        .catch(err=>res.status(403).end());
    }
    )

///////////////////////delete
router.delete('/:id', (req, res) => {
    console.log(req.params);
    Product.deleteOne({ _id: req.params.id }).then(() => {
        res.send("product has been deleted");

    }).catch((err) => {
        res.status(404).send(err)
    });
})
router.delete('/:id/review/:uid', (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.reviews.filter(review => {
                return review.userId != req.params.uid
            });
            product.save();
        }
        );

    res.send("review has been deleeted ");
})

///////////////////middleware

module.exports = router;