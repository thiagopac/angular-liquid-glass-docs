import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

const NAV_ITEMS = [
  { path: 'card', label: 'Card', id: 'CRD004' },
  { path: 'button', label: 'Button', id: 'BTN003' },
  { path: 'dropdown', label: 'Dropdown', id: 'DRP001' },
  { path: 'accordion', label: 'Accordion', id: 'ACC001' },
  { path: 'icons', label: 'Icons', id: 'ICO001' },
  { path: 'nav', label: 'Nav', id: 'NAV002' },
  { path: 'spinner', label: 'Spinner', id: 'LDR003' },
  { path: 'toggle', label: 'Toggle', id: 'TGL001' },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly navItems = NAV_ITEMS;
}
