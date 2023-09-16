import { Component, Input } from '@angular/core';
import { StatReviews, Artist } from 'src/app/models/artist.model';
import { faStar } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'artist-preview',
  templateUrl: './artist-preview.component.html',
  styleUrls: ['./artist-preview.component.scss']
})
export class ArtistPreviewComponent {
  @Input() artist !: Artist
  faStar = faStar

  getRateAvg() {
    let rate = 0
    let key: keyof StatReviews
    for(key in this.artist.statReviews) {
      rate += this.artist.statReviews[key]
    }
    return (rate / 6).toFixed(2)
  }
}
