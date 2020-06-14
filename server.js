const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const multer = require('multer');

const firstuser = require('./controllers/firstuser');
const register = require('./controllers/register');
const testempty = require('./controllers/testempty');
const delete_user = require('./controllers/delete_user');
const delete_file = require('./controllers/delete_file');
const copy_file = require('./controllers/copy_file');
const signin = require('./controllers/signin');
const display = require('./controllers/display');
const displayfiles = require('./controllers/displayfiles');
const displayfileseleve = require('./controllers/displayfileseleve');
const displaynotifications = require('./controllers/displaynotifications');
const displaycomments = require('./controllers/displaycomments');
const displaycomments2 = require('./controllers/displaycomments2');
const requests = require('./controllers/requests');
const messageclasse = require('./controllers/messageclasse');
const displayresp = require('./controllers/displayresp');
const updateclass = require('./controllers/updateclass');
const updateuser = require('./controllers/updateuser');
const updatefile = require('./controllers/updatefile');
const updateadminuser = require('./controllers/updateadminuser');
const changepassword = require('./controllers/changepassword');
const requestpassword = require('./controllers/requestpassword');
const cancelrequest = require('./controllers/cancelrequest');
const resetpassword = require('./controllers/resetpassword');
const post = require('./controllers/post');
const checkprofs = require('./controllers/checkprofs');
const validechangements = require('./controllers/validechangements');
const upload = require('./controllers/upload');
// const openfile = require('./controllers/openfile');
const notefile = require('./controllers/notefile');
const addcomment = require('./controllers/addcomment');
const updatecomment = require('./controllers/updatecomment');
const deletecomment = require('./controllers/deletecomment');
const synthesefiles = require('./controllers/synthesefiles');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
    // host : '127.0.0.1',
    // user : 'karlus',
    // password : 'pass',
    // database : 'orientation-data'
  }
});

const nodemailer = require('nodemailer');
const creds = require('./config');

var transport = {
  host: 'smtp.mail.fr', // e.g. smtp.gmail.com
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}



var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`L'envoi de messages fonctionne`);
  }
});



const app = express();

// db.select('*').from('utilisateurs').then(data => {
//   console.log('utilisateurs');
//   console.log(data);
// });

app.use(express.urlencoded({extended: false}));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: 'https://orientation-front.herokuapp.com',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
  optionsSuccessStatus: 200
}


// app.use(cors());
app.options('*', cors(corsOptions));


// app.get('/',(req,res)=>{
//   res.send('this is working');
// })

// app.get('/',(req,res)=>{
//   return db.select('*').from('utilisateurs')
//   .then(data => res.json(data))
//   .catch(err => 'impossible de lire la database');
// })
app.get('/',cors(corsOptions), (req,res)=>{
  return db('utilisateurs').count('id')
  .then(data => res.json(data));
})
// app.get('/',(req,res)=>{
//   return db.select('*').from('commentaires')
//   .then(data => res.json(data));
// })
// app.get('/',(req,res)=>{
//   return db.select('*').from('partages')
//   .then(data => res.json(data));
// })
// app.get('/',(req,res)=>{
//   return db.select('*').from('utilisateurs')
//   .then(data => res.json(data))
//   .catch(err => 'impossible de lire la database');
// })


// app.get('/', (req,res)=>{
//   // res.send('it is working !')
//   return db.select('*').from('utilisateurs')
//   .then(data => res.json(data));
// })

