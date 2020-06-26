Orientation pour le lycée
=========================

Ce projet permet à un établissement scolaire de gérer les comptes des professeurs et des élèves afin d'assurer un meilleur suivi de l'aide à l'orientation.

Il est possible d'essayer ce projet ici: https://orientation-front.herokuapp.com/

Voici un compte professeur: yoda@gmail.com , mot de passe: yoda

Voici un compte élève: luke.skywalker.com , mot de passe: luke

Un compte administrateur provisoire peut vous être envoyé sur demande de votre part ici: charles.havez@gmail.com

Résumé du projet
----------------

Un administrateur peut ajouter de nouveaux comptes à partir d'un fichier ou manuellement, les supprimer et les mettre à jour.

Il peut attribuer aux professeurs des classes (ce qui permet de définir qui est professeur principal de telle ou telle classe).

Un professeur peut charger des fichiers, ce qui permet aux autres professeurs de consulter ces fichiers, de les commenter et de les noter afin que l'équipe pédagogique puisse facilement bénéficier des retours des collègues afin d'en faire au mieux profiter ses élèves.

Un professeur principal d'une classe peut envoyer à ses élèves les fichiers de son choix aux élèves de son choix.

Les élèves peuvent à leur tour consulter les fichiers qui leurs sont envoyés, les commenter, et par ce biais échanger avec leur professeur principal.

Les élèves peuvent également, dans leur profil, compléter des indicateurs pour permettre à leur professeur principal de mieux cerner leurs besoin et de savoir quel est le prochain fichiers qu'ils devraient leur transmettre.

L'interface facilite l'aide à l'orientation des élèves par leurs professeurs car il leur est désormais plus facile de savoir quels documents leur ont déjà été distribués les années précédentes et quels sont leurs besoins en temps réel

Fiche technique
---------------

Ce dépôt constitue la partie back office du projet. La partie front office se trouve ici: https://github.com/Karlus44/orientation-front
 * Le projet a été réalisé avec javascript React pour le front office, avec Node.js pour le back office.
 * Utilisation de bases de données afin de stocker les informations nécessaires sur les utilisateurs et les fichiers
 * Utilisation d'une fonction de hashage afin que les mots de passe ne soient pas enregistrés dans les bases (seuls les mots de passe initiaux le sont)
 * Envoi d'un e-mail déclenché par un administrateur lorsqu'un utilisateur fait la requête de réinitialiser son mot de passe.
 * Gestion des comptes des utilisateurs et des fichiers par le biais de tableaux interactifs.
 * Dans cette version de test les fichiers sont stockés dans le cloud grâce à l'application Cloudcube de Heroku fournie par AWS
 * Utilisation d'une jauge (react-svg-jauge) pour permettre aux élèves de remplir leur profil de façon ludique et visuellement agréable.
 * Possibilité pour les professeurs de noter les fichiers (avec react-rater) ce qui permet d'afficher pour chaque fichier la note moyenne.

RGPD
----

Le site n'utilise pas de cookies.

Les données qui sont enregistrées dans les bases de données ne contiennent pas d'élément personnel. Le prénom, le nom, l'adresse électronique de l'établissement et les éventuels commentaires qu'ils écrivent dans leurs profil ou à propos d'un fichier. Les commentaires des élèves ne peuvent être consultés que par les professeurs principaux de ces élèves et les administrateurs. Les données récoltées n'ont pas vocation à être utilisées en dehors de ce champ et sont automatiquement supprimées de la base lorsque l'utilisateur est supprimé c'est-à-dire lorsqu'il quitte l'établissement.
