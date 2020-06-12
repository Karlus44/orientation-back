const handleSignin = (req,res,db,bcrypt)=> {
  console.log("signin");
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Informations manquantes');
  }
  db.select('user', 'hash').from('login')
  .where('user','=', email)
  .then(data=> {
    console.log(data[0]);
    const isValid = bcrypt.compareSync(password, data[0].hash);
    if (isValid){
      console.log('mot de passe correct');
      return db.select('*').from('utilisateurs')
      .where('mail','=',email)
      .then(user=> {
        res.json(user[0])
      })
      .catch(err => res.status(400).json('Utilisateur non trouvé'))
    } else {
      res.status(400).json(`Erreur d'authentification`)
    }
  })
  .catch(err => res.status(400).json(`Erreur d'authentification`))
}

module.exports = {
  handleSignin: handleSignin
}
