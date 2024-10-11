import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';

async function main() {
  dotenv.config(); // pour accéder au variables environnements

  const client = await new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI); // créer un client MongoDB

  const port = process.env.PORT || 8000; // Récupère le port avec une une porte de sortie vers le port 8000 si non définit

  try {
    await client.connect(); // on se connecte à la base de données

    app.listen(port, () => { // lance le serveur sur le port définit
      console.log(`Server is running on port ${port}`);
    })
  } catch (error) {
    console.error(error);
    process.exit(1); // arrête le processus si une erreur survient
  }
}

main().catch(console.error); // gestion des erreurs
