import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMultiselectComponent } from './ng-multiselect.component';

describe('NgMultiselectComponent', () => {
  let component: NgMultiselectComponent;
  let fixture: ComponentFixture<NgMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgMultiselectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
