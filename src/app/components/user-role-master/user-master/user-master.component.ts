import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-user-master',
  imports: [MaterialModule],
  templateUrl: './user-master.component.html',
  styleUrl: './user-master.component.css',
})
export class UserMasterComponent {
  // Define columns to be displayed
  displayedColumns: string[] = [
    'name',
    'role',
    'reportingPerson',
    'contactNumber',
    'email',
    'createdDate',
    'status',
    'action',
  ];

  // Sample data for the table
  dataSource = [
    {
      name: 'John Doe',
      role: 'Admin',
      reportingPerson: 'N/A',
      contactNumber: '123-456-7890',
      email: 'john.doe@example.com',
      createdDate: new Date('2022-01-01'),
      status: 'Active',
    },
    {
      name: 'Jane Smith',
      role: 'Manager',
      reportingPerson: 'John Doe',
      contactNumber: '098-765-4321',
      email: 'jane.smith@example.com',
      createdDate: new Date('2022-02-01'),
      status: 'Inactive',
    },
    // Add more sample data here
  ];
}
