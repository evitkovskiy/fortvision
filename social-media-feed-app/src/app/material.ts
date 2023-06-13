import { ModuleWithProviders, NgModule } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';


const mm = [
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatIconModule
];

@NgModule({
    imports: [ ...mm ],
    exports: [...mm],
    providers: []
})

export class MaterialModule {
  constructor(public matIconRegistry: MatIconRegistry) {
      matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  static forRoot(): ModuleWithProviders<MaterialModule> {
      return {
          ngModule: MaterialModule,
          providers: [MatIconRegistry]
      };
  }
}
