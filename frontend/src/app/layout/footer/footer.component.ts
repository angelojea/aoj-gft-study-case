import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DropdownModule, FormsModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  languages: { label: string; value: string }[];
  selectedLanguage: string;

  constructor(public translate: TranslateService) {
    this.languages = [
      { label: 'English', value: 'en' },
      { label: 'Español', value: 'es' },
      { label: 'Français', value: 'fr' },
      { label: 'Português', value: 'pt' },
    ];
    this.selectedLanguage = translate.currentLang;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
