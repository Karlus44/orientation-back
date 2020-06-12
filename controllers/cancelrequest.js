 const handleCancelRequest = (req,res, db)=> {
  const { admin, mail } = req.body;
  console.log('cancelrequest')
  console.log(mail);

  if (!admin) {
    return res.status(400).json({
      status:'e',
      mail: mail,
      message: 'Opération non autorisée'
    });
  }
  if (!mail) {
    return res.status(400).json({
      status:'e',
      mail: null,
      message: 'Informations manquantes'
    });
  }


  db('request_pw').where({ user: mail }).del()
  .then( user => res.json({
    status:'d',
    user : {mail: mail},
    message: 'Utilisateur effacé de la base'
  }))
  .catch(err => res.status(400).json({
    status:'e',
    user : {mail: mail},
    message: `Problème lors de la suppression`
  }))

  }



module.exports = {
  handleCancelRequest: handleCancelRequest
}
