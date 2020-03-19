import { FormControl, FormGroup, ValidatorFn, AbstractControlOptions, AsyncValidatorFn } from '@angular/forms';

export class SuperFormGroup extends FormGroup {
    controls: { [key: string] : SuperFormControl | SuperFormGroup };

    get(controlName: string): SuperFormControl {
        return <SuperFormControl> super.get(controlName);
    }

    constructor(controls: { [key: string] : FormControl | FormGroup }) {
        super(controls);

        this.valueChanges.subscribe(() => {
            Object.keys(this.controls).forEach(key => {
                const control = <SuperFormControl> this.controls[key];
                const enable = control.enableIf();
                if (enable) {
                    this.get(key).enable({ emitEvent: false });
                } else {
                    this.get(key).disable({ emitEvent: false });
                }

                control.updateValueAndValidity();
            });
        });
    }
}

export class SuperFormControl extends FormControl {
    enableIf: () => boolean;

    constructor(
        formState: any = null,
        enableIf: () => boolean = () => true,
        validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
    ) {
        super(formState, validatorOrOpts, asyncValidator);

        this.enableIf = enableIf;
    }
}
