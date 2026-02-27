import { Component, inject, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud/crud-service';

import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crud-operations',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, MatDialogModule, MatButtonModule],
  templateUrl: './crud-operations.html',
  styleUrls: ['./crud-operations.scss']
})
export class CrudOperations implements OnInit {
  photosService = inject(CrudService);
  snackBar = inject(MatSnackBar);

  photosList: any[] = [];

  newPhoto = this.getEmptyPhoto();

  isFormSubmitted: boolean = false;

  ngOnInit() {
    this.getPhotosList();
  }

  // Empty Model
  getEmptyPhoto() {
    return {
      albumId: 0,
      id: 0,
      title: '',
      url: '',
      thumbnailUrl: ''
    };
  }

  // Get Photos
  getPhotosList() {
    this.photosService.getPhoto().subscribe({
      next: (data: any) => {
        this.photosList = Array.isArray(data)
          ? data.slice(0, 10)
          : [];
      },
      error: (err) => {
        console.error('Error fetching photos', err);
      }
    });
  }

  // Submit Handler
  onSubmit(form: NgForm) {
    if (this.newPhoto.id === 0) {
      this.onSavePhoto(form);
    } else {
      this.onUpdatePhoto(form);
    }
  }

  // Save
  onSavePhoto(form: NgForm) {
    this.isFormSubmitted = true;
    if(form.valid){
      this.photosService.postPhoto(this.newPhoto).subscribe({
        next: () => {
          this.snackBar.open(
            'batch Created Succesfully',
            'close',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          )
          // alert('Photo saved successfully');
          this.getPhotosList();
          this.onReset(form);
          this.isFormSubmitted = false;
        },
        error: (err) => {
          console.error('Error saving photo', err);
        }
      });
    }
  }

  // Edit
  onEditPhoto(data: any) {
    this.newPhoto = { ...data }; // Important (no reference mutation)
  }

  // Update
  onUpdatePhoto(form: NgForm) {
    this.photosService.putPhoto(this.newPhoto.id, this.newPhoto).subscribe({
      next: () => {
        alert('Photo updated successfully');
        this.getPhotosList();
        this.onReset(form);
      },
      error: (err) => {
        console.error('Error updating photo', err);
      }
    });
  }

  // Delete
  onDeletePhoto(id: number) {
    this.photosService.deletePhoto(id).subscribe({
      next: () => {
        alert('Photo deleted successfully');
        this.getPhotosList();
      },
      error: (err) => {
        console.error('Error deleting photo', err);
      }
    });
  }

  // Reset
  onReset(form: NgForm) {
    form.resetForm();
    this.newPhoto = this.getEmptyPhoto();
  }
}