app.post('/signin', cors(corsOptions), (req,res) => {signin.handleSignin(req,res, db, bcrypt)})
app.post('/', cors(corsOptions), (req,res) => {display.handleDisplay(req,res, db)})
app.post('/requests', cors(corsOptions), (req,res) => {requests.handleRequests(req,res, db)})
app.post('/messageclasse', cors(corsOptions), (req,res) => {messageclasse.handleMessageClasse(req,res, db)})
app.post('/resp', cors(corsOptions), (req,res) => {displayresp.handleDisplayResp(req,res, db)})
app.post('/displaynotifications', cors(corsOptions), (req,res) => {displaynotifications.handleDisplayNotifications(req,res, db)})
app.post('/firstuser', cors(corsOptions), (req,res) => {firstuser.handleFirstUser(req,res, db, bcrypt)})
app.post('/register', cors(corsOptions), (req,res) => {register.handleRegister(req,res, db, bcrypt)})
app.get('/testempty', cors(corsOptions), (req,res) => {testempty.handleTestEmpty(req,res, db)})
app.post('/delete_user', cors(corsOptions), (req,res) => {delete_user.handleDeleteUser(req,res, db)})
app.post('/delete_file', cors(corsOptions), (req,res) => {delete_file.handleDeleteFile(req,res, db)})
app.post('/delete_folder', cors(corsOptions), (req,res) => {delete_file.handleDeleteFolder(req,res)})
app.post('/copy_file', cors(corsOptions), (req,res) => {copy_file.handleCopyFile(req,res, db)})
app.post('/copy_folder', cors(corsOptions), (req,res) => {copy_file.handleCopyFolder(req,res)})
app.post('/updateclass', cors(corsOptions), (req,res) => {updateclass.handleUpdateClass(req,res, db)})
app.post('/updateuser', cors(corsOptions), (req,res) => {updateuser.handleUpdateUser(req,res, db)})
app.post('/updatefile', cors(corsOptions), (req,res) => {updatefile.handleUpdateFile(req,res, db)})
app.post('/updateadminuser', cors(corsOptions), (req,res) => {updateadminuser.handleUpdateAdminUser(req,res, db)})
app.post('/changepassword', cors(corsOptions), (req,res) => {changepassword.handleChangePassword(req,res, db, bcrypt)})
app.post('/requestpassword', cors(corsOptions), (req,res) => {requestpassword.handleRequestPassword(req,res, db, bcrypt)})
app.post('/cancelrequest', cors(corsOptions), (req,res) => {cancelrequest.handleCancelRequest(req,res, db)})
app.post('/resetpassword', cors(corsOptions), (req,res) => {resetpassword.handleResetPassword(req,res, db, bcrypt)})
app.post('/send', cors(corsOptions), (req,res) => {post.handlePost(req,res,transporter)})
app.post('/checkprofs', cors(corsOptions), (req,res) => {checkprofs.handleCheckProfs(req,res, db)})
app.post('/upload', cors(corsOptions), (req,res) => {upload.handleUpload(req,res, db, multer)})
app.post('/displayfiles', cors(corsOptions), (req,res) => {displayfiles.handleDisplayFiles(req,res, db)})
app.post('/displayfileseleve', cors(corsOptions), (req,res) => {displayfileseleve.handleDisplayFilesEleve(req,res, db)})
app.post('/displaycomments', cors(corsOptions), (req,res) => {displaycomments.handleDisplayComments(req,res, db)})
app.post('/displaycomments2', cors(corsOptions), (req,res) => {displaycomments2.handleDisplayComments2(req,res, db)})
app.post('/validechangements', cors(corsOptions), (req,res) => {
                                              validechangements.handleSendNotifs(req,res,db);
                                              validechangements.handleValideChangements(req,res, db);
                                            })
// app.post('/openfile', (req, res) => {openfile.handleOpenFile(req,res)})
app.post('/notefile', cors(corsOptions), (req,res) => {notefile.handleNoteFile(req,res,db)})
app.post('/addcomment', cors(corsOptions), (req,res) => {addcomment.handleAddComment(req,res, db)})
app.post('/updatecomment', cors(corsOptions), (req,res) => {updatecomment.handleUpdateComment(req,res, db)})
app.post('/deletecomment', cors(corsOptions), (req,res) => {deletecomment.handleDeleteComment(req,res, db)})
app.post('/synthesefiles', cors(corsOptions), (req,res) => {synthesefiles.handleSyntheseFiles(req,res, db)})
// app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res, db)})

// app.listen(3000)
app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT || 3000}`);
})

console.log("hello")
// console.log(process.env.PORT)
