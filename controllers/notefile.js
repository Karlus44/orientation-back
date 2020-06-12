 const handleNoteFile = (req,res, db)=> {
  const { mail, lien,notes, avg } = req.body;
  console.log('notefile')
  console.log(mail,lien,notes, avg);
  console.log(typeof(rating));
  if (!mail || !lien || !notes) {
    return res.status(400).json({
      status:'e',
      mail: null,
      message: 'Informations manquantes'
    });
  }


  db('fichiers').where({lien: lien}).update({notes: notes, average: avg}).returning('*')
  .then( answer => res.json({
    status:'u',
    answer: { auteur: mail, lien: lien, notes: notes, avg: avg},
    message: 'Information mise à jour'
  }))
  .catch(err => res.status(400).json({
    status:'e',
    answer: { auteur: mail, lien: lien, notes: notes, avg: avg},
    message: `Problème lors de la modification`
  }))




}


module.exports = {
  handleNoteFile: handleNoteFile
}
