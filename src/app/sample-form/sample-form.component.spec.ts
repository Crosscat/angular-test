import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleFormComponent } from './sample-form.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  it('should form', () => {
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

  it('should form 2', () => {
    component.form.get('input').disable();

    expect(component.form.value).toEqual({
      input: '',
    });
  });



  // fit('should form 3', () => {
  //   // component.form.get('input').disable();
  //   // component.form.get('input2').disable();
  //   // component.form.get('input3').disable();
  //
  //   expect(component.form.value).toEqual({
  //     input: '',
  //     input2: '',
  //     input3: ''
  //   });
  // });

  fit('should 3', () => {
    expect(component.form.get('input').enabled).toBeTrue();
    expect(component.form.get('input2').enabled).toBeTrue();
    expect(component.form.get('input3').disabled).toBeTrue();
    component.form.get('input').setValue('x');
    component.form.get('input2').setValue('y');
    expect(component.form.get('input2').enabled).toBeTrue();
    expect(component.form.get('input3').enabled).toBeTrue();
    component.form.get('input').setValue('xx');
    expect(component.form.get('input2').disabled).toBeTrue();
    expect(component.form.get('input3').disabled).toBeTrue();
    expect(component.form.value).toEqual({
      input: 'xx',
    });
  });

  //
  // fit('should form 2', () => {
  //   const f = new FormControl({
  //     value: 'x',
  //     disabled: false,
  //     x: 'y'
  //   });
  //   // const g = new FormGroup({
  //   //   f,
  //   // });
  //
  //   // expect(g.get('f')).toBe(f);
  //   f.
  //   expect(f.value.value).toBe('x');
  //   // expect(g.get('f').value).toBe('x');
  //   // expect(g.value.f).toBe('x');
  //
  //
  // });
});
