import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSupplierDialogComponent } from './delete-supplier-dialog.component';

describe('DeleteSupplierDialogComponent', () => {
  let component: DeleteSupplierDialogComponent;
  let fixture: ComponentFixture<DeleteSupplierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSupplierDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSupplierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
