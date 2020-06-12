 const handleRegister = (req,res, db, bcrypt)=> {
  const { admin,prenom, nom, classe, mail, initPW } = req.body;
  console.log('register')
  console.log(prenom, nom, mail, initPW);
  if (!admin) {
    return res.status(400).json({
      status:'e',
      user : {mail: mail},
      message: 'Opération non autorisée'
    });
  }
  if (!mail || !initPW) {
    return res.status(400).json({
      status:'e',
      user : {mail: null},
      message: 'Informations manquantes'
    });
  }
  const hash = bcrypt.hashSync(initPW);
  console.log(hash);


  console.log('test :')
  db.select('*').from('login').where('user','=',mail).then(user=> user[0])
  .then(x => {if  (x) {
    console.log('utilisateur déjà présent dans la base');
    // res.status(400).json('utilisateur déjà présent dans la base');
    db.transaction( trx => {
      trx('login').where('user','=',mail).update({
        hash : hash
      })
      .returning('*')
      // .then( user => json(user)[0])
      // .then(user => console.log(user[0].id))
      .then( user => {
        console.log('update');
        trx('utilisateurs').where('mail','=',user[0].user).update({
          prénom : prenom,
          nom : nom,
          classe : classe,
          initpw : initPW,
          login_id: user[0].id,
        })
        .returning('*')
        .then( user => res.json({
          status:'u',
          user: user[0],
          message: 'Données mises à jour'
        }))
        .then(trx.commit)
        .catch(trx.rollback)
      })
    })
    .catch(err => res.status(400).json({
      status:'e',
      user : {mail: mail},
      message: 'Problème lors de la suppression'
    }))
  } else {
    console.log('inscription de l utilisateur')
        db.transaction( trx => {
          trx.insert({
            user : mail,
            hash : hash
          })
          .into('login')
          .returning('*')
          // .then( user => json(user)[0])
          // .then(user => console.log(user[0].id))
          .then( user => {
            console.log('insert');
            trx.insert({
              prénom : prenom,
              nom : nom,
              classe : classe,
              mail : user[0].user,
              initpw : initPW,
              login_id: user[0].id,
              autoeval: {connaissance:{
                    value : 0,
                    text : '',
                    color : 'rgb(0,0,0)'
                  },
                formations:{
                    value : 0,
                    text : '',
                    color : 'rgb(0,0,0)'
                  },
                techniques:{
                    value : 0,
                    text : '',
                    color : 'rgb(0,0,0)'
                  }}
            })
            .into('utilisateurs')
            .returning('*')
            .then( user => res.json({
              status:'i',
              user: user[0],
              message: 'Utilisateur inscrit dans la base'}))
            .then(trx.commit)
            .catch(trx.rollback)
          })
        })
        .catch(err => res.status(400).json({
          status:'e',
          user : {mail: mail},
          message: `Problème lors de l'inscription`
        }))
  }
})


}

module.exports = {
  handleRegister: handleRegister
}
