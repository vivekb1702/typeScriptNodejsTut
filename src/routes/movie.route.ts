import { Router } from 'express';
import MovieController from '@/controllers/movie.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateMovieDto } from '@/dtos/movies.dto';

class MovieRoute implements Routes {
  public path = '/movies';
  public router = Router();
  public movieController = new MovieController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.movieController.getMovieList);
    this.router.get(`${this.path}/:id(\\d+)`, this.movieController.getMovieById);
    this.router.get(`${this.path}/rating/:id(\\d+)`, this.movieController.getMovieByRating);
    this.router.get(`${this.path}/genre/:id(\\d+)`, this.movieController.getMovieByGenre);
    this.router.post(`${this.path}`,validationMiddleware(CreateMovieDto,'body'),this.movieController.createMovie)
  }
}

export default MovieRoute;
