 const handleResetPassword = (req,res, db, bcrypt)=> {
  const { admin, mail } = req.body;
  console.log('resetpassword')
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



  db.select('mail','initpw').from('utilisateurs').where('mail','=',mail).then(user=> user[0])
  .then(x => {if  (x) {
    console.log(`L'utilisateur est présent dans la base`);
    db.transaction( trx => {
      console.log(x);
      trx('login').where('user','=',mail).update({
        hash : bcrypt.hashSync(x.initpw)
      })
      .returning('*')
      // .then( user => json(user)[0])
      // .then(user => console.log(user[0].id))
      .then( user => {
        console.log('delete');
        console.log(user[0].user);
        trx('request_pw').where({user: user[0].user}).del()
        .returning('*')
        .then( user => res.json({
          status:'u',
          user: user[0],
          message: `Le mot de passe de votre compte a été récemment réinitialisé. Si vous êtes l'auteur de cette réinitialisation, considérez ce message à titre d'information uniquement. Votre nouveau mot de passe est : `+x.initpw
        }))
        .then(trx.commit)
        .catch(trx.rollback)
      })
    })
    .catch(err => res.status(400).json({
      status:'e',
      user : {mail: mail},
      message: 'Un problème est survenu'
    }))
  } else {
        console.log(`L'utilisateur n'est pas dans la base`);
        db('request_pw').where('mail','=',user[0].user).del()
        .catch(err => res.status(400).json({
          status:'e',
          user : {mail: mail},
          message: `Un problème est survenu`
        }))
  }
  })
}

module.exports = {
  handleResetPassword: handleResetPassword
}
