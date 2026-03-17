import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('typescript', typescript);

@Component({
  selector: 'docs-code-block',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="code-block">
      <div class="code-header">
        <span class="code-lang">{{ language() }}</span>
        <button class="copy-btn" (click)="copy()">
          {{ copied ? '✓ Copied' : 'Copy' }}
        </button>
      </div>
      <pre class="code-pre"><code [innerHTML]="highlighted()"></code></pre>
    </div>
  `,
  styleUrl: './code-block.scss',
})
export class CodeBlock {
  readonly code = input.required<string>();
  readonly language = input('html');

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly highlighted = computed(() => {
    const result = hljs.highlight(this.code(), { language: this.language(), ignoreIllegals: true });
    return this.sanitizer.bypassSecurityTrustHtml(result.value);
  });

  protected copied = false;

  protected copy(): void {
    navigator.clipboard.writeText(this.code());
    this.copied = true;
    setTimeout(() => (this.copied = false), 2000);
  }
}
