import { Component, Input, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Artist, ArtistFilter } from 'src/app/models/artist.model';
import { ArtistService } from 'src/app/services/artist.service';


@Component({
  selector: 'artist-search-place-modal',
  templateUrl: './artist-search-place-modal.component.html',
  styleUrls: ['./artist-search-place-modal.component.scss']
})
export class ArtistSearchPlaceModalComponent implements OnInit {
  constructor(private artistService: ArtistService) {}
  @Input() artistFilter!: ArtistFilter
  @Input() placeNameFilter!: string
  @Output() setIsPlacesEmpty = new EventEmitter<boolean>()
  @Output() setSearchFilter = new EventEmitter()
  artists!: Artist[]
  places: string[] = []

  async ngOnInit() {
    this.artists =  await lastValueFrom(this.artistService.query(this.artistService.getEmptyFilter()))
    this.makePlaces()
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.artists) this.makePlaces()
  }

  makePlaces() {
    this.places = this.artists.reduce((acc: string[], artist) => {
      if(!acc.includes(artist.loc.address)) acc.push(artist.loc.address)
      return acc
    }, [])

    const regex = new RegExp(this.placeNameFilter, 'i')
    this.places = this.places.filter(place => regex.test(place))
    if(this.places.length) this.onSetIsPlacesEmpty(false)
    else this.onSetIsPlacesEmpty(true)
  }

  setFilter(place: string) {
    this.setSearchFilter.emit(place)
    this.artistFilter.place = place
  }

  // Expression has changed after it was checked
  onSetIsPlacesEmpty(value: boolean) {
    setTimeout(() => {
      this.setIsPlacesEmpty.emit(value)
    }, 0)
  }
}
