import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import Ajv from 'ajv';
import { SuperFormGroup, SuperFormControl } from './super-formcontrol';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.css']
})
export class SampleFormComponent implements OnInit {

  public form: FormGroup;
  private schema = {
    type: 'object',
    properties: {
      input: { type: 'number' },
    },
  };

  constructor(private formBuilder: FormBuilder) {
  //   this.form = this.formBuilder.group({
  //     input: new FormControl({value: 'x', disabled: false}),
  //     input2: '',
  //   });

    // this.form.get("input").disable();

    const x = 'x';

    this.form = new SuperFormGroup({
      input: new SuperFormControl({value: '', disabled: false}),
      input2: new SuperFormControl({value: '', disabled: false},
        this.shouldShowInput2
      ),
      input3: new SuperFormControl({value: '', disabled: true},
        // this.shouldShowInput3,
        this.shouldShowInput32,
      ),
    });
  }

  public shouldShowInput2 = (): boolean => this.form.get('input').value === 'x';

  public shouldShowInput3 = (): boolean => this.form.get('input2').value === 'y';

  public shouldShowInput32 = (): boolean => this.form.value.input2 === 'y';

  private inputValidator(form: FormGroup): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
    form.get('input2').value === 'x' ?
      null :
      {input2: {value: control.value}};
  }

  onSubmit() {
    // console.log(this.form.value);
    // const ajv = new Ajv();
    // const valid = ajv.validate(this.schema, this.form.value);
    // if (valid) {
    //   console.log("VALID!");
    // } else {
    //   console.log("INVALID!");
    // }

    const val = this.form.value;
    console.log(val);
  }

  ngOnInit(): void {
  }

}

