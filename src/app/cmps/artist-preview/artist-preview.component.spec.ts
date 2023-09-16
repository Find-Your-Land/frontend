import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistPreviewComponent } from './artist-preview.component';

describe('ArtistPreviewComponent', () => {
  let component: ArtistPreviewComponent;
  let fixture: ComponentFixture<ArtistPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
