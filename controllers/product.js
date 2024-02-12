import { db } from "../db.js";

export const getProducts = (_, res) => {
  const q = "SELECT * FROM product";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const getProduct = (req, res) => {
  const q = "SELECT * FROM product WHERE id=?";
  const qphotos = "SELECT * FROM photo_product WHERE id=?";

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.json(err);

    db.query(qphotos ,req.params.id, (err, dataPhotos) => {
      if(err) return res.json(err);
      
      return res.status(200).json({
        description: data[0],
        photos: dataPhotos
      });

    })
  });
};

export const getProductPhotos = (req, res) => {
  const q = "SELECT * FROM photo_product WHERE id=?";

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
