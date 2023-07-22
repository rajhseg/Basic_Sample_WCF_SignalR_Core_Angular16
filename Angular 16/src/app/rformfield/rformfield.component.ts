import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { NgControl, AbstractControlDirective, ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from "@angular/material/divider"
import { FocusMonitor } from '@angular/cdk/a11y';

export interface FormFieldValue {
  query: string,
  scope: string
}

@Component({
  selector: 'app-rformfield',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    FormsModule
  ],
  templateUrl: './rformfield.component.html',
  styleUrls: ['./rformfield.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: RformfieldComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useClass: forwardRef(() => RformfieldComponent),
      multi: true
    }
  ]
})
export class RformfieldComponent implements OnInit, OnDestroy, MatFormFieldControl<FormFieldValue>, ControlValueAccessor {

  private _value!: FormFieldValue;
  private _placeholder!: string;
  static id = 0;
  changeControl!: (val: FormFieldValue) => void;
  touchedControl!: () => void;

  @ViewChild(MatInput, { read: ElementRef, static: true }) input!: ElementRef;

  constructor(private foc: FocusMonitor, @Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(obj: FormFieldValue): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.changeControl = fn;
  }

  registerOnTouched(fn: any): void {
    this.touchedControl = fn;
  }

  controlChange(): void {
    this.changeControl(this.value);
    this.touchedControl();
    console.log(this.value);
  }

  ngOnDestroy(): void {
    //this.foc.stopMonitoring(this.input);
    this.stateChanges.complete();
  }

  ngOnInit(): void {
    //this.foc.monitor(this.input).subscribe((isFocus) => {
    //  this.focused = !!isFocus;
    //  this.stateChanges.next();
    //})
  }

  @Input()
  set value(val: FormFieldValue) {
    this._value = val;
    this.stateChanges.next();
  }
  get value(): FormFieldValue {
    return this._value;
  }

  stateChanges = new Subject<void>();

  @HostBinding('id')
  id: string = `rcustom-${RformfieldComponent.id++}`;

  @Input()
  set placeholder(val: string) {
    this._placeholder = val;
    this.stateChanges.next();
  }
  get placeholder(): string {
    return this._placeholder;
  }

  focused: boolean = false;

  get empty(): boolean {
    return this.value == null ||
      this.value == undefined ||
      this.value.query == "" ||
      this.value.scope == "";
  }

  @HostBinding('class.floated')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  @Input()
  required: boolean = false;

  @Input()
  disabled: boolean = false;

  errorState: boolean = false;

  controlType?: string | undefined;

  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  setDescribedByIds(ids: string[]): void {
    // throw new Error('Method not implemented.');
  }
  onContainerClick(event: MouseEvent): void {
   // this.foc.focusVia(this.input, 'program');
  }
}

