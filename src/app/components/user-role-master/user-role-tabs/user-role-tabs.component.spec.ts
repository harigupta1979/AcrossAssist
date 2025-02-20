import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleTabsComponent } from './user-role-tabs.component';

describe('UserRoleTabsComponent', () => {
  let component: UserRoleTabsComponent;
  let fixture: ComponentFixture<UserRoleTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
