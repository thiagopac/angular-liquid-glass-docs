import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LiquidGlassToggleComponent } from 'angular-liquid-glass';
import { CodeBlock } from '../../shared/code-block/code-block';

@Component({
  selector: 'docs-toggle-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LiquidGlassToggleComponent, CodeBlock],
  templateUrl: './toggle-page.html',
  styleUrl: './toggle-page.scss',
})
export class TogglePage {
  readonly blurValue = signal(7);
  readonly scaleValue = signal(120);

  readonly offColorHex = signal('#ffffff');
  readonly offAlpha = signal(8);
  readonly onColorHex = signal('#ffffff');
  readonly onAlpha = signal(30);

  readonly toggle1 = signal(false);
  readonly toggle2 = signal(true);
  readonly toggle3 = signal(false);

  readonly blur = computed(() => `${this.blurValue()}px`);

  readonly offColor = computed(() => {
    const hex = this.offColorHex();
    const alpha = (this.offAlpha() / 100).toFixed(2);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  });

  readonly onColor = computed(() => {
    const hex = this.onColorHex();
    const alpha = (this.onAlpha() / 100).toFixed(2);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  });

  readonly htmlSnippet = computed(() =>
    `<angular-liquid-glass-toggle
  label="Dark Mode"
  blur="${this.blur()}"
  offColor="${this.offColor()}"
  onColor="${this.onColor()}"
  [scale]="${this.scaleValue()}"
  [(checked)]="isDarkMode"
/>`
  );

  readonly inputRows = [
    { name: 'label', type: 'string', default: "''", desc: 'Optional text label shown next to the toggle' },
    { name: 'checked', type: 'boolean', default: 'false', desc: 'Toggle state — supports [(checked)] two-way binding' },
    { name: 'offColor', type: 'string', default: 'rgba(255,255,255,0.08)', desc: 'Track overlay color when off' },
    { name: 'onColor', type: 'string', default: 'rgba(255,255,255,0.30)', desc: 'Track overlay color when on' },
    { name: 'blur', type: 'string', default: '4px', desc: 'Backdrop blur on the track' },
    { name: 'scale', type: 'number', default: '77', desc: 'SVG distortion intensity' },
    { name: 'highlight', type: 'string', default: 'rgba(255,255,255,0.75)', desc: 'Specular edge color' },
    { name: 'textColor', type: 'string', default: '#ffffff', desc: 'Label text color' },
  ];

  readonly tsSnippet = `import { LiquidGlassToggleComponent } from 'angular-liquid-glass';

@Component({
  imports: [LiquidGlassToggleComponent],
  template: \`
    <angular-liquid-glass-toggle
      label="Dark Mode"
      offColor="rgba(255,255,255,0.08)"
      onColor="rgba(255,255,255,0.30)"
      [(checked)]="isDarkMode"
    />

    <angular-liquid-glass-toggle
      label="Notifications"
      onColor="rgba(120,200,255,0.35)"
      [(checked)]="notificationsEnabled"
    />
  \`,
})
export class MyComponent {
  isDarkMode = false;
  notificationsEnabled = true;
}`;
}
