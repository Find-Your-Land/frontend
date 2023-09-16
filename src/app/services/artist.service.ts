import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Review, Artist, ArtistFilter } from '../models/artist.model';
import { HttpService } from './http.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(
    private httpService: HttpService
  ) { }

  ARTIST_KEY: string = 'stayDB';
  ARTIST_URL: string = 'artist/'

  private _artists$ = new BehaviorSubject<Artist[]>([]);
  public artists$ = this._artists$.asObservable()

  private _artistFilter$ = new BehaviorSubject<ArtistFilter>(this.getEmptyFilter());
  public artistFilter$ = this._artistFilter$.asObservable()

  private _artistLength$ = new BehaviorSubject<number>(1)
  public artistLength$ = this._artistLength$.asObservable()

  public async loadArtists(index: number = 0, isConnectArtists: boolean = true) {
    const filterBy = this._artistFilter$.value
    const queryParams = this.getQueryParams(filterBy, index)
    const prevArtists = isConnectArtists ? this._artists$.value : []
    const artists = await lastValueFrom(this.httpService.get(this.ARTIST_URL + queryParams, null)) as Artist[]
    this._artists$.next(prevArtists.concat(artists))
  }

  public query(filterBy: ArtistFilter) {
    const queryParams = this.getQueryParams(filterBy)
    return this.httpService.get(this.ARTIST_URL + queryParams, null) as Observable<Artist[]>
  }

  public async loadFullLength() {
    const filterBy = this._artistFilter$.value
    const queryParams = this.getQueryParams(filterBy)

    const artistLength = await lastValueFrom(this.httpService.get(this.ARTIST_URL + 'length/' + queryParams, null)) as number
    this._artistLength$.next(artistLength)
  }

  public getById(artistId: string): Observable<Artist> {
    return this.httpService.get(this.ARTIST_URL + artistId, null) as Observable<Artist>
  }

  public save(artist: any) {
    if (artist._id) return lastValueFrom(this.httpService.put(this.ARTIST_URL, artist))
    return lastValueFrom(this.httpService.post(this.ARTIST_URL, artist))
  }

  public getEmptyFilter() {
    return {
      likeByUser: '',
      place: '',
      label: '',
      hostId: '',
      isPetAllowed: 'false'
    }
  }

  public setFilter(filter: ArtistFilter) {
    this._artistFilter$.next(filter)
    this.loadFullLength()
    this.loadArtists(0, false)
  }
  
  public async setFilterAsync(filter: ArtistFilter) {
    this._artistFilter$.next(filter)
    this.loadFullLength()
    await this.loadArtists(0, false)
  }

  public getEmptyArtist() {
    return {
      name: '',
      type: '',
      imgUrls: new Array<string>(0),
      price: 0,
      summary: '',
      capacity: 0,
      amenities: new Array<string>(0),
      bathrooms: 0,
      bedrooms: 0,
      roomType: '',
      host: {
        _id: '',
        createAt: Date.now(),
        fullname: '',
        location: '',
        about: '',
        responseTime: '',
        thumbnailUrl: "https://a0.muscache.com/im/pictures/542dba0c-eb1b-4ab3-85f3-94d3cc8f87a4.jpg?aki_policy=profile_small",
        pictureUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
        isSuperhost: true,
        policyNumber: "36133410"
      },
      loc: {
        country: '',
        countryCode: '',
        city: '',
        address: '',
        lat: -156.6917,
        lan: 20.93792
      },
      reviews: new Array<string>(0),
      likedByUsers: new Array<string>(0),
      labels: new Array<string>(0),
      statReviews: {
        cleanliness: 0,
        communication: 4.3,
        checkIn: 0,
        accuracy: 0,
        location: 0,
        value: 0
      }
    }
  }

  private getQueryParams(filterBy: ArtistFilter, index: number = 0) {
    let params = `?page=${index}&`
    if (filterBy.likeByUser) params += `likeByUser=${filterBy.likeByUser}&`
    if (filterBy.hostId) params += `hostId=${filterBy.hostId}&`
    if (filterBy.label) params += `label=${filterBy.label}&`
    if (filterBy.isPetAllowed) params += `isPetAllowed=${filterBy.isPetAllowed}&`
    if (filterBy.place) params += `place=${filterBy.place}`
    return params
  }

  public getEmptyReview(): Review {
    return {
      "at": Date.now(),
      "by": {
        "_id": '',
        "fullname": '',
        "imgUrl": '',
      },
      "txt": ''
    }
  }
}
