import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistHeaderFilterGuestModalComponent } from './artist-header-filter-guest-modal.component';

describe('ArtistHeaderFilterGuestModalComponent', () => {
  let component: ArtistHeaderFilterGuestModalComponent;
  let fixture: ComponentFixture<ArtistHeaderFilterGuestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistHeaderFilterGuestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistHeaderFilterGuestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
