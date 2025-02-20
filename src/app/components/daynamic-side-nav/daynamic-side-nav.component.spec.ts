import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaynamicSideNavComponent } from './daynamic-side-nav.component';

describe('DaynamicSideNavComponent', () => {
  let component: DaynamicSideNavComponent;
  let fixture: ComponentFixture<DaynamicSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaynamicSideNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaynamicSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
