const handleDisplayComments = (req,res,db)=> {
  console.log("displaycomments");
  console.log(req.body);
  const { user, link } = req.body;
  console.log(user.mail,link);


if (user.classe==='Prof') {

db('fichiers').where({lien: link}).returning('*')
.then(id => id[0].id_file)
// .then(x=>console.log(x))
.then(id => {

  db.select('*').from('commentaires').where('file',id)
      .andWhere('type', 'c')
      .orderBy('created_at', 'asc')
      .then(requete=> {
        console.log(requete);
        res.json(requete)
      })
      .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))

  } else {
    db('partages').where({lien_eleve: link}).returning('*')
    .then(id => id[0].id)
    // .then(x=>console.log(x))
    .then(id => {

      db.select('*').from('commentaires').where('file',id)
      .andWhere('type', 'd')
      .orderBy('created_at', 'asc')
      .then(requete=> {
        console.log(requete);
        res.json(requete)
      })
      .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))

    }
  }

module.exports = {
  handleDisplayComments: handleDisplayComments
}
