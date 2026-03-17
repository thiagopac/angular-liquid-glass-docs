import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  LiquidGlassDividerComponent,
  LiquidGlassIconComponent,
} from 'angular-liquid-glass';
import { CodeBlock } from '../../shared/code-block/code-block';

@Component({
  selector: 'docs-icons-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LiquidGlassIconComponent, LiquidGlassDividerComponent, CodeBlock],
  templateUrl: './icons-page.html',
  styleUrl: './icons-page.scss',
})
export class IconsPage {
  readonly blurValue = signal(7);
  readonly scaleValue = signal(120);
  readonly radiusValue = signal(16);
  readonly sizeValue = signal(64);
  readonly bgEnabled = signal(false);
  readonly bgColor = signal('#ffffff');
  readonly bgAlpha = signal(25);

  readonly blur = computed(() => `${this.blurValue()}px`);
  readonly borderRadius = computed(() => `${this.radiusValue()}px`);
  readonly size = computed(() => `${this.sizeValue()}px`);
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
    return `<angular-liquid-glass-icon
  size="${this.size()}"
  blur="${this.blur()}"${bgLine}
  borderRadius="${this.borderRadius()}"
  [scale]="${this.scaleValue()}"
>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
  </svg>
</angular-liquid-glass-icon>

<!-- Divider between groups -->
<angular-liquid-glass-divider />`;
  });

  readonly inputRows = [
    { name: 'size', type: 'string', default: '64px', desc: 'Width and height of the icon box' },
    { name: 'blur', type: 'string', default: '4px', desc: 'Backdrop blur amount' },
    { name: 'borderRadius', type: 'string', default: '16px', desc: 'Corner radius' },
    { name: 'scale', type: 'number', default: '77', desc: 'SVG distortion intensity' },
    { name: 'background', type: 'string', default: 'rgba(255,255,255,0.01)', desc: 'Glass overlay color' },
    { name: 'highlight', type: 'string', default: 'rgba(255,255,255,0.75)', desc: 'Specular edge color' },
    { name: 'textColor', type: 'string', default: '#ffffff', desc: 'Icon stroke/fill color' },
  ];

  readonly dividerInputRows = [
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: 'horizontal', desc: 'Direction of the divider line' },
    { name: 'color', type: 'string', default: 'rgba(255,255,255,0.15)', desc: 'Line color' },
  ];

  readonly tsSnippet = `import {
  LiquidGlassIconComponent,
  LiquidGlassDividerComponent,
} from 'angular-liquid-glass';

@Component({
  imports: [LiquidGlassIconComponent, LiquidGlassDividerComponent],
  template: \`
    <angular-liquid-glass-icon size="64px" borderRadius="16px">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12l2-2m0 0l7-7 7 7..."/>
      </svg>
    </angular-liquid-glass-icon>

    <angular-liquid-glass-divider />

    <angular-liquid-glass-icon size="64px" borderRadius="16px">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 6V4m0 2a2 2 0 100 4..."/>
      </svg>
    </angular-liquid-glass-icon>
  \`,
})
export class MyComponent {}`;
}
