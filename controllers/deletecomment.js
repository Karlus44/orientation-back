 const handleDeleteComment = (req,res, db)=> {
  const { idx } = req.body;
  console.log('deletecomment')
  console.log(idx);

  if (!idx) {
    return res.status(400).json({
      status:'e',
      message: 'Informations manquantes'
    });
  }



db('commentaires').where({ id_comment: idx }).del()
                        .then( comment => res.json({
                          status:'u',
                          message: 'Commentaire supprimé de la base'
                        }))
                        .catch(err => res.status(400).json({
                          status:'e',
                          message: `Problème lors de la suppression`
                        }))

   }




module.exports = {
  handleDeleteComment: handleDeleteComment
}
