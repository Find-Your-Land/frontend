import { Component, Input } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})

export class ArtistListComponent {
  constructor(private artistService: ArtistService) { }
  @Input() artists!: Artist[] | null;
}
