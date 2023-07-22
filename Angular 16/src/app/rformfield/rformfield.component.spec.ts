import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RformfieldComponent } from './rformfield.component';

describe('RformfieldComponent', () => {
  let component: RformfieldComponent;
  let fixture: ComponentFixture<RformfieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RformfieldComponent]
    });
    fixture = TestBed.createComponent(RformfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
