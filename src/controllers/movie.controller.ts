import { NextFunction, Request, Response } from 'express';
import { Movie } from '@/interfaces/movies.interface';
import movieService from '@/services/movies.service';
import { CreateMovieDto } from '@/dtos/movies.dto';


class MovieController {
  public movieService = new movieService();

  public getMovieList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllMoviesData: Movie[] = await this.movieService.getMovieList()

      res.status(200).json({ data: findAllMoviesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMovieById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movieId = Number(req.params.id);
      const findMovieData: Movie = await this.movieService.getMovie(movieId);

      res.status(200).json({ data: findMovieData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getMovieByRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movieRating = Number(req.params.rating);
      const findMovieData: Movie[] = await this.movieService.getMovieByRating(movieRating)

      res.status(201).json({ data: findMovieData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMovieByGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movieGenre = String(req.params.genre);
      const findMovieData: Movie[] = await this.movieService.getMoviesByGenre(movieGenre)

      res.status(201).json({ data: findMovieData, message: 'findAll' });

    } catch (error) {
      next(error);
    }
  };

  public createMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const movieData: CreateMovieDto = {...req.body};
      const createMovieData: Movie = await this.movieService.createMovie(movieData);

      res.status(201).json({ data: createMovieData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

}



export default MovieController;
