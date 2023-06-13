import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarMessageConfig, SnackbarMessageType } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  open(message: string, type: SnackbarMessageType) {
    this.snackbar.open(message, '', SnackbarMessageConfig(type));
  }
}
