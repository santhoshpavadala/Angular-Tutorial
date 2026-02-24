import { Component, inject, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-operations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-operations.html',
  styleUrls: ['./crud-operations.scss']
})
export class CrudOperations implements OnInit {
  photosList: any[] = []; 
  photosService = inject(CrudService);

  // Post request data
  newPhoto = {
    albumId: 0,
    id: 0,
    title: '',
    url: '',
    thumbnailUrl: ''
  };

  ngOnInit() {
    this.getPhotosList();
  }

  // Get Api call
  getPhotosList() {
    this.photosService.getPhoto().subscribe({
    next: (data: any) => {
      this.photosList = data;
      console.log(data, 'photosdata');
      
    },
    error: (err) => {
      console.error('Error fetching photos', err);
    }
    });
  }

  // Post Api call
  onSavePhoto() {
    this.photosService.postPhoto(this.newPhoto).subscribe({
      next: (response) => {
        alert('Photo saved successfully');
        console.log('Photo saved successfully', response);
        // Optionally, you can refresh the photos list or reset the form here

        this.getPhotosList(); // Refresh the photos list after saving
      },
      error: (err) => {
        console.error('Error saving photo', err);
      }
    });

  }

  // Edit and Update operations
  onEditPhoto(data: any) {
    this.newPhoto = data; // Populate the form with the selected photo data for editing
  }

  // put or patch request for update operation
  onUpdatePhoto() {
    this.photosService.putPhoto(this.newPhoto.id, this.newPhoto).subscribe({
      next: (response) => {
        alert('Photo updated successfully');
        // Optionally, you can refresh the photos list or reset the form here
        this.getPhotosList(); // Refresh the photos list after saving
      },
      error: (err) => {
        console.error('Error saving photo', err);
      }
    });
  }

  // put or patch request for update operation
  onDeletePhoto(id: number) {
    this.photosService.deletePhoto(id).subscribe({
      next: (response) => {
        alert('Photo deleted successfully');
        // Optionally, you can refresh the photos list or reset the form here
        this.getPhotosList(); // Refresh the photos list after deletion
      },
      error: (err) => {
        console.error('Error deleting photo', err);
      }
    });
  }
}
