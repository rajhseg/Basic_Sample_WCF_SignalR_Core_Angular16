import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JquerylibComponent } from './jquerylib.component';

describe('JquerylibComponent', () => {
  let component: JquerylibComponent;
  let fixture: ComponentFixture<JquerylibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JquerylibComponent]
    });
    fixture = TestBed.createComponent(JquerylibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
