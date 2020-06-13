
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('login', function(t) {
    t.increments('id').primary();
    t.string('user').notNullable()
    t.string('hash',100).notNullable()

  })
  .createTableIfNotExists('utilisateurs', function(t) {
    console.log("entrée dans la fonction");
    t.increments('id').primary();

    t.string('prénom',100)
    t.string('nom',100)
    t.string('classe',20)
    t.string('mail').notNullable()
    t.string('initpw',100).notNullable()
    t.boolean('admin').notNullable().defaultTo(false);
    t.json('resp').defaultTo('{}');
    t.json('autoeval').defaultTo({connaissance:{
          value : 0,
          text : '',
          color : 'rgb(0,0,0)'
        },
      formations:{
          value : 0,
          text : '',
          color : 'rgb(0,0,0)'
        },
      techniques:{
          value : 0,
          text : '',
          color : 'rgb(0,0,0)'
        }});




    t.integer('login_id') // Add a foreign key...
      .notNullable()
      .references('id') // which references Article's primary key...
      .inTable('login') // which references Article's primary key...
      .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
      .onDelete('CASCADE') // if referenced Article is deleted, delete this Comment.



  })
  .createTableIfNotExists('request_pw', function(t) {
    console.log("entrée dans la fonction");
    t.increments('id_request').primary();
    t.string('user').unique().notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());

    t.integer('login_id') // Add a foreign key...
    .notNullable()
    .references('id') // which references Article's primary key...
    .inTable('login') // which references Article's primary key...
    .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
    .onDelete('CASCADE') // if referenced Article is deleted, delete this Comment.

})
  .createTableIfNotExists('fichiers', function(t) {
    console.log("entrée dans la fonction");
    t.increments('id_file').primary();
    t.string('auteur').notNullable();
    t.string('mail').notNullable();
    t.string('lien',200).unique().notNullable();
    t.string('nom',100).notNullable();
    t.string('description',500);
    t.decimal('average',4,2).defaultTo(0);
    t.json('notes').defaultTo('{}');
    t.timestamp('created_at').defaultTo(knex.fn.now());

})
  .createTableIfNotExists('commentaires', function(t) {
    console.log("entrée dans la fonction");
    t.increments('id_comment').primary();
    t.string('prénom',100);
    t.string('nom',100);
    t.string('mail',100);
    t.string('classe',20);
    t.string('contenu',5000);
    t.string('type',5);
    t.integer('file');
    t.integer('user_id').notNullable().references('id').inTable('utilisateurs').onUpdate('CASCADE').onDelete('CASCADE');
    t.timestamp('created_at').defaultTo(knex.fn.now());

})
  .createTableIfNotExists('partages', function(t) {
    console.log("entrée dans la fonction");
    t.increments('id').primary();
    // t.integer('fichier').references('id_file').inTable('fichiers');
    t.integer('utilisateur').references('id').inTable('utilisateurs').onUpdate('CASCADE').onDelete('CASCADE');
    t.string('lien',200);
    t.string('lien_eleve',200);
    t.string('nom',100);
    t.string('auteur_partage',201)
    t.timestamp('created_at').defaultTo(knex.fn.now());

})
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('partages')
  .dropTable('commentaires')
  .dropTable('fichiers')
  .dropTable('request_pw')
  .dropTable('utilisateurs')
  .dropTable('login');
};
