const handlePost = (req,res,transporter)=> {
  // const name = req.body.name
    const email = req.body.email
    const message = req.body.messageHtml
    console.log('sendmail');
    console.log(email);
    console.log(message);


    var mail = {
      from: 'charles.havez@mail.fr',
      to: email,
      subject: 'Rénitialisation du mot de passe',

      html: message
    }

    transporter.sendMail(mail, (err) => {
      if (err) {
        console.log(err);
        res.json({
          status:'e',
          user : {mail: email},
          message: 'Un problème est survenu'
        })
      } else {
        res.json({
          status:'u',
          user : {mail: email},
          message: `Un email a été envoyé à l'utilisateur`
        })
      }
    })
  }

module.exports = {
  handlePost: handlePost
}
