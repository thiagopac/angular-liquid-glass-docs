import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LiquidGlassCardComponent } from 'angular-liquid-glass';
import { CodeBlock } from '../../shared/code-block/code-block';

@Component({
  selector: 'docs-card-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LiquidGlassCardComponent, CodeBlock],
  templateUrl: './card-page.html',
  styleUrl: './card-page.scss',
})
export class CardPage {
  readonly blurValue = signal(7);
  readonly bgEnabled = signal(false);
  readonly bgColor = signal('#ffffff');
  readonly bgAlpha = signal(18);
  readonly radiusValue = signal(24);
  readonly scaleValue = signal(120);

  readonly blur = computed(() => `${this.blurValue()}px`);
  readonly background = computed(() => {
    if (!this.bgEnabled()) return 'transparent';
    const hex = this.bgColor();
    const alpha = (this.bgAlpha() / 100).toFixed(2);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  });
  readonly borderRadius = computed(() => `${this.radiusValue()}px`);

  readonly htmlSnippet = computed(() => {
    const bgLine = this.bgEnabled() ? `\n  background="${this.background()}"` : '';
    return `<angular-liquid-glass-card\n  width="320px"\n  height="280px"\n  blur="${this.blur()}"${bgLine}\n  borderRadius="${this.borderRadius()}"\n  [scale]="${this.scaleValue()}"\n>\n  <!-- your content -->\n</angular-liquid-glass-card>`;
  });

  readonly inputRows = [
    { name: 'width', type: 'string', default: '300px', desc: 'Card width' },
    { name: 'height', type: 'string', default: '200px', desc: 'Card height' },
    { name: 'borderRadius', type: 'string', default: '24px', desc: 'Corner radius' },
    { name: 'blur', type: 'string', default: '20px', desc: 'Backdrop blur amount' },
    { name: 'saturation', type: 'string', default: '180%', desc: 'Backdrop saturation' },
    { name: 'scale', type: 'number', default: '77', desc: 'SVG distortion intensity' },
    { name: 'background', type: 'string', default: 'rgba(255,255,255,0.01)', desc: 'Glass overlay color' },
    { name: 'highlight', type: 'string', default: 'rgba(255,255,255,0.75)', desc: 'Specular edge color' },
    { name: 'textColor', type: 'string', default: '#ffffff', desc: 'Content text color' },
  ];

  readonly tsSnippet = `import { LiquidGlassCardComponent } from 'angular-liquid-glass';

@Component({
  imports: [LiquidGlassCardComponent],
  template: \`
    <angular-liquid-glass-card width="320px" height="280px">
      <div class="my-content">
        <h3>Title</h3>
        <p>Your content here.</p>
      </div>
    </angular-liquid-glass-card>
  \`,
})
export class MyComponent {}`;
}
