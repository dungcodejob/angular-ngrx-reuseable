import { Provider } from "@angular/core";
import { FormComponent } from "./form/form.component";

export * from "./field/field";
export * from "./field/field.component";
export * from "./form/form.component";
export * from "./text-box/text-box-field";
export * from "./text-box/text-box.component";

export function provideDynamicForm(): Provider {
  return [FormComponent];
}
