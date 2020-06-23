const handleDisplayFilesEleve = async (req,res,db)=> {
  console.log("displayfileseleve");
  const { type, eleve } =req.body;
  const mail = eleve.mail;
  console.log(type,mail);

  db('partages')
    .join('fichiers', 'partages.lien', '=', 'fichiers.lien')
    .select('*')
    .where('partages.lien_eleve', 'like', `public/${mail}/%`)
    .then(x=>res.json(x))
    .catch(err => res.status(400).json(err))



}

module.exports = {
  handleDisplayFilesEleve: handleDisplayFilesEleve
}
