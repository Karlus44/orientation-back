
exports.seed = function(knex) {
  // Deletes ALL existing entries

  return knex('userstodelete').del()
    .then(function () {

      // Inserts seed entries
      return knex('userstodelete').insert([
        {delete_id: 1, utilisateur_id: 'harry.potter@hogwarts.com', user_id: 'harry.potter@hogwarts.com'},
        {delete_id: 2, utilisateur_id: 'severus.snape@hogwarts.com', user_id: 'severus.snape@hogwarts.com'}

      ]);
    }
  );
};
