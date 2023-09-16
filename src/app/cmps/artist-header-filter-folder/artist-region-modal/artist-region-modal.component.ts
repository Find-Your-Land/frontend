import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ArtistFilter } from 'src/app/models/artist.model';
@Component({
  selector: 'artist-region-modal',
  templateUrl: './artist-region-modal.component.html',
  styleUrls: ['./artist-region-modal.component.scss']
})
export class ArtistRegionModalComponent {
  @Input() artistFilter!: ArtistFilter
  @Output() setSearchFilter = new EventEmitter()

  setFilter(place: string) {
    this.setSearchFilter.emit(place)
    this.artistFilter.place = place
  }
}
