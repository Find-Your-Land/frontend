import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSearchPlaceModalComponent } from './artist-search-place-modal.component';

describe('ArtistSearchPlaceModalComponent', () => {
  let component: ArtistSearchPlaceModalComponent;
  let fixture: ComponentFixture<ArtistSearchPlaceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistSearchPlaceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistSearchPlaceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
