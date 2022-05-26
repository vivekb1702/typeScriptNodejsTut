import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  public title: string;

  @IsArray()
  public genres: string[];

  @IsString()
  public releaseDate: string;

  @IsNumber()
  public rating: number

  @IsNumber()
  public id: number
}
