 const handleCheckProfs = (req,res,db)=> {
  const { classe } = req.body;
  console.log('checkprofs')
  console.log(classe);

  if (!classe) {
    return res.status(400).json({
      status:'e',
      liste : [],
      message: `Informations manquantes`
    });
  }


    db.select('*').from('utilisateurs')
    .then( liste => liste.filter(elt=> Object.keys(elt.resp).includes(classe)))
    .then( liste => liste.map(elt => { return elt.prénom+' '+elt.nom}))
    .then( liste => {console.log(liste); return liste})
    .then( liste => res.json({
      status:'u',
      liste : liste,
      message: 'Informations trouvées'
    }))
    .catch(err => res.status(400).json({
      status:'e',
      liste : liste,
      message: `Problème lors de la recherche d'informations`
    }))
}


module.exports = {
  handleCheckProfs: handleCheckProfs
}
