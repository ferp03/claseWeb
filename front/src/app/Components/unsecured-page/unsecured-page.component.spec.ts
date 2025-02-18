import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsecuredPageComponent } from './unsecured-page.component';

describe('UnsecuredPageComponent', () => {
  let component: UnsecuredPageComponent;
  let fixture: ComponentFixture<UnsecuredPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnsecuredPageComponent]
    });
    fixture = TestBed.createComponent(UnsecuredPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
