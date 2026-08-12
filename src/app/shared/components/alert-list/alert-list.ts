import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../core/services/alert.service';
import { Alert } from '../../../core/models/alert.interface';

@Component({
  selector: 'app-alert-list',
  standalone: false,
  templateUrl: './alert-list.html',
  styleUrl: './alert-list.scss',
})
export class AlertList implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.alerts$.subscribe(newAlert => {
      this.alerts.unshift(newAlert);
      setTimeout(() => {
        this.alerts = this.alerts.filter(a => a.id !== newAlert.id);
      }, 10000);
    });

    this.alertService.startRandomAlerts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
