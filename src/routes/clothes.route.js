'use strict';
const express = require('express');

const { clothesTable } = require('../models/index.models');

const clothesRouter = express.Router();


clothesRouter.get('/clothe', getClothes);
clothesRouter.get('/clothe/:id', getOneClothe);
clothesRouter.post('/clothe', addClothe);
clothesRouter.put('/clothe/:id', updateClothe);
clothesRouter.delete('/clothe/:id', deleteClothe);


async function getClothes(req, res) {
  let clothes = await clothesTable .read();
  res.status(200).json(clothes);
}
async function getOneClothe(req, res) {
  let clothe_Id = parseInt(req.params.id);
  let clothe = await clothesTable.read(clothe_Id);
  res.status(200).json(clothe);
}
async function addClothe(req, res) {
  let newClothe = req.body;
  let clothe = await clothesTable.create(newClothe);
  res.status(201).json(clothe);
}
async function updateClothe(req, res) {
  let clothe_Id = parseInt(req.params.id);
  let updateClothe = req.body;
  let foundClothe = await clothesTable.read(clothe_Id);
  if (foundClothe) {
    let updatedClothe = await clothesTable.update(updateClothe);
    res.status(201).json(updatedClothe);
  } else {
    res.status(404).json({ message:'Not found' });
  }
}
async function deleteClothe(req, res) {
  let clothe_Id= parseInt(req.params.id);
  let foundClothe = await clothesTable.read(clothe_Id);
  if (foundClothe) {
    let deletedClothe = await clothesTable.delete(clothe_Id);
    res.status(204).json(deletedClothe);
  } else {
    res.status(404).json({ message: ' Not found' });
  }
}

module.exports = clothesRouter;