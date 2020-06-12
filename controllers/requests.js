const handleRequests = (req,res,db)=> {
  console.log("requests");
  console.log(req.body);
  const { admin } = req.body;
  if (admin){
      return db.select('*').from('request_pw')
      .then(requete=> {
        res.json(requete)
      })
      .catch(err => res.status(400).json('unable to get user'))
    } else {
      res.status(400).json('accès non autorisé')
    }
}

module.exports = {
  handleRequests: handleRequests
}
