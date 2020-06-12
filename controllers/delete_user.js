const rimraf = require("rimraf");
// const fs = require('fs');

 const handleDeleteUser = (req,res, db)=> {
  const { admin, mail } = req.body;
  console.log('delete_user')
  console.log(mail);
  if (!admin) {
    return res.status(400).json({
      status:'e',
      user: {mail: mail},
      message: 'Opération non autorisée'
    });
  }
  if (!mail) {
    return res.status(400).json({
      status:'e',
      user: {mail: null},
      message: 'Informations manquantes'
    });
  }

db.select('admin').from('utilisateurs').where('mail','=',mail).then(
  x => { console.log(x);
    if (x[0].admin) {
    res.status(400).json({
      status:'e',
      user : {mail: mail},
      message: 'Vous ne pouvez pas supprimer un administrateur'
    })
  } else {
    db('login').where({ user: mail }).del()
    .then( user => {
      // console.log('../orientation-files/'+mail);
      // console.log(fs.readdirSync('../orientation-files/'+mail));
      rimraf.sync('../orientation-files/'+mail);
      // rimraf('../orientation-files/'+mail, function (err) { console.log(err); })
      // .then(
        // x => {
        res.json({
        status:'d',
        user : {mail: mail},
        message: 'Utilisateur effacé de la base'
      })
      // }
  // )
  })
    .catch(err => {
      console.log(err);
      res.status(400).json({
      status:'e',
      user : {mail: mail},
      message: `Problème lors de la suppression`
    })
  })
  }
}
)

}

module.exports = {
  handleDeleteUser: handleDeleteUser
}
