import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComidaFormComponent } from './crear-comida-form.component';

describe('CrearComidaFormComponent', () => {
  let component: CrearComidaFormComponent;
  let fixture: ComponentFixture<CrearComidaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearComidaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearComidaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
