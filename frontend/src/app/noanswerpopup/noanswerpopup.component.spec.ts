import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoanswerpopupComponent } from './noanswerpopup.component';

describe('NoanswerpopupComponent', () => {
  let component: NoanswerpopupComponent;
  let fixture: ComponentFixture<NoanswerpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoanswerpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoanswerpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
