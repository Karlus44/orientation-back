const fs = require('fs');

const handleUpload = (req,res,db,multer)=> {
  console.log('upload');
  // const { body } = req.body.title;
  console.log(req.headers);



  var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          // path='../orientation-files/APP/'+Date.now()+req.body.title;
          const path=path.join(process.env.CLOUDCUBE_URL,'APP',Date.now()+req.body.title);
          fs.mkdirSync(path, { recursive: true });

          return cb(null,path)
      },
      filename: function (req, file, cb) {
        // console.log(req.title);
        cb(null, req.body.title )
      }
  });

  var upload = multer({ storage: storage }).single('file');

  // var upload = multer({ dest: '~/Documents/Projet Orientation/orientation-files/' })

  upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
              return res.status(500).json(err)
          } else if (err) {
              return res.status(500).json(err)
          }
     // console.log(req.body);
     console.log({
                    auteur: req.body.author,
                    mail: req.body.mail,
                    lien: req.file.destination,
                    nom: req.file.filename,
                    description: req.body.desc,
                  });
     db.insert({
                    auteur: req.body.author,
                    mail: req.body.mail,
                    lien: req.file.destination,
                    nom: req.file.filename,
                    description: req.body.desc,
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



     // return res.status(200).send(req.file,)

   });
}

module.exports = {
  handleUpload: handleUpload
}
