import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistHeaderFilterModalComponent } from './artist-header-filter-modal.component';

describe('ArtistHeaderFilterModalComponent', () => {
  let component: ArtistHeaderFilterModalComponent;
  let fixture: ComponentFixture<ArtistHeaderFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistHeaderFilterModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistHeaderFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
