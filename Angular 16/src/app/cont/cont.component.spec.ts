import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContComponent } from './cont.component';

describe('ContComponent', () => {
  let component: ContComponent;
  let fixture: ComponentFixture<ContComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContComponent]
    });
    fixture = TestBed.createComponent(ContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
