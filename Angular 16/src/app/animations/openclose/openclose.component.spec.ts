import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpencloseComponent } from './openclose.component';

describe('OpencloseComponent', () => {
  let component: OpencloseComponent;
  let fixture: ComponentFixture<OpencloseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OpencloseComponent]
    });
    fixture = TestBed.createComponent(OpencloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
