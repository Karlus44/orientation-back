 const handleChangePassword = (req,res, db, bcrypt)=> {
  const { previousPassword, newPassword, mail } = req.body;
  console.log('changepassword')
  console.log(mail);

  if (!mail || !previousPassword || !newPassword) {
    return res.status(400).json({
      status:'e',
      mail: null,
      message: 'Informations manquantes'
    });
  }

  db.select('user', 'hash').from('login')
  .where('user','=', mail)
  .then(data=> {
    console.log(data[0]);
    const isValid = bcrypt.compareSync(previousPassword, data[0].hash);
    console.log(isValid);
    if (isValid){
      const newHash = bcrypt.hashSync(newPassword);
      db('login').where({ user: mail }).update({ hash: newHash })
      .then( user => res.json({
        status:'u',
        user : {mail: mail},
        message: 'Le mot de passe a été changé'
      }))
      .catch(err => res.status(400).json({
        status:'e',
        user : {mail: mail},
        message: `Problème lors de la modification`
      }))
    } else {
      res.status(400).json({
        status:'e',
        user : {mail: mail},
        message: `Erreur d'authentification`
      })
    }
  })
  .catch(err => res.status(400).json({
    status:'e',
    user : {mail: mail},
    message: `Erreur d'authentification`
  }))
  }


module.exports = {
  handleChangePassword: handleChangePassword
}
