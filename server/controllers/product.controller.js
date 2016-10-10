/**
 * Created by slava on 25.09.16.
 */

import Product from '../models/product';
import cuid from 'cuid';

import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */

export function getProducts(req, res) {
  Product.find().sort('name').exec((err, products) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({products});
    }
  });
}

export function addProduct(req, res) {
  if (!req.body.product.name || !req.body.product.code || !req.body.product.price || !req.body.product.description) {
    res.status(403).end();
  } else {

    const newProduct = new Product(req.body.product);

    // Let's sanitize inputs
    newProduct.code = sanitizeHtml(newProduct.code);
    newProduct.name = sanitizeHtml(newProduct.name);
    newProduct.description = sanitizeHtml(newProduct.description);
    newProduct.size = sanitizeHtml(newProduct.size);

    let objectColors = newProduct.colors = JSON.parse(newProduct.colors);
    let index = 0;
    
    Object.keys(objectColors).forEach(function(key) {
    newProduct.colors[key].name = sanitizeHtml(newProduct.colors[key].name);
      for(let i = 0, file; file = colorsObj[key].files[i]; i++) {
        newProduct.colors[key].files[i].filename = req.files[index].filename;
        newProduct.photos.push({ fileName: req.files[index].filename});
        index++;
      }
    });

    newProduct.cuid = cuid();

    newProduct.save().then((saved)=> {
      res.json({ product: saved })
    }).catch((err) => {
      res.status(500).send(err);
    });
  }
}
