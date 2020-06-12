const handleDisplayFiles = (req,res,db)=> {
  console.log("displayfiles");
  console.log(req.body);
  return db.select('*').from('fichiers')
  .then(data=> {
      res.json(data)
      })
      .catch(err => res.status(400).json('unable to get data'))

}

module.exports = {
  handleDisplayFiles: handleDisplayFiles
}
