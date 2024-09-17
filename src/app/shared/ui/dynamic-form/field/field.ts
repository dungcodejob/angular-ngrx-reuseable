import { Type } from "@angular/core";
import { isNotNil } from "@shared/utils";
import { FieldType } from "../field-type.enum";
import { FieldComponent } from "./field.component";

export abstract class Field<T = unknown> {
  abstract readonly type: FieldType;
  readonly controlType: HTMLInputElement["type"];
  readonly key: string;
  readonly label: string;
  readonly value: T;
  readonly required: boolean;
  readonly order: number;
  readonly options: { key: string; value: string }[];
  readonly component: Type<FieldComponent<Field>> | null;

  constructor(config: {
    type?: HTMLInputElement["type"];
    key: string;
    value: T;
    label?: string;
    required?: boolean;
    order?: number;
    options?: { key: string; value: string }[];
    component?: Type<FieldComponent<Field>>;
  }) {
    this.controlType = config.type || "text";
    this.key = config.key;
    this.value = config.value;
    this.label = config.label || "";
    this.required = !!config.required;
    this.order = isNotNil(config.order) ? config.order : 0;
    this.options = config.options || [];
    this.component = config.component || null;
  }
}
