const handleDisplay = (req,res,db)=> {
  console.log("display");
  console.log(req.body);
  const { admin } = req.body;
  if (admin){
      return db.select('*').from('utilisateurs')
      .then(user=> {
        res.json(user)
      })
      .catch(err => res.status(400).json('unable to get user'))
    } else {
      res.status(400).json('accès non autorisé')
    }
}

module.exports = {
  handleDisplay: handleDisplay
}
