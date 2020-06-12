 const handleUpdateClass = (req,res, db)=> {
  const { admin, classe, mail } = req.body;
  console.log('updateclass')
  console.log(mail);
  if (!admin) {
    return res.status(400).json({
      status:'e',
      user : {mail: mail},
      message: 'Opération non autorisée'
    });
  }
  if (!mail) {
    return res.status(400).json({
      status:'e',
      user : {mail: null},
      message: 'Informations manquantes'
    });
  }


    db('utilisateurs').where({ mail: mail }).update({ classe: classe })
    .then( user => res.json({
      status:'u',
      user : {mail: mail},
      message: 'Information mise à jour'
    }))
    .catch(err => res.status(400).json({
      status:'e',
      user : {mail: mail},
      message: `Problème lors de la modification`
    }))
}


module.exports = {
  handleUpdateClass: handleUpdateClass
}
