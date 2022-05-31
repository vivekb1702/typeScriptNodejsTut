import DB from '@/databases'
import { CreateMovieDto } from '@/dtos/movies.dto';
import { HttpException } from '@/exceptions/HttpException'
import { Movie } from '@interfaces/movies.interface'
import { isEmpty } from '@utils/util'
import { Op } from 'sequelize';
class MovieService {

    public movies = DB.Movies
    public async getMovieList(): Promise<Movie[]> {
        const allMovies: Movie[] = await this.movies.findAll()
        return allMovies
    }

    public async getMovie(id: number): Promise<Movie> {
        if (isEmpty(id)) throw new HttpException(400, "MovieId missing");
        const findMovie: Movie = await this.movies.findByPk(id);
        if (!findMovie) throw new HttpException(409, "Movie not found");

        return findMovie;
    }

    // get all movies with the given rating
    public async getMovieByRating(rating: number): Promise<Movie[]> {
        const findMovies: Movie[] = await this.movies.findAll({
            where:{
                rating:rating
            }
        })
        return findMovies
    }

    // get all movies with given genre
    public async getMoviesByGenre(genre: string): Promise<Movie[]> {
        const findMovies: Movie[] = await this.movies.findAll({
            where:{
                genres:{ [Op.contains]: [genre] }
            }
        })
        return findMovies
    }

    public async createMovie(movie: CreateMovieDto): Promise<Movie> {
        if (isEmpty(movie)) throw new HttpException(400, "Data Missing");
        const findMovie: Movie = await this.movies.findOne({where:{
            title:movie.title
        }})
        if (findMovie) {
            throw new HttpException(409, `Movie ${movie.title} already exists`)
        }
        const createMovie:Movie = await this.movies.create({...movie})
        return createMovie
    }
}

export default MovieService