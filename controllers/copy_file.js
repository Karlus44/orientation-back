const fs = require('fs');

 const handleCopyFile = (req,res, db)=> {
  const { doc, student, auteur } = req.body;
  console.log('copy_file')
  // console.log(doc, student);
  const lien_eleve = doc.split('/').map((value,index)=>{if (index===2) {return student} else {return value}}).join('/')
  // console.log(doc, lien_eleve);

  if (!doc || !student) {
    return res.status(400).json({
      status:'e',
      file:null,
      message: 'Informations manquantes'
    });
  }

db.select('*').from('utilisateurs').where('mail','=',student).returning('*').then(id => id[0].id).then(utilisateur => {
  db.select('*').from('fichiers').where('lien','=',doc).returning('*').then(id => id[0]).then(fichier => {
        console.log(utilisateur, doc, lien_eleve,fichier.nom);
        db.insert({
          // fichier : fichier.id_file,
          utilisateur : utilisateur,
          lien : doc,
          lien_eleve : lien_eleve,
          nom : fichier.nom,
          auteur_partage: auteur
        })
        .into('partages')
        .returning('*')
        .catch(err => console.log(err));
  });
})
    .then()
    .then( answer => res.json({
          status:'c',
          file : {doc: doc, student: student},
          message: 'Fichier copié'
        }))
        .catch(err => res.status(400).json({
          status:'e',
          file : {doc: doc, student: student},
          message: `Problème lors de l'opération`
        }))

  }

const handleCopyFolder = (req,res) => {
  const { doc, student } = req.body;
  console.log('copy_folder');
  console.log(doc, student);
  const split=doc.split('/');
  const lien_racine = split.filter((x,ind)=> ind<2).join('/')+'/'+student;
  const lien_eleve = split.map((value,index)=>{if (index===2) {return student} else {return value}}).join('/');
  // const nom = split[split.length-1]

  nom = fs.readdirSync(doc, (err) => {
                            if (err) console.log(err);
                            console.log(lien_racine + ' was created');
                          })
  // console.log(nom)
  // fs.mkdirSync(lien_racine, (err) => {
  //                           if (err) console.log(err);
  //                           console.log(lien_racine + ' was created');
  //                         })

  fs.mkdirSync(lien_eleve, { recursive: true }, (err) => {
                            if (err) console.log(err);
                            console.log(lien_eleve + ' was created');
                          })

  fs.copyFile(doc+'/'+nom, lien_eleve+'/'+nom[0], (err) => {
          if (err) {res.status(400).json({
            status:'e',
            file : {doc: doc, student: student},
            message: `Problème lors de l'opération`
          })};
          console.log(nom + ' was copied');}
      )


  res.json({
            status:'c',
            file : {doc: doc, student: student},
            message: 'Répertoire copié'
          })

}

module.exports = {
  handleCopyFile: handleCopyFile,
  handleCopyFolder: handleCopyFolder
}
