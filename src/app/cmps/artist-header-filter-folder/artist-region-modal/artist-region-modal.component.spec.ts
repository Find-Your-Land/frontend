import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistRegionModalComponent } from './artist-region-modal.component';

describe('ArtistRegionModalComponent', () => {
  let component: ArtistRegionModalComponent;
  let fixture: ComponentFixture<ArtistRegionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistRegionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistRegionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
