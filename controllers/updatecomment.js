 const handleUpdateComment = (req,res, db)=> {
  const { idx,content } = req.body;
  console.log('updatecomment')
  console.log(idx,content);

  if (!idx) {
    return res.status(400).json({
      status:'e',
      comment: content,
      message: 'Informations manquantes'
    });
  }



db('commentaires').where({ id_comment: idx }).update({contenu:content})
                        .then( comment => res.json({
                          status:'u',
                          comment : comment.contenu,
                          message: 'Information mise à jour'
                        }))
                        .catch(err => res.status(400).json({
                          status:'e',
                          comment: content,
                          message: `Problème lors de la transmission`
                        }))

   }




module.exports = {
  handleUpdateComment: handleUpdateComment
}
