import { FormControl, FormGroup, ValidatorFn, AbstractControlOptions, AsyncValidatorFn, FormArray, FormBuilder } from '@angular/forms';

export interface FormState {
  value: any;
  disabled: boolean;
}

export interface SuperFormState extends FormState {
  enableIf: () => boolean;
}

export const sfs = (
  formState: FormState | string,
  enableIf: () => boolean = () => true
): SuperFormState => {
  let x = {
    disabled: false
  } as FormState;
  if (typeof formState === 'string') {
    x.value = formState;
  } else {
    x = formState;
  }
  return {
    ...x,
    enableIf,
  };
};

export class SuperFormGroup extends FormGroup {
    controls: { [key: string]: SuperFormControl | SuperFormGroup };

    get(controlName: string): SuperFormControl {
        return super.get(controlName) as SuperFormControl;
    }

    constructor(controls: { [key: string]: FormControl | FormGroup }) {
        super(controls);

        this.valueChanges.subscribe(() => {
            Object.keys(this.controls).forEach(key => {
                const control = this.controls[key] as SuperFormControl;
                const enable = control.enableIf();
                if (enable) {
                    this.get(key).enable({ emitEvent: false });
                } else {
                    this.get(key).disable({ emitEvent: false });
                }

                // control.updateValueAndValidity();
            });
        });
    }
}

export class SuperFormControl extends FormControl {
    enableIf: () => boolean;

    constructor(
        { enableIf, ...formState }: SuperFormState,
        validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
    ) {
        super(formState, validatorOrOpts, asyncValidator);
        this.enableIf = enableIf;
    }

    // public x(x: string): string;
    // public x(x: boolean): boolean;
    // public x(x: number): number;
    // public x<T>(x: T): T {
    //   switch (typeof x) {
    //     case 'boolean':
    //       return true as unknown as T;
    //     case 'number':
    //       return 1;
    //     case 'string':
    //       return 'x';
    //   }
    // }
}

declare class X {
  public x(x: string): boolean;
  public x(y: number, x: boolean): boolean;
}


// const b: boolean = sfc.x(true);
// const bx: boolean = sfc.x(5);
// const n: number = sfc.x(5);
// const s: string = sfc.x('y');



export type FormControlConfig = FormState | string | FormControl | FormGroup | [];

export type SuperFormControlConfig = SuperFormState | string | SuperFormControl;

export class SuperFormBuilder extends FormBuilder {
  public group(
    controlsConfig: { [key: string]: FormControlConfig; },
    options?: AbstractControlOptions | { [key: string]: any; } | null
  ): FormGroup {
    return super.group(controlsConfig, options);
  }

  public control(
    formState: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): FormControl {
    return super.control(formState, validatorOrOpts, asyncValidator);
  }

  public array(
    controlsConfig: any[],
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): FormArray {
    return super.array(controlsConfig, validatorOrOpts, asyncValidator);
  }
}
