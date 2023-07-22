import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RginputComponent } from './rginput.component';

describe('RginputComponent', () => {
  let component: RginputComponent;
  let fixture: ComponentFixture<RginputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RginputComponent]
    });
    fixture = TestBed.createComponent(RginputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
