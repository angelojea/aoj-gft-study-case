import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, MenuComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
