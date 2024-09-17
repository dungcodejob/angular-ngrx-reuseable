import { FieldType } from "../field-type.enum";
import { Field } from "../field/field";

export class TextBoxField extends Field<string | null> {
  override type = FieldType.TextBox;
  override controlType = "text";
}
