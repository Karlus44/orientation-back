const fs = require('fs');

 const handleDeleteFile = (req,res, db)=> {
  const { user, lien, nom } = req.body;
  console.log('delete_file')
  console.log(user, lien, nom);

  if (!user.mail || !lien) {
    return res.status(400).json({
      status:'e',
      file: {lien: lien, nom: nom},
      message: 'Informations manquantes'
    });
  }

db.select('*').from('fichiers').where('lien','=',lien).then(
  x => { console.log(x);
    if (!user.admin && x[0].mail !== user.mail) {
    res.status(400).json({
      status:'e',
      file : {lien: lien, nom: nom},
      message: `Seuls les administrateurs peuvent supprimer des fichiers qu'ils n'ont pas mis en ligne`
    })
  } else {
    db('fichiers').where({ lien: lien, nom: nom }).del()
    .then( user => res.json({
      status:'d',
      file : {lien: lien, nom: nom},
      message: 'Fichier effacé de la base'
    })
  )
    .catch(err => {
      console.log(err);
      res.status(400).json({
      status:'e',
      file : {lien: lien, nom: nom},
      message: `Problème lors de la suppression`
    })
    }
  )
  }
}
)

}

const handleDeleteFolder = (req,res) => {
  const { user, lien, nom } = req.body;
  console.log('delete_folder');
  console.log(user, lien, nom);
  file= lien+'/'+nom;

  fs.unlinkSync(file, (err) => {
                            if (err) console.log(err);
                            console.log(file + ' was deleted');
                          });
  fs.rmdirSync(lien, (err) => {
                            if (err) console.log(err);
                            console.log(lien + ' was deleted');
                          })
  // fs.removeSync(lien);

}

module.exports = {
  handleDeleteFile: handleDeleteFile,
  handleDeleteFolder: handleDeleteFolder
}
