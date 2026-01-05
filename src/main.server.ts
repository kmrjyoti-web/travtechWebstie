import { provideZoneChangeDetection } from "@angular/core";
import 'zone.js/node';
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

export default function bootstrap() {
  return bootstrapApplication(AppComponent, {...config, providers: [provideZoneChangeDetection(), ...config.providers]});
}
