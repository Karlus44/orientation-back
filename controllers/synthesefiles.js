const handleSyntheseFiles = (req,res,db)=> {
  console.log("synthesefiles");
  const { list } = req.body;
  // console.log(list);

  var list2 = Object.keys(list).filter(z=>list[z]).map(z=> 'public/'+z+'/');
  // console.log(list2);
  var obj={};

    db('partages').select('*')
    .then(liste => liste.filter(x=> {
      // console.log(x);
      var bool=false;
      list2.filter(y => {
        if (x.lien_eleve.includes(y)) {bool = true}
      })
      return bool;
    }))
    .then(x => x.forEach((item) => {
      var name = item.nom;
      // console.log(obj, name, obj[`${name}`]);
      if (obj[`${name}`]===undefined) {obj[`${name}`]=1} else {obj[`${name}`]=obj[`${name}`]+1}
    })
    )
    // .then(x=>console.log(obj))
    .then(x => {
      var array=Object.entries(obj).sort((a,b)=>b[1]-a[1]);
      console.log(array);
      res.json({response:array});
    })
    .catch(err => res.status(400).json(err))



  }

module.exports = {
  handleSyntheseFiles: handleSyntheseFiles
}
