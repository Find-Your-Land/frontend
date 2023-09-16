import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistImgCarouselComponent } from './artist-img-carousel.component';

describe('ArtistImgCarouselComponent', () => {
  let component: ArtistImgCarouselComponent;
  let fixture: ComponentFixture<ArtistImgCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistImgCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistImgCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
