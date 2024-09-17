import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FieldComponent } from "../field/field.component";
import { TextBoxField } from "./text-box-field";

@Component({
  selector: "app-text-box",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./text-box.component.html",
  styleUrl: "./text-box.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextBoxComponent extends FieldComponent<TextBoxField> {}
