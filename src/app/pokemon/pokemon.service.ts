import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {


  constructor(private http: HttpClient) { }
  
  getPokemonList(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((pokemonList) => console.table(pokemonList),
        catchError((error) => {
          console.log(error)
          return of([]);
      }))
    )
  }

  getPokemonById(pokemonID: number): Observable<Pokemon|undefined>{
    return this.http.get<Pokemon>(`api/pokemons/${pokemonID}`).pipe(
      tap((pokemon) => console.log(pokemon),
        catchError((error) => {
          console.log(error)
          return of(undefined);
        }))
    )
  }

  updatePokemon(pokemon: Pokemon): Observable<null> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  return this.http.put<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
    tap(pokemon => console.log(pokemon)),  // Use arrow function for conciseness
    catchError(error => this.handleError(error, null))  // Type Pokemon for error handling
  );
  }
  


  private handleError(error: Error, errorValue: any) {
    console.log(error);
    return of(errorValue);
  }

  getPokemonTypeList(): string[]{
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ]
  }
}
