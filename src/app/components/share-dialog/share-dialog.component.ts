import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent {

  constructor(public dialogRef: MatDialogRef<ShareDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  shareOnLinkedIn(): void {
    const blogUrl = this.data.url; // Dialog'a iletilen URL'yi kullanıyoruz
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${blogUrl}`, '_blank');
    this.dialogRef.close(); // Dialogu kapat
    
  }
}
