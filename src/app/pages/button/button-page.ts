import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LiquidGlassButtonComponent } from 'angular-liquid-glass';
import { CodeBlock } from '../../shared/code-block/code-block';

@Component({
  selector: 'docs-button-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LiquidGlassButtonComponent, CodeBlock],
  templateUrl: './button-page.html',
  styleUrl: './button-page.scss',
})
export class ButtonPage {
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
    return `<angular-liquid-glass-button\n  blur="${this.blur()}"${bgLine}\n  borderRadius="${this.borderRadius()}"\n  [scale]="${this.scaleValue()}"\n>\n  Liquid Glass Button\n</angular-liquid-glass-button>`;
  });

  readonly inputRows = [
    { name: 'blur', type: 'string', default: '4px', desc: 'Backdrop blur amount' },
    { name: 'borderRadius', type: 'string', default: '12px', desc: 'Corner radius' },
    { name: 'scale', type: 'number', default: '77', desc: 'SVG distortion intensity' },
    { name: 'background', type: 'string', default: 'rgba(255,255,255,0.01)', desc: 'Glass overlay color' },
    { name: 'highlight', type: 'string', default: 'rgba(255,255,255,0.75)', desc: 'Specular edge color' },
    { name: 'textColor', type: 'string', default: '#ffffff', desc: 'Content text color' },
  ];

  readonly tsSnippet = `import { LiquidGlassButtonComponent } from 'angular-liquid-glass';

@Component({
  imports: [LiquidGlassButtonComponent],
  template: \`
    <angular-liquid-glass-button>
      Click me
    </angular-liquid-glass-button>
  \`,
})
export class MyComponent {}`;
}
