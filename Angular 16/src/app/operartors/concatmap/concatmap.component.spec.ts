import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcatmapComponent } from './concatmap.component';

describe('ConcatmapComponent', () => {
  let component: ConcatmapComponent;
  let fixture: ComponentFixture<ConcatmapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConcatmapComponent]
    });
    fixture = TestBed.createComponent(ConcatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
