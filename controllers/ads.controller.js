const Ad = require('../models/ad.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find().populate('user'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('user');
    if (!ad) res.status(404).json({ message: 'Not found...' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ messahe: err });
  }
};

exports.add = async (req, res) => {
  try {
    const { title, text, date, price, location } = req.body;
    const image = req.file;

    const fileType = image ? await getImageFileType(image) : 'unknown';

    if (
      title &&
      text &&
      date &&
      price &&
      location &&
      image &&
      ['image/png', 'image/jpeg', 'image/jpg'].includes(fileType)
    ) {
      const newAd = new Ad({
        title: title,
        text: text,
        date: date,
        price: price,
        location: location,
        image: image.filename,
        user: req.session.user,
      });
      await newAd.save();
      res.json({ message: 'added' });
    } else {
      fs.unlinkSync(`./public/uploads/${image.filename}`);
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    fs.unlinkSync(`./public/uploads/${image.filename}`);
    res.status(500).send({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, text, date, price, location } = req.body;
    const image = req.file;
    const fileType = image ? await getImageFileType(photo) : 'unknown';
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      await Ad.updateOne(
        { _id: req.params.id },
        {
          $set: {
            title: title,
            text: text,
            date: date,
            price: price,
            location: location,
          },
        }
      );
      if (image && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
        image: image.filename;
      }
      res.json({ message: 'Updated' });
    } else {
      fs.unlinkSync(`./public/uploads/${image.filename}`);
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      fs.unlinkSync(`./public/uploads/${ad.image}`);
      await ad.deleteOne(ad);
      res.json({ message: 'Ad deleted' });
    } else res.status(404).send({ message: 'Not found...' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.search = async (req, res) => {
  const { searchPhrase } = req.params;
  try {
    const ad = await Ad.find({ title: { $regex: searchPhrase } });
    if (!ad) res.status(404).json({ message: 'Not found...' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
