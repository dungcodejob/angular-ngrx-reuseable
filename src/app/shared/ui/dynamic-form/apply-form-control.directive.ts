import {
  ComponentRef,
  Directive,
  Injector,
  OnDestroy,
  OnInit,
  Type,
  ViewContainerRef,
  effect,
  inject,
  input,
  untracked,
} from "@angular/core";
import { FormControl, FormGroupDirective } from "@angular/forms";
import { FieldType } from "./field-type.enum";
import { Field } from "./field/field";
import { FieldComponent } from "./field/field.component";
import { TextBoxComponent } from "./text-box/text-box.component";

const ComponentFields: Record<FieldType, Type<FieldComponent<Field>>> = {
  [FieldType.TextBox]: TextBoxComponent,
};
@Directive({
  selector: "apply-form-control",
  standalone: true,
})
export class ApplyFormControlDirective<T> implements OnInit, OnDestroy {
  private readonly _injector = inject(Injector);
  private readonly _vcf = inject(ViewContainerRef);
  private readonly _parent = inject(FormGroupDirective, {
    host: true,
    skipSelf: true,
    optional: true,
  });

  $field = input.required<Field>({ alias: "field" });

  private componentRef!: ComponentRef<FieldComponent<Field>>;

  ngOnInit(): void {
    effect(
      () => {
        const field = this.$field();
        if (field.controlType) {
          const component = field.component ?? ComponentFields[field.type];
          this.componentRef = this._vcf.createComponent(component);

          if (this._parent && this._parent.formDirective) {
            const control = this._parent.control.get(field.key) as FormControl;
            this.componentRef.instance.control = control;
          }

          untracked(() => this.componentRef.instance.$field.set(field));
        }
      },
      { injector: this._injector }
    );
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
