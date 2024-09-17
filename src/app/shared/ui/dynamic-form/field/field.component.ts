import { signal } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Field } from "./field";

type ValueType<T> = T extends Field<infer S> ? S : unknown;
export abstract class FieldComponent<FieldType extends Field> {
  control!: FormControl<ValueType<FieldType> | null>;
  $field = signal<FieldType | null>(null);
}
