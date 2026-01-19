import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  languages: { label: string; value: string }[];
  selectedLanguage: string;
  isDarkMode = false;

  constructor(
    public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.languages = [
      { label: 'English', value: 'en' },
      { label: 'Español', value: 'es' },
      { label: 'Français', value: 'fr' },
      { label: 'Português', value: 'pt' },
    ];
    this.selectedLanguage = translate.currentLang;
  }

  ngOnInit(): void {
    this.isDarkMode =
      localStorage.getItem('isDarkMode') === 'true' ||
      this.document.documentElement.classList.contains('dark');
    if (this.isDarkMode) {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
    this.updatePrimeNgTheme();

    const sessionLang = localStorage.getItem('selectedLanguage');
    if (sessionLang) {
      this.translate.use(sessionLang);
      this.selectedLanguage = sessionLang;
    }
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('selectedLanguage', lang);
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('isDarkMode', this.isDarkMode.toString());
    if (this.isDarkMode) {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
    this.updatePrimeNgTheme();
  }

  private updatePrimeNgTheme(): void {
    const themeLink = this.document.getElementById(
      'app-theme',
    ) as HTMLLinkElement;
    if (themeLink) {
      const theme = this.isDarkMode ? 'lara-dark-blue' : 'lara-light-blue';
      themeLink.href = `assets/themes/${theme}/theme.css`;
    }
  }
}
