import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleFormComponent } from './sample-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SampleFormComponent', () => {
  let component: SampleFormComponent;
  let fixture: ComponentFixture<SampleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleFormComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should form', () => {
    expect(component.form.get('input2').enabled).toBeTrue();

    component.form.get('input').setValue('y');
    expect(component.form.get('input2').disabled).toBeTrue();
    expect(component.form.value.input2).toBeUndefined();

    component.form.get('input').setValue('x');
    expect(component.form.get('input2').enabled).toBeTrue();
    component.form.get('input2').setValue('y');

    expect(component.form.value.input2).toBe('y');

    component.form.get('input').setValue('y');
    expect(component.form.value.input2).toBeUndefined();
  });
});
