 const handleUpdateFile = (req,res, db)=> {
  const { user,auteur,mail,lien,nom,description,notes } = req.body;
  console.log('updatefile')
  console.log(user,auteur,mail,lien,nom,description,notes);
  if (user.mail !== mail && !user.admin) {
    return res.status(400).json({
      status:'e',
      mail: mail,
      message: 'Opération non autorisée'
    });
  }
  if (!mail || !lien ) {
    return res.status(400).json({
      status:'e',
      mail: null,
      message: 'Informations manquantes'
    });
  }

db('fichiers').where({ lien: lien }).update({ auteur: auteur, mail: mail, lien: lien, nom: nom, description: description, notes: notes })
            .then( user => res.json({
              status:'u',
              user: { auteur: auteur, mail: mail, lien: lien, nom: nom, description: description, notes: notes },
              message: 'Information mise à jour'
            }))
            .catch(err => res.status(400).json({
              status:'e',
              user: { auteur: auteur, mail: mail, lien: lien, nom: nom, description: description, notes: notes },
              message: `Problème lors de la modification`
            }))



}


module.exports = {
  handleUpdateFile: handleUpdateFile
}
