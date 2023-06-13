import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarMessageType } from './snackbar-message.type';

export const SnackbarMessageConfig = (type: SnackbarMessageType) => ({
  duration: 2000,
  horizontalPosition: 'center',
  verticalPosition: 'top',
  panelClass: SnackbarMessageType[type]
} as MatSnackBarConfig);
