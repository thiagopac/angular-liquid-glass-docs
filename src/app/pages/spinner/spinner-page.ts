import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LiquidGlassSpinnerComponent } from 'angular-liquid-glass';
import { CodeBlock } from '../../shared/code-block/code-block';

@Component({
  selector: 'docs-spinner-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LiquidGlassSpinnerComponent, CodeBlock],
  templateUrl: './spinner-page.html',
  styleUrl: './spinner-page.scss',
})
export class SpinnerPage {
  readonly blurValue = signal(7);
  readonly scaleValue = signal(120);
  readonly sizeValue = signal(80);
  readonly speedValue = signal(50);
  readonly bgEnabled = signal(false);
  readonly bgColor = signal('#ffffff');
  readonly bgAlpha = signal(1);
  readonly ringColorHex = signal('#ffffff');

  readonly blur = computed(() => `${this.blurValue()}px`);
  readonly size = computed(() => `${this.sizeValue()}px`);
  readonly ringColor = computed(() => {
    const hex = this.ringColorHex();
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},0.9)`;
  });
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
    return `<angular-liquid-glass-spinner
  size="${this.size()}"
  blur="${this.blur()}"${bgLine}
  ringColor="${this.ringColor()}"
  [scale]="${this.scaleValue()}"
  [speed]="${this.speedValue()}"
/>`;
  });

  readonly inputRows = [
    { name: 'size', type: 'string', default: '80px', desc: 'Diameter of the spinner circle' },
    { name: 'blur', type: 'string', default: '4px', desc: 'Backdrop blur amount' },
    { name: 'scale', type: 'number', default: '77', desc: 'SVG distortion intensity' },
    { name: 'speed', type: 'number', default: '50', desc: 'Rotation speed 0 (slowest) → 100 (fastest)' },
    { name: 'ringColor', type: 'string', default: 'rgba(255,255,255,0.9)', desc: 'Color of all rings and core' },
    { name: 'background', type: 'string', default: 'rgba(255,255,255,0.01)', desc: 'Glass overlay color' },
    { name: 'highlight', type: 'string', default: 'rgba(255,255,255,0.75)', desc: 'Specular edge color' },
  ];

  readonly tsSnippet = `import { LiquidGlassSpinnerComponent } from 'angular-liquid-glass';

@Component({
  imports: [LiquidGlassSpinnerComponent],
  template: \`
    <!-- Default -->
    <angular-liquid-glass-spinner />

    <!-- Custom size and speed -->
    <angular-liquid-glass-spinner size="120px" [speed]="0.8" />

    <!-- Colored rings -->
    <angular-liquid-glass-spinner ringColor="rgba(120,200,255,0.9)" />
  \`,
})
export class MyComponent {}`;
}
