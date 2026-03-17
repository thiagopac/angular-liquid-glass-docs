import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  LiquidGlassNavComponent,
  LiquidGlassNavItemComponent,
} from 'angular-liquid-glass';
import { CodeBlock } from '../../shared/code-block/code-block';

@Component({
  selector: 'docs-nav-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LiquidGlassNavComponent, LiquidGlassNavItemComponent, CodeBlock],
  templateUrl: './nav-page.html',
  styleUrl: './nav-page.scss',
})
export class NavPage {
  readonly blurValue = signal(7);
  readonly scaleValue = signal(120);
  readonly radiusValue = signal(40);
  readonly bgEnabled = signal(false);
  readonly bgColor = signal('#ffffff');
  readonly bgAlpha = signal(20);

  readonly activeTab = signal(0);

  readonly tabLabels = ['Home', 'Search', 'Profile', 'Settings'];

  readonly blur = computed(() => `${this.blurValue()}px`);
  readonly borderRadius = computed(() => `${this.radiusValue()}px`);
  readonly background = computed(() => {
    if (!this.bgEnabled()) return 'rgba(255, 255, 255, 0.01)';
    const hex = this.bgColor();
    const alpha = (this.bgAlpha() / 100).toFixed(2);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  });

  readonly htmlSnippet = computed(() => {
    const bgLine = this.bgEnabled() ? `\n  background="${this.background()}"` : '';
    return `<angular-liquid-glass-nav
  blur="${this.blur()}"${bgLine}
  borderRadius="${this.borderRadius()}"
  [scale]="${this.scaleValue()}"
  (activeTabChange)="onTabChange($event)"
>
  <angular-liquid-glass-nav-item label="Home">
    <!-- SVG icon -->
  </angular-liquid-glass-nav-item>
  <angular-liquid-glass-nav-item label="Search">
    <!-- SVG icon -->
  </angular-liquid-glass-nav-item>
  <angular-liquid-glass-nav-item label="Profile">
    <!-- SVG icon -->
  </angular-liquid-glass-nav-item>
  <angular-liquid-glass-nav-item label="Settings">
    <!-- SVG icon -->
  </angular-liquid-glass-nav-item>
</angular-liquid-glass-nav>`;
  });

  readonly inputRows = [
    { name: 'blur', type: 'string', default: '20px', desc: 'Backdrop blur amount' },
    { name: 'borderRadius', type: 'string', default: '40px', desc: 'Corner radius of the bar' },
    { name: 'scale', type: 'number', default: '77', desc: 'SVG distortion intensity' },
    { name: 'background', type: 'string', default: 'rgba(255,255,255,0.2)', desc: 'Glass overlay color' },
    { name: 'highlight', type: 'string', default: 'rgba(255,255,255,0.75)', desc: 'Specular edge color' },
    { name: 'textColor', type: 'string', default: '#ffffff', desc: 'Icon and label color' },
  ];

  readonly itemInputRows = [
    { name: 'label', type: 'string', default: '—', desc: 'Tab label text (required)' },
  ];

  readonly outputRows = [
    { name: 'activeTabChange', type: 'number', desc: 'Emits the index of the newly activated tab' },
  ];

  readonly tsSnippet = `import {
  LiquidGlassNavComponent,
  LiquidGlassNavItemComponent,
} from 'angular-liquid-glass';

@Component({
  imports: [LiquidGlassNavComponent, LiquidGlassNavItemComponent],
  template: \`
    <angular-liquid-glass-nav (activeTabChange)="activeTab = $event">
      <angular-liquid-glass-nav-item label="Home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10..."/>
        </svg>
      </angular-liquid-glass-nav-item>

      <angular-liquid-glass-nav-item label="Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
      </angular-liquid-glass-nav-item>
    </angular-liquid-glass-nav>
  \`,
})
export class MyComponent {
  activeTab = 0;
}`;

  protected onTabChange(index: number): void {
    this.activeTab.set(index);
  }
}
