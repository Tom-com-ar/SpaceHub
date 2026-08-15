import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mission } from '../../../core/models/mission.interface';

// Datos que recibe el diálogo: si viene "mission" estamos editando,
// si no, estamos creando una misión nueva.
export interface MissionFormData {
  mission?: Mission;
}

const ICONS = ['rocket', 'moon', 'public', 'satellite_alt', 'science', 'thermostat'];
const COLORS = ['#5c6bc0', '#e53935', '#43a047', '#fb8c00', '#8e24aa', '#00897b'];

@Component({
  selector: 'app-mission-form',
  standalone: false,
  templateUrl: './mission-form.html',
  styleUrl: './mission-form.scss',
})
export class MissionForm {
  form: FormGroup;
  isEditMode: boolean;
  icons = ICONS;
  colors = COLORS;
  statuses: Mission['status'][] = ['Activa', 'Completada', 'Fallida'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MissionForm>,
    @Inject(MAT_DIALOG_DATA) public data: MissionFormData
  ) {
    this.isEditMode = !!data?.mission;

    // Partial<Mission> nos permite precargar solo los campos disponibles
    // al editar, sin exigir el objeto Mission completo.
    const initial: Partial<Mission> = data?.mission ?? {
      status: 'Activa',
      progress: 0,
      crew: 0,
      icon: 'rocket',
      color: '#5c6bc0',
    };

    this.form = this.fb.group({
      name: [initial.name ?? '', [Validators.required, Validators.minLength(3)]],
      destination: [initial.destination ?? '', Validators.required],
      status: [initial.status ?? 'Activa', Validators.required],
      progress: [initial.progress ?? 0, [Validators.required, Validators.min(0), Validators.max(100)]],
      crew: [initial.crew ?? 0, [Validators.required, Validators.min(0)]],
      launchDate: [
        initial.launchDate ? new Date(initial.launchDate) : new Date(),
        Validators.required,
      ],
      description: [initial.description ?? '', Validators.required],
      icon: [initial.icon ?? 'rocket', Validators.required],
      color: [initial.color ?? '#5c6bc0', Validators.required],
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    const result: Omit<Mission, 'id'> = {
      name: value.name,
      destination: value.destination,
      status: value.status,
      progress: value.progress,
      crew: value.crew,
      launchDate: value.launchDate,
      description: value.description,
      icon: value.icon,
      color: value.color,
      visibleOnMap: value.status === 'Activa',
    };

    this.dialogRef.close(result);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
