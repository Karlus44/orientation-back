const handleMessageClasse = (req,res,db)=> {
  console.log("messageclasse");
  console.log(req.body);
  const { prénom, nom, mail, resp, message } = req.body;
  const list = Object.keys(resp);
  console.log(list);

  db.select('*').from('utilisateurs').where({ mail: mail })
      .then(user=> user[0].id)
      .then(x => {


  list.map(elt => {
    db.insert({
                   prénom: prénom,
                   nom: nom,
                   classe: elt,
                   mail: mail,
                   contenu: prénom + ' ' + nom + ' a envoyé un message: ' + message,
                   type: 'm',
                   user_id: x,
                 })
                 .into('commentaires')
                 .returning('*')
                 .then(data=> {
                   console.log(data[0])
                 })
                 .then(requete => res.json({
                   status:'u',
                   message: 'Le message a bien été envoyé'
                 }))
                 .catch(err => res.status(400).json({
                   status:'e',
                   message: `Un problème est survenu. Le message n'a pas pu être envoyé`
                 }))
  })
})
.catch(err => res.status(400).json({
  status:'e',
  message: `Un problème est survenu. Le message n'a pas pu être envoyé`
}))

}


module.exports = {
  handleMessageClasse: handleMessageClasse
}
