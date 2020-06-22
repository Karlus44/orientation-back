const fs = require('fs');
const path = require('path');
const multiparty = require("multiparty");


const handleUpload = (req,res,db, AWS)=> {
  console.log('upload');
  // const { body } = req.body.title;

 var title='';
 var mail='';
 var auteur='';
 var lien='';
 var description='';
 var file={};


 let form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
      console.log(err);
      mail=fields.mail[0];
      auteur=fields.author[0];
      description=fields.desc[0];
      file=files.file[0];
      title=fields.title[0] || file.originalFilename;
      lien=path.join('APP',Date.now()+title);
      // lienfichier=path.join(lien,title);
      // fs.mkdirSync(lien, { recursive: true }, err => console.log(err));

console.log(title, mail, auteur, lien, description, file);

  var s3 = new AWS.S3();
  // var filePath = "./data/file.txt";

  //configuring parameters
  var params = {
    Bucket: 'cloud-cube',
    Body : fs.createReadStream(file.path),
    Key : path.join(path.basename(process.env.CLOUDCUBE_URL),'public','APP',Date.now()+title,title)
  };

  s3.upload(params, function (err, data) {
    //handle error
    if (err) {
      console.log("Error", err);
    }

    //success
    if (data) {
      console.log("Uploaded in:", data.Location);


      db.insert({
                 nom: title,
                 mail: mail,
                 auteur: auteur,
                 lien: lien,
                 description: description,
              })
                  .into('fichiers')
                  .returning('*')
                  // .then(data=> {
                  //   console.log(data)
                  // })
                  // .then(x => res.status(200).send(req.file,))

                  .then(x => res.status(200).json({
                    status:'u',
                    message: `Le fichier a été ajouté à la base`
                  }))
                  .catch(err => res.status(400).json({
                    status:'e',
                    message: `Un problème est survenu. Le fichier n'a pu être enregistré dans la base`
                  }))

                }
              });


     // return res.status(200).send(req.file,)

   });
}

module.exports = {
  handleUpload: handleUpload
}
