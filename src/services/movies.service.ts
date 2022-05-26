import { HttpException } from '@/exceptions/HttpException'
import { Movie } from '@interfaces/movies.interface'
import { isEmpty } from '@utils/util'
class MovieService {

    // dummy movie data
    public movies: Movie[] = [
        {
            "id": 0,
            "title": "Avatar",
            "genres": [
                "Fantasy",
                "Adventure"
            ],
            "rating": 7,
            "releaseDate": "2017-02-24",
        },
        {
            "id": 1,
            "title": "POC",
            "genres": [
                "Adventure",
            ],
            "rating": 7,
            "releaseDate": "2017-02-24",
        },
        {
            "id": 2,
            "title": "Rush Hour",
            "genres": [
                "Comedy",
            ],
            "rating": 7,
            "releaseDate": "2017-02-24",
        }
    ]

    public async getMovieList(): Promise<Movie[]> {
        return this.movies
    }

    public async getMovie(id: number): Promise<Movie> {
        const movie = this.movies.find((item) => { return item.id = id })
        return movie
    }

    // get all movies with the given rating
    public async getMovieByRating(rating: number): Promise<Movie[]> {
        const movies = this.movies.filter((item) => {
            return item.rating === rating
        })
        return movies
    }

    // get all movies with given genre
    public async getMoviesByGenre(genre: string): Promise<Movie[]> {
        const movies = this.movies.filter((item) => {
            return item.genres.includes(genre)
        })
        return movies
    }

    public async createMovie(movie: Movie): Promise<Movie> {
        if (isEmpty(movie)) throw new HttpException(400, "Data Missing");
        const findMovie: Movie = this.movies.find((item) => {
            return item.title = movie.title
        })
        if (findMovie) {
            throw new HttpException(409, `Movie ${movie.title} already exists`)
        }
        this.movies.push(movie)
        return movie
    }
}

export default MovieService