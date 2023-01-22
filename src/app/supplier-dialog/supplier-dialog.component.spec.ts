import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDialogComponent } from './supplier-dialog.component';

describe('SupplierDialogComponent', () => {
  let component: SupplierDialogComponent;
  let fixture: ComponentFixture<SupplierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
