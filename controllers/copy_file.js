const fs = require('fs');
const path = require('path');

 const handleCopyFile = (req,res, db)=> {
  const { doc, student, auteur } = req.body;
  console.log('copy_file')
  // console.log(doc, student);
  const lien_eleve = doc.split(path.sep).map((value,index)=>{if (index===1) {return student} else {return value}}).join(path.sep)
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

const handleCopyFolder = async (req,res,db,AWS) => {
  const { doc, student } = req.body;
  console.log('copy_folder');
  console.log(doc, student);
  const split=doc.split('/');
  // const lien_racine = split.join(path.sep)+path.sep+student;
  const lien_eleve = split.map((value,index)=>{if (index===1) {return student} else {return value}}).join(path.sep);
  // const nom = split[split.length-1]

  // nom = fs.readdirSync(doc, (err) => {
  //                           if (err) console.log(err);
  //                           console.log(lien_racine + ' was created');
  //                         })


  // fs.mkdirSync(lien_eleve, { recursive: true }, (err) => {
  //                           if (err) console.log(err);
  //                           console.log(lien_eleve + ' was created');
  //                         })

  // fs.copyFile(doc+'/'+nom, lien_eleve+'/'+nom[0], (err) => {
  //         if (err) {res.status(400).json({
  //           status:'e',
  //           file : {doc: doc, student: student},
  //           message: `Problème lors de l'opération`
  //         })};
  //         console.log(nom + ' was copied');}
  //     )


  var s3 = new AWS.S3();

  const listParams = {
        Bucket: 'cloud-cube',
        Prefix: doc
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise()
    .catch(err => console.log(err));

    const source = listedObjects[0];
    const nom = path.basename(source);
    console.log('source:', source, 'nom: ', nom);
  // db.select('*').from('fichiers').where({ lien: doc })
  //     .then(file => file[0].nom)
  //     .then(nom => {

 console.log(doc, nom);
 // const source = path.join(doc,nom);
 console.log(source);

  //configuring parameters
  var params = {
    Bucket: 'cloud-cube',
    Body : fs.createReadStream(source),
    Key : path.join(path.basename(process.env.CLOUDCUBE_URL),student,Date.now()+nom,nom)
  };

  s3.upload(params, function (err, data) {
    //handle error
    if (err) {
      console.log("Error", err);
    }

    //success
    if (data) {
      console.log("Uploaded in:", data.Location);


  res.json({
            status:'c',
            file : {doc: doc, student: student},
            message: 'Répertoire copié'
          })
        }
      // });
    })
    .catch(err => res.json({
      status:'e',
      file : {doc: doc, student: student},
      message: 'Un problème est survenu'
    }))

}

module.exports = {
  handleCopyFile: handleCopyFile,
  handleCopyFolder: handleCopyFolder
}
