'use strict'


const { ObjectId } = require('mongodb')
const express = require('express')

module.exports = db => {
  console.log('i am in the apis file');
  const router = express.Router()

  const wrapAsync = handler => (req, res) => handler(req)
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.message }))

  router.get('/', wrapAsync(async function(req) {
     console.log('in /api/test');
     return {data: 'success'};
  }));
 return router;
}
    

//   router.get('/', wrapAsync(async function(req) {
//     return db.collection('Book').find().sort({ createdAt: -1 }).toArray()
//   }))

//   router.post('/', wrapAsync(async function(req) {
//     const book = new BookType(req.body)
//     await db.collection('Book').insertOne(book)
//     return { book }
//   }))

//   router.delete('/:id', wrapAsync(async function(req) {
//     const { result } = await db.collection('Book').deleteOne({
//       _id: Archetype.to(req.params.id, ObjectId)
//     })
//     return { result }
//   }))

 