import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsMasterComponent } from './permissions-master.component';

describe('PermissionsMasterComponent', () => {
  let component: PermissionsMasterComponent;
  let fixture: ComponentFixture<PermissionsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionsMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
