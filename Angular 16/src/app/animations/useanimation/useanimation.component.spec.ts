import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseanimationComponent } from './useanimation.component';

describe('UseanimationComponent', () => {
  let component: UseanimationComponent;
  let fixture: ComponentFixture<UseanimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UseanimationComponent]
    });
    fixture = TestBed.createComponent(UseanimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
