const handleDisplayComments2 = async (req,res,db)=> {
  console.log("displaycomments2");
  // console.log(req.body);
  const { user, link } = req.body;
  console.log(user.mail, link);




let mySet = new Set()
var partages = await db('partages').where('lien_eleve', 'like', `../orientation-files/${link}/%`);
console.log(partages);
var commentaires= await Promise.all(partages.map(async x => db('commentaires').where({file: x.id,type: 'd'}).orderBy('created_at', 'asc')));
console.log(commentaires);
res.json({partages:partages, commentaires:commentaires});




  }

module.exports = {
  handleDisplayComments2: handleDisplayComments2
}
