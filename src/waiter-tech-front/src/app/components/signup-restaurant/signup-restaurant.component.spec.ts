import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupRestaurantComponent } from './signup-restaurant.component';

describe('SignupRestaurantComponent', () => {
  let component: SignupRestaurantComponent;
  let fixture: ComponentFixture<SignupRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupRestaurantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
