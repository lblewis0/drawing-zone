import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingZone } from './drawing-zone';

describe('DrawingZone', () => {
  let component: DrawingZone;
  let fixture: ComponentFixture<DrawingZone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingZone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingZone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
