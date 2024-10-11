import MoviesDAO from '../dao/moviesDAO.js';

export default class MoviesController {
  static async apiGetMovies(req, res, next) {
    const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    let filters = {};
    if (req.query.title) {
      filters.title = req.query.title;
    } else if (req.query.rated) {
      filters.rated = req.query.rated;
    }

    const { movies, totalCount } = await MoviesDAO.getMovies({ filters, page, moviesPerPage });

    const response = {
      movies,
      page,
      filters,
      moviesPerPage,
      totalCount,
    }
    res.json(response);
  }
}
