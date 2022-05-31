import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '../app';
import { CreateMovieDto } from '../dtos/movies.dto';
import MovieRoute from '../routes/movie.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Movies', () => {
  describe('[GET] /movies', () => {
    it('response findAll movies', async () => {
      const movieRoute = new MovieRoute();
      const movies = movieRoute.movieController.movieService.movies;

      movies.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          title: 'POC',
          genres: ['Adventure'],
          rating: 7,
          releaseDate: '2017-02-24',
        },
        {
          id: 2,
          title: 'Avatar',
          genres: ['Fantasy', 'Adventure'],
          rating: 7,
          releaseDate: '2017-02-24',
        },
        {
          id: 3,
          title: 'Rush Hour',
          genres: ['Comedy'],
          rating: 7,
          releaseDate: '2017-02-24',
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([movieRoute]);
      return request(app.getServer()).get(`${movieRoute.path}`).expect(200);
    });
  });

  describe('[GET] /movies/:id', () => {
    it('response findOne movie', async () => {
      const movieId = 1;

      const movieRoute = new MovieRoute();
      const movies = movieRoute.movieController.movieService.movies;

      movies.findByPk = jest.fn().mockReturnValue({
        id: 1,
        title: 'POC',
        genres: ['Adventure'],
        rating: 7,
        releaseDate: '2017-02-24',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([movieRoute]);
      return request(app.getServer()).get(`${movieRoute.path}/${movieId}`).expect(200);
    });
  });

  describe('[GET] /movies/:id', () => {
    it('response findOne movie not found', async () => {
      const movieId = 1;

      const movieRoute = new MovieRoute();
      const movies = movieRoute.movieController.movieService.movies;

      movies.findByPk = jest.fn().mockReturnValue(null);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([movieRoute]);
      return request(app.getServer()).get(`${movieRoute.path}/${movieId}`).expect(409);
    });
  });

  describe('[POST] /movies', () => {
    it('response Create movie', async () => {
      const movieData: CreateMovieDto = {
        title: 'POC2',
        genres: ['Adventure'],
        rating: 8,
        releaseDate: '2017-02-28',
      };

      const movieRoute = new MovieRoute();
      const movies = movieRoute.movieController.movieService.movies;

      movies.findOne = jest.fn().mockReturnValue(null);
      movies.create = jest.fn().mockReturnValue({
        id: 3,
        title: 'POC2',
        genres: ['Adventure'],
        rating: 8,
        releaseDate: '2017-02-28',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([movieRoute]);
      return request(app.getServer()).post(`${movieRoute.path}`).send(movieData).expect(201);
    });
  });

  describe('[POST] /movies', () => {
    it('response Create movie already exists', async () => {
      const movieData: CreateMovieDto = {
        title: 'POC',
        genres: ['Adventure'],
        rating: 8,
        releaseDate: '2017-02-28',
      };

      const movieRoute = new MovieRoute();
      const movies = movieRoute.movieController.movieService.movies;

      movies.findOne = jest.fn().mockReturnValue({
        id: 1,
        title: 'POC',
        genres: ['Adventure'],
        rating: 8,
        releaseDate: '2017-02-28',
      });
      (Sequelize as any).authenticate = jest.fn();
      const app = new App([movieRoute]);
      return request(app.getServer()).post(`${movieRoute.path}`).expect(400);
    });
  });
  
});
