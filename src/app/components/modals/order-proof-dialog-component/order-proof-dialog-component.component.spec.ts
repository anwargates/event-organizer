import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProofDialogComponentComponent } from './order-proof-dialog-component.component';

describe('OrderProofDialogComponentComponent', () => {
  let component: OrderProofDialogComponentComponent;
  let fixture: ComponentFixture<OrderProofDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderProofDialogComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderProofDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
