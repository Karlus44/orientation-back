 const handleTestEmpty = (req,res, db)=> {
  // const { admin,prenom, nom, classe, mail, initPW } = req.body;
  console.log('testempty')
  // console.log(prenom, nom, classe, mail, initPW);


    db.select('*').from('login').then(user=> user[0])
  .then(x => {if  (x) {
    console.log(`La base n'est pas vide`);
    res.json(false);
  } else {
    console.log('La base est vide')
    res.json(true);
  }
})


}

module.exports = {
  handleTestEmpty: handleTestEmpty
}
