 const handleRequestPassword = (req,res, db)=> {
  const { mail } = req.body;
  console.log('requestpassword')
  console.log(mail);

  if (!mail) {
    return res.status(400).json({
      status:'e',
      mail: null,
      message: 'Informations manquantes'
    });
  }

  db.select('*').from('login').where('user','=',mail).then(user=> user[0])
  .then(x => {if  (x) {
    console.log('utilisateur déjà présent dans la base');
      db.insert({
        user : mail,
        login_id : x.id
      })
      .into('request_pw')
      .returning('*')
      .then(data=> {
        console.log(data[0]);
        res.json({
          status:'u',
          user : {mail: data[0].mail},
          message: `Une demande de réinitialisation de mot de passe a été transmise aux administrateurs. Un mail vous sera envoyé prochainement.`
        })
      })
      .catch(err => res.status(400).json({
        status:'e',
        user : {mail: mail},
        message: `Une demande de réinitialisation de mot de passe a été transmise aux administrateurs. Un mail vous sera envoyé prochainement.`
      })
    )
  } else {
    res.json({
      status:'e',
      user : {mail: mail},
      message: `Adresse mail inconnue.`
    })

  }
});

}


module.exports = {
  handleRequestPassword: handleRequestPassword
}
