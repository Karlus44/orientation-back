const handleDisplayResp = (req,res,db)=> {
  console.log("displayresp");
  console.log(req.body);
  const { resp } = req.body;
  const list = Object.keys(resp);
  console.log(list);
      return db.select('id','prénom','nom','classe','mail','autoeval').from('utilisateurs').whereIn('classe', list)
      .then(user=> {
        res.json(user)
      })
      .catch(err => res.status(400).json('unable to get user'))
}

module.exports = {
  handleDisplayResp: handleDisplayResp
}
