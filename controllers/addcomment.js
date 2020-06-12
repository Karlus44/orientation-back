 const handleAddComment = (req,res, db)=> {
  const { user,lien,comment, type } = req.body;
  console.log('addcomment')
  const mail=user.mail;
  console.log(mail,lien,comment);

  if (!mail) {
    return res.status(400).json({
      status:'e',
      user: null,
      message: 'Informations manquantes'
    });
  }



if (user.classe==='Prof') {

  if (type==='files-prof') {
db.select('*').from('fichiers').where({ lien: lien })
   .then(file=> file[0])
   .then(x => {db.insert({
                  prénom: user.prénom,
                  nom: user.nom,
                  classe: user.classe,
                  mail: mail,
                  contenu: comment,
                  type: 'c',
                  file: x.id_file
                })
                .into('commentaires')
                        .then( user => res.json({
                          status:'u',
                          user : user[0],
                          message: 'Information mise à jour'
                        }))
                        .catch(err => res.status(400).json({
                          status:'e',
                          user: user[0],
                          message: `Problème lors de la transmission`
                        }))
                      })
} else if (type==='pp-data' || type==='admin-data'){
  db.select('*').from('partages').where({ lien_eleve: lien })
  // .join('utilisateurs','partages.utilisateur','=','utilisateurs.id')
  .then(file=> file[0])
  // .then(x=>console.log(x))
  .then(x => {db.insert({
    prénom: user.prénom,
    nom: user.nom,
    classe: user.classe,
    mail: user.mail,
    contenu: comment,
    type: 'd',
    file: x.id
  })
  .into('commentaires')
  .then( user => res.json({
    status:'u',
    user : user[0],
    message: 'Information mise à jour'
  }))
  .catch(err => res.status(400).json({
    status:'e',
    user: user[0],
    message: `Problème lors de la transmission`
  }))
})

} else {
  res.status(400).json({
  status:'e',
  user: user,
  message: `Problème lors de la transmission`
})
}
        } else {
          db.select('*').from('partages').where({ lien_eleve: lien })
          .then(file=> file[0])
          .then(x => {
            console.log(x);
            db.insert({
            prénom: user.prénom,
            nom: user.nom,
            classe: user.classe,
            mail: mail,
            contenu: comment,
            type: 'd',
            file: x.id
          })
          .into('commentaires')
          .then( user => res.json({
            status:'u',
            user : user[0],
            message: 'Information mise à jour'
          }))
          .catch(err => {
            console.log(err);
            res.status(400).json({
            status:'e',
            user: user[0],
            message: `Problème lors de la transmission`
          })
          }
        )
        })

        }
   }




module.exports = {
  handleAddComment: handleAddComment
}
