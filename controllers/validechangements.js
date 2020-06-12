 const handleValideChangements = (req,res, db)=> {
  const { mail, previousAutoeval, autoeval } = req.body;
  console.log('validechangements')
  // console.log(mail, previousAutoeval, autoeval);
  autoeval.connaissance.value=parseInt(autoeval.connaissance.value);
  autoeval.formations.value=parseInt(autoeval.formations.value);
  autoeval.techniques.value=parseInt(autoeval.techniques.value);
  // console.log(autoeval);


  if (!mail) {
    return res.status(400).json({
      status:'e',
      user: null,
      message: 'Informations manquantes'
    });
  }


db('utilisateurs').where({ mail: mail }).update({ autoeval: autoeval }).returning('*')
            .then(user => user[0])
            .then(user => JSON.stringify(user))
            .then( user => {
              console.log(user);
              res.json({
              status:'u',
              user : user,
              message: 'Information mise à jour'
            })
            }
          )
            .catch(err => {
              console.log(err);
              res.status(400).json({
              status:'e',
              user: {mail: mail},
              message: `Problème lors de la modification`
            })
            }
          )



}

const handleSendNotifs = (req,res, db)=> {
 const { mail, previousAutoeval, autoeval } = req.body;
 console.log('sendnotifs')
 console.log(mail, previousAutoeval, autoeval);
 autoeval.connaissance.value=parseInt(autoeval.connaissance.value);
 autoeval.formations.value=parseInt(autoeval.formations.value);
 autoeval.techniques.value=parseInt(autoeval.techniques.value);
 previousAutoeval.connaissance.value=parseInt(previousAutoeval.connaissance.value);
 previousAutoeval.formations.value=parseInt(previousAutoeval.formations.value);
 previousAutoeval.techniques.value=parseInt(previousAutoeval.techniques.value);
 console.log(previousAutoeval);
 console.log(autoeval);


 if (!mail) {
   return res.status(400).json({
     status:'e',
     mail: null,
     message: 'Informations manquantes'
   });
 }

 const ecarts=[
   autoeval.connaissance.value-previousAutoeval.connaissance.value,
   autoeval.formations.value-previousAutoeval.formations.value,
   autoeval.techniques.value-previousAutoeval.techniques.value
 ];

 var response='';

 if (ecarts[0]+ecarts[1]+ecarts[2]>45) {
   response='fait des progrès.'
 }
 if (ecarts[0]+ecarts[1]+ecarts[2]>90) {
   response='se sent très en confiance.'
 }
 if (ecarts[0]+ecarts[1]+ecarts[2]<-30) {
   response='est préoccupé(e).'
 }
 if (ecarts[0]+ecarts[1]+ecarts[2]<-60) {
   response='se sent perdu(e).'
 }
 if (Math.max(...ecarts)>20 && Math.min(...ecarts)<-20) {
   response='se pose des questions.'
 }

if (response==='') {
  res.json({
    status:'u',
    user : {mail: mail},
    message: 'Information mise à jour'
  })
} else {

 db.select('*').from('utilisateurs').where({ mail: mail })
     .then(user=> user[0])
     .then(x => {db.insert({
                    prénom: x.prénom,
                    nom: x.nom,
                    classe: x.classe,
                    mail: mail,
                    contenu: x.prénom + ' ' + x.nom + ' '+response,
                    type: 'f',
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
                      }

   }




module.exports = {
  handleValideChangements: handleValideChangements,
  handleSendNotifs: handleSendNotifs
}
