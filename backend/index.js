import mongodb from 'mongodb';
import dotenv from 'dotenv';
import app from './server.js';
import MoviesDAO from './dao/moviesDAO.js';
async function main() {
  dotenv.config(); // pour accéder au variables environnements

  const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI); // créer un client MongoDB

  const port = process.env.PORT || 8000; // Récupère le port avec une une porte de sortie vers le port 8000 si non définit

  try {
    //const t = await client.connect(); // on se connecte à la base de données
    // const t = await client.db("admin").command({ ping: 1 });
    //console.log(t, 't')
    await MoviesDAO.injectDB(client); // injecte la connexion MongoDB dans la DAO MoviesDAO
    // nous avons ainsi notre référence movies dans notre application on va pouvoir l'utiliser dans  notre controller

    app.listen(port, () => { // lance le serveur sur le port définit
      console.log(`Server is running on port ${port}`);
    })
  } catch (error) {
    console.error(error);
    process.exit(1); // arrête le processus si une erreur survient
  }
}

main().catch(console.error); // gestion des erreurs
