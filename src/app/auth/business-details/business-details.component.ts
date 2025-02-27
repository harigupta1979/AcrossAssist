import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-business-details',
  imports: [CommonModule, MaterialModule, MatStepperModule, MatGridListModule],
  templateUrl: './business-details.component.html',
  styleUrl: './business-details.component.scss',
})
export class BusinessDetailsComponent {
  selectedStep = 0;

  businessForm: FormGroup;

  steps = [
    'Business Details',
    'Branch Details',
    'Contact Info & Address',
    'Bank Details',
  ];

  constructor(private fb: FormBuilder) {
    this.businessForm = this.fb.group({
      enterpriseName: [''],
    });
  }

  goToStep(index: number) {
    this.selectedStep = index;
  }

  nextStep() {
    if (this.selectedStep < this.steps.length - 1) {
      this.selectedStep++;
    }
  }

  submitForm() {
    alert('Form Submitted Successfully!');
  }
}
