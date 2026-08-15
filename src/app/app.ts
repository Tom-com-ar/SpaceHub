import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  title = 'SpaceHub';
  met = '00:00:00';
  private startTime = Date.now();
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    // MET = Mission Elapsed Time. Cuenta desde que se abrió la sesión,
    // como el reloj de una sala de control real.
    this.intervalId = setInterval(() => this.updateMet(), 1000);
    this.updateMet();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateMet(): void {
    const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
    const h = Math.floor(elapsed / 3600).toString().padStart(2, '0');
    const m = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(elapsed % 60).toString().padStart(2, '0');
    this.met = `${h}:${m}:${s}`;
  }
}
