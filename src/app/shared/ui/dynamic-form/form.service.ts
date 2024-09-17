import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Field } from "./field/field";

@Injectable()
export class FormService {
  toFormGroup(fields: Field[]) {
    const group = new FormGroup({});

    for (const field of fields) {
      const control = new FormControl(
        field.value,
        field.required ? Validators.required : null
      );

      group.addControl(field.key, control);
    }

    return group;
  }
}
