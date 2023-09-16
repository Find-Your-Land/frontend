import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeaderArtistComponent } from './app-header-artist.component';

describe('AppHeaderArtistComponent', () => {
  let component: AppHeaderArtistComponent;
  let fixture: ComponentFixture<AppHeaderArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppHeaderArtistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppHeaderArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
