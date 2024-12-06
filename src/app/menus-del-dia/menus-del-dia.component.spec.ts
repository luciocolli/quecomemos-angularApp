import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusDelDiaComponent } from './menus-del-dia.component';

describe('MenusDelDiaComponent', () => {
  let component: MenusDelDiaComponent;
  let fixture: ComponentFixture<MenusDelDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenusDelDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenusDelDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
