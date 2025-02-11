import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
  output,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleFormComponent } from '../role-form/role-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-from',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './user-from.component.html',
  styleUrl: './user-from.component.css',
})
export class UserFromComponent {
  @Output() close = new EventEmitter<void>();
  @ViewChild('closeButton') closeButton!: ElementRef; // Close button reference

  userForm!: FormGroup;
  cities: string[] = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
  ]; // Sample data
  states: string[] = ['California', 'Texas', 'Florida', 'New York', 'Illinois']; // Sample data
  roles: string[] = ['Manager', 'Team Lead', 'Developer', 'HR', 'Admin']; // Sample data

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      emailId: ['', [Validators.required, Validators.email]],
      pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      reportingTo: ['', Validators.required],
      status: ['active', Validators.required], // Default status is 'active'
    });
  }
  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Submitted', this.userForm.value);
      this.dialogRef.close({ success: true, data: this.userForm.value });
    }
  }
  closeDialog(success: boolean): void {
    this.dialogRef.close({ success });
  }
}
