import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.interface';
import { MissionService } from './mission.service';

const RANDOM_CONTROL_MESSAGES = [
  'Telemetría nominal en todos los sistemas.',
  'Confirmando trayectoria orbital, todo dentro de parámetros.',
  'Nivel de combustible al 87%.',
  'Contacto visual establecido con la nave.',
  'Ajustando antena para mejorar la señal.',
];

let nextId = 1;

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnDestroy {
  // Subject como "bus de eventos": cada mensaje nuevo se emite a todos los suscriptores.
  private messagesSubject = new Subject<ChatMessage>();
  messages$: Observable<ChatMessage> = this.messagesSubject.asObservable();

  private intervalId?: ReturnType<typeof setInterval>;

  constructor(private missionService: MissionService) {}

  ngOnDestroy(): void {
    this.stopRandomTraffic();
  }

  private emit(sender: ChatMessage['sender'], text: string): void {
    const message: ChatMessage = {
      id: nextId++,
      sender,
      text,
      timestamp: new Date(),
    };
    this.messagesSubject.next(message);
  }

  /** Permite emitir mensajes de sistema (ej: bienvenida) desde fuera del servicio. */
  announce(text: string): void {
    this.emit('sistema', text);
  }

  /** Simula tráfico entrante de la sala de control, como si viniera de un socket. */
  startRandomTraffic(intervalMs = 8000): void {
    if (this.intervalId) {
      return;
    }
    this.intervalId = setInterval(() => {
      const text = RANDOM_CONTROL_MESSAGES[Math.floor(Math.random() * RANDOM_CONTROL_MESSAGES.length)];
      this.emit('control', text);
    }, intervalMs);
  }

  stopRandomTraffic(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  /** Procesa lo que escribe el usuario: lo publica y responde comandos conocidos. */
  sendUserMessage(rawText: string): void {
    const text = rawText.trim();
    if (!text) {
      return;
    }

    this.emit('usuario', text);

    const command = text.toLowerCase();
    if (command === 'status') {
      this.respondToStatus();
    } else if (command === 'help' || command === 'ayuda') {
      this.emit(
        'sistema',
        'Comandos disponibles: "status" (resumen de misiones activas), "help" (esta ayuda).'
      );
    } else {
      this.emit('control', 'Copiado. Mensaje recibido en la sala de control.');
    }
  }

  private respondToStatus(): void {
    const missions = this.missionService.getMissions();
    let subscription = missions.subscribe(list => {
      const active = list.filter(m => m.status === 'Activa');
      const summary = active.length
        ? active.map(m => `${m.name} (${m.progress}%)`).join(', ')
        : 'ninguna misión activa en este momento.';
      this.emit('sistema', `Misiones activas: ${summary}`);
    });
    subscription.unsubscribe();
  }
}
