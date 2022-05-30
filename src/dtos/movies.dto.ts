import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  public title: string;

  @IsArray()
  public genres: string[];

  @IsNumber()
  public rating: number
  
  @IsString()
  public releaseDate: string;

}
