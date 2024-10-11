//import dotenv from 'dotenv';

//dotenv.config();
let movies; // Instance de la collection movies démarre en même temps que le serveur

export default class MoviesDAO {
  static async injectDB(connection) {
    if (movies) {
      return;
    }
    try {
      movies = await connection.db(process.env.MOVIEREVIEWS_NS).collection('movies');
    } catch (error) {
      console.error(error);
    }
  }

  static async getMovies({ // filtre par défaut, tous les films, page 0, 20 films par page) {}
    filters = null,
    page = 0,
    moviesPerPage = 20,
                         } = {}) {
    let query = {};
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: ['title'] } }; // serach permet d'ajouter plusier termes pour une recherche globale "kill soldier"
      } else if ("rated" in filters) {
        query = {"rated": { $eq: filters['rated'] }}; // recherche par note $eq recherche exacte
      }
    }

    let cursor;
    try {
      cursor = await movies.find(query).skip(page * moviesPerPage).limit(moviesPerPage); // décalage de page * nombre de films par page (pour la pagination)
      // le cursor est essentiels pour limiter la pression sur la mémoire et la bande passante en cas de réponse de grande quantité
      const movies = await cursor.toArray(); // récupère tous les films dans un tableau
      const totalCount = await movies.countDocuments(query); // compte le nombre total de films qui correspondent aux critères de recherche
      return { movies, totalCount };
    } catch (error) {
      console.error(error);
      return { movies: [], totalCount: 0 }; // renvoie une liste vide et un nombre total de 0 si une erreur survient
    }
  }
}
