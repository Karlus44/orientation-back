const handleDisplayNotifications = (req,res,db)=> {
  console.log("displaynotifications");
  console.log(req.body);
  const { mail, resp, classe } = req.body;
  const list = Object.keys(resp);
  console.log(list);

  if (!mail) {
    return res.status(400).json({
      status:'e',
      mail: null,
      message: 'Informations manquantes'
    });
  }

      return db.select('*').from('commentaires').where('classe',classe)
      .andWhere('type', 'm')
      .union(function() {
        this.select('*').from('commentaires')
        .whereIn('classe', list)
        .andWhere('type','f')
      })
      .orderBy('created_at', 'desc')
      .then(requete=> {
        console.log(requete);
        res.json(requete)
      })
      .catch(err => res.status(400).json(err))
    }

module.exports = {
  handleDisplayNotifications: handleDisplayNotifications
}
