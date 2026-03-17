import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'docs-coming-soon-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="coming-soon-page">
      <h1>{{ data.name }}</h1>
      <p class="subtitle">This component is under development and will be available soon.</p>
    </div>
  `,
  styles: `
    .coming-soon-page {
      max-width: 700px;
      margin: 80px auto;
      padding: 0 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      background: rgba(255, 255, 255, 0.08);
      color: rgba(226, 232, 240, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      width: fit-content;
    }

    h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: #f0f0f5;
    }

    .subtitle {
      margin: 0;
      font-size: 0.95rem;
      color: rgba(226, 232, 240, 0.5);
      line-height: 1.6;
    }
  `,
})
export class ComingSoonPage {
  protected readonly data = inject(ActivatedRoute).snapshot.data as { name: string; id: string };
}
