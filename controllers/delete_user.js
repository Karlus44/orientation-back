const rimraf = require("rimraf");
const path = require('path');
// const fs = require('fs');

 const handleDeleteUser = (req,res, db, AWS)=> {
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


    // rimraf.sync('../orientation-files/'+mail);
    var s3 = new AWS.S3();
    var params = {
      Bucket : 'cloud-cube',
      Delete: {Objects: [   ] }
    };
    db('partages').where('lien_eleve', 'like', `public/${mail}/%`).then(liste => {liste.forEach((item) => {
      console.log(item);
      params.Delete.Objects.push({Key:path.join(item.lien_eleve,item.nom)});
    })
    }
    )
    .then( x =>{
    console.log(params);
    db('login').where({ user: mail }).del()
    .then( user => {


        res.json({
        status:'d',
        user : {mail: mail},
        message: 'Utilisateur effacé de la base'
      })
      }
    )
    }
  )
}
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


module.exports = {
  handleDeleteUser: handleDeleteUser
}
