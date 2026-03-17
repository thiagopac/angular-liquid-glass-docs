import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LiquidGlassDropdownComponent, LiquidGlassDropdownItemComponent } from 'angular-liquid-glass';
import { CodeBlock } from '../../shared/code-block/code-block';

@Component({
  selector: 'docs-dropdown-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LiquidGlassDropdownComponent, LiquidGlassDropdownItemComponent, CodeBlock],
  templateUrl: './dropdown-page.html',
  styleUrl: './dropdown-page.scss',
})
export class DropdownPage {
  readonly blurValue = signal(7);
  readonly scaleValue = signal(120);
  readonly radiusValue = signal(12);
  readonly bgEnabled = signal(false);
  readonly bgColor = signal('#ffffff');
  readonly bgAlpha = signal(25);

  readonly blur = computed(() => `${this.blurValue()}px`);
  readonly borderRadius = computed(() => `${this.radiusValue()}px`);
  readonly background = computed(() => {
    if (!this.bgEnabled()) return 'transparent';
    const hex = this.bgColor();
    const alpha = (this.bgAlpha() / 100).toFixed(2);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  });

  readonly htmlSnippet = computed(() => {
    const bgLine = this.bgEnabled() ? `\n  background="${this.background()}"` : '';
    return `<angular-liquid-glass-dropdown\n  blur="${this.blur()}"${bgLine}\n  borderRadius="${this.borderRadius()}"\n  [scale]="${this.scaleValue()}"\n>\n  <angular-liquid-glass-dropdown-item label="Features">\n    <ul>\n      <li>Liquid distortion effect</li>\n      <li>Smooth open/close animation</li>\n      <li>Reactive inputs</li>\n    </ul>\n  </angular-liquid-glass-dropdown-item>\n\n  <angular-liquid-glass-dropdown-item label="Documentation">\n    <p>Import both components and nest items inside the container.</p>\n  </angular-liquid-glass-dropdown-item>\n</angular-liquid-glass-dropdown>`;
  });

  readonly containerInputRows = [
    { name: 'blur', type: 'string', default: '4px', desc: 'Backdrop blur amount' },
    { name: 'borderRadius', type: 'string', default: '12px', desc: 'Corner radius for all items' },
    { name: 'scale', type: 'number', default: '77', desc: 'SVG distortion intensity' },
    { name: 'background', type: 'string', default: 'rgba(255,255,255,0.01)', desc: 'Glass overlay color' },
    { name: 'highlight', type: 'string', default: 'rgba(255,255,255,0.75)', desc: 'Specular edge color' },
    { name: 'textColor', type: 'string', default: '#ffffff', desc: 'Content text color' },
  ];

  readonly itemInputRows = [
    { name: 'label', type: 'string', default: '—', desc: 'Header text (required)' },
  ];

  readonly tsSnippet = `import {
  LiquidGlassDropdownComponent,
  LiquidGlassDropdownItemComponent,
} from 'angular-liquid-glass';

@Component({
  imports: [LiquidGlassDropdownComponent, LiquidGlassDropdownItemComponent],
  template: \`
    <angular-liquid-glass-dropdown>
      <angular-liquid-glass-dropdown-item label="Features">
        <ul>
          <li>Liquid distortion effect</li>
          <li>Smooth animations</li>
        </ul>
      </angular-liquid-glass-dropdown-item>
      <angular-liquid-glass-dropdown-item label="Support">
        <p>Contact our team for help.</p>
      </angular-liquid-glass-dropdown-item>
    </angular-liquid-glass-dropdown>
  \`,
})
export class MyComponent {}`;
}
