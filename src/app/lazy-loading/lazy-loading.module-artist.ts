import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistDetailsComponent } from '../pages/artist-details/artist-details.component';

const routes: Routes = [
  { path: '', component: ArtistDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LazyLoadingModuleArtist { }
