 const handleFirstUser = (req,res, db, bcrypt)=> {
  const { prénom, nom, classe, mail, initPW } = req.body;
  console.log('register first user')
  console.log(prénom, nom, classe, mail, initPW);

  if (!mail || !initPW) {
    return res.status(400).json({
      status:'e',
      mail: null,
      message: 'Informations manquantes'
    });
  }
  const hash = bcrypt.hashSync(initPW);
  console.log(hash);


  db.select('*').from('login').then(user=> user[0])
  .then(x => {if  (x) {
    console.log(`La base n'est pas vide`);
    // res.status(400).json('utilisateur déjà présent dans la base');

    res.status(400).json({
      status:'e',
      user : {mail: mail},
      message: `La base n'est pas vide`
      })
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
              prénom : prénom,
              nom : nom,
              classe : 'Prof',
              mail : user[0].user,
              initpw : initPW,
              admin : true,
              login_id: user[0].id
            })
            .into('utilisateurs')
            .returning('*')
            .then( user => res.json(user[0]) )
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
  handleFirstUser: handleFirstUser
}
