import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistHeaderFilterComponent } from './artist-header-filter.component';

describe('ArtistHeaderFilterComponent', () => {
  let component: ArtistHeaderFilterComponent;
  let fixture: ComponentFixture<ArtistHeaderFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistHeaderFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistHeaderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
