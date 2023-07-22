import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-rginput',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './rginput.component.html',
  styleUrls: ['./rginput.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RginputComponent),
    multi: true
  }]
})
export class RginputComponent implements ControlValueAccessor {

  value!: string;
  change!: (val: string) => void;
  touched!: () => void;
  
  @Input('label') label!: string;

  @Input('hint') hint!: string;

  writeValue(obj: string): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.change = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  inputChanges(): void {
    console.log(this.value);
    this.change(this.value);
    this.touched();
  }
}
