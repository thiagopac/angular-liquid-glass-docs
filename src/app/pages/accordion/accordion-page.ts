import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LiquidGlassAccordionComponent } from 'angular-liquid-glass';
import { CodeBlock } from '../../shared/code-block/code-block';

@Component({
  selector: 'docs-accordion-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LiquidGlassAccordionComponent, CodeBlock],
  templateUrl: './accordion-page.html',
  styleUrl: './accordion-page.scss',
})
export class AccordionPage {
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
    return `<angular-liquid-glass-accordion\n  label="What is Liquid Glass?"\n  blur="${this.blur()}"${bgLine}\n  borderRadius="${this.borderRadius()}"\n  [scale]="${this.scaleValue()}"\n>\n  <p>Your content here.</p>\n</angular-liquid-glass-accordion>`;
  });

  readonly inputRows = [
    { name: 'label', type: 'string', default: '—', desc: 'Header trigger text (required)' },
    { name: 'blur', type: 'string', default: '4px', desc: 'Backdrop blur amount' },
    { name: 'borderRadius', type: 'string', default: '12px', desc: 'Corner radius' },
    { name: 'scale', type: 'number', default: '77', desc: 'SVG distortion intensity' },
    { name: 'background', type: 'string', default: 'rgba(255,255,255,0.01)', desc: 'Glass overlay color' },
    { name: 'highlight', type: 'string', default: 'rgba(255,255,255,0.75)', desc: 'Specular edge color' },
    { name: 'textColor', type: 'string', default: '#ffffff', desc: 'Content text color' },
  ];

  readonly tsSnippet = `import { LiquidGlassAccordionComponent } from 'angular-liquid-glass';

@Component({
  imports: [LiquidGlassAccordionComponent],
  template: \`
    <angular-liquid-glass-accordion label="Getting Started">
      <p>Install via npm and import the component.</p>
    </angular-liquid-glass-accordion>

    <angular-liquid-glass-accordion label="Configuration">
      <p>Each accordion manages its own open/close state independently.</p>
    </angular-liquid-glass-accordion>
  \`,
})
export class MyComponent {}`;
}
