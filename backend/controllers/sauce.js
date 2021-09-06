const Sauce = require('../models/sauce')
const fs = require('fs')

exports.createSauce =  (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  console.log(sauceObject)
  const sauce = new Sauce ({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  sauce.save()
    .then(() => res.status(201).json({message:'Sauce enregistrée'}))
    .catch(error => res.status(400).json({error}))
}


exports.modifySauce =  (req,res,next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body}
  Sauce.updateOne({ _id: req.params.id}, {...sauceObject, _id: req.params.id})
    .then(() =>res.status(200).json({message:'Sauce modifiée'}))
    .catch(error => res.satatus(400).json({error}))
}

exports.deleteSauce =  (req,res,next) => {
  Sauce.findOne({ _id: req.params.id})
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1]
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({message: 'Sauce supprimée'}))
    .catch(error => res.status(400).json({error}))
    })
  })
  .catch(error => res.satus(500).JSON({error}))
  
}

exports.getOneSauce =  (req,res,next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}))
}

exports.getAllSauces =  (req,res,next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}))
}

exports.likeStatus = (req,res,next) => {
  const user = req.body.userId
  const likeValue = req.body.likeValue

  Sauce.updateOne({_id : req.params.id})
  .then(sauce => {
    if(likeValue ===1) {
      {$inc: {likes: 1}}
      sauce.likes += 1
      sauces.usersLiked.push(user)
    }
    else if (likedValue === -1) {
      sauce.dislikes -= 1
      sauce.usersDisliked.push(req.body.userId)
    }
    else if(likeValue === 0) {
      Sauce.findOne ({ _id : req.params.id})
      .then((sauce) => {
        if (sauce.usersLiked.includes(user)) {
          Sauce.updateOne(
            {_id: req.params.id},
            {$pull: {usersLiked: user},
          $inc: {likes: -1},
        }
          ).then(() => res.status(200).json({message: "Vous n'aimez plus cette sauce"}))
          .catch((error) => res.status(400).json({error}))
        }
      })
    }
  })
}