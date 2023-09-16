import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist.model';
import { ArtistService } from './artist.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistResolver implements Resolve<Artist> {

  constructor(private artistService: ArtistService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Artist> {
    const artistId = route.params['artistId']
    return this.artistService.getById(artistId)
  }
}
