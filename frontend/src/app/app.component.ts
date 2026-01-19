import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ToastModule } from 'primeng/toast';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, TranslateModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'es', 'fr', 'pt']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|es|fr|pt/) ? browserLang : 'en');
  }
}
