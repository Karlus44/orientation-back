const fs = require('fs');
const path = require('path');

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

const handleDeleteFolder = (req,res,AWS) => {
  const { user, lien, nom } = req.body;
  console.log('delete_folder');
  console.log(user, lien, nom);
  // file= lien+'/'+nom;

  // fs.unlinkSync(file, (err) => {
  //                           if (err) console.log(err);
  //                           console.log(file + ' was deleted');
  //                         });
  // fs.rmdirSync(lien, (err) => {
  //                           if (err) console.log(err);
  //                           console.log(lien + ' was deleted');
  //                         })
  var s3 = new AWS.S3();
  var params = {
        Bucket : 'cloud-cube',
        Key : path.join(path.basename(process.env.CLOUDCUBE_URL),lien,nom)
};
  s3.deleteObject(params,function(err,data){
          if (err)    console.log(err);
          else        console.log(file + ' was deleted');
      })

}

module.exports = {
  handleDeleteFile: handleDeleteFile,
  handleDeleteFolder: handleDeleteFolder
}
