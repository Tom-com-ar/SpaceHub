import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../models/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<Alert>();
  alerts$ = this.alertSubject.asObservable();

  sendAlert(message: string, type: Alert['type'] = 'info') {
    const newAlert: Alert = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    this.alertSubject.next(newAlert);
  }

  startRandomAlerts() {
    const messages = [
      'Atencion! Temperatura en la capsula critica.',
      'Mision Apolo 12 ha entrado en orbita.',
      'Perdida de senal con el satelite OVNI-3.',
      'Comunicacion establecida con la Estacion Espacial.'
    ];

    setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      const types: Alert['type'][] = ['info', 'warning', 'danger'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      this.sendAlert(randomMessage, randomType);
    }, 5000);
  }
}
