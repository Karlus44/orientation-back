 const handleUpdateUser = (req,res, db)=> {
  const { admin, prénom, nom, classe, mail, initPW, adminuser, resp, autoeval } = req.body;
  console.log('updateuser')
  console.log(prénom, nom, classe, mail, initPW, adminuser, resp);
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

db('utilisateurs').where({ mail: mail }).update({ prénom: prénom, nom: nom, classe: classe, initpw: initPW, admin: adminuser, resp: resp, autoeval: autoeval })
            .then( user => res.json({
              status:'u',
              user: { prénom: prénom, nom: nom, classe: classe, mail: mail, initpw: initPW, admin: adminuser, resp: resp, autoeval: autoeval },
              message: 'Information mise à jour'
            }))
            .catch(err => res.status(400).json({
              status:'e',
              user: { prénom: prénom, nom: nom, classe: classe, mail: mail, initpw: initPW, admin: adminuser, resp: resp, autoeval: autoeval },
              message: `Problème lors de la modification`
            }))



}


module.exports = {
  handleUpdateUser: handleUpdateUser
}
