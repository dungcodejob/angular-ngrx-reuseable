import { ChangeDetectionStrategy, Component, inject, input, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ApplyFormControlDirective } from "../apply-form-control.directive";
import { Field } from "../field/field";
import { FormService } from "../form.service";

@Component({
  selector: "app-form",
  standalone: true,
  imports: [ReactiveFormsModule, ApplyFormControlDirective],
  providers: [FormService],
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  private readonly _formService = inject(FormService);

  $fields = input.required<Field[]>({ alias: "fields" });

  form!: FormGroup;

  ngOnInit(): void {
    const fields = this.$fields();
    this.form = this._formService.toFormGroup(fields);

    console.log(this.form);
  }

  onFormSubmit(event: Event): void {
    if (this.form.invalid) {
      console.log("onFormSubmit() - dynFormGroup is invalid!");
      console.log("onFormSubmit() - dynFormGroup", this.form);
      return;
    }
    console.log("onFormSubmit() - dynFormGroup", this.form);
  }
}
