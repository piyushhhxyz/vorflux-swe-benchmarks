/**
 * Smoke and interaction tests for the benchmarks page.
 *
 * Covers: App render, HarnessPicker tab interaction, TaskAtlas benchmark toggle,
 * SectionHeader reuse, ModelComparison agent comparison, TopHarnesses,
 * VorfluxingDefinition, and Footer.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from '../../App';
import HarnessPicker from './HarnessPicker';
import TaskAtlas from './TaskAtlas';
import SectionHeader from './SectionHeader';
import ModelComparison from './ModelComparison';
import TopHarnesses from './TopHarnesses';
import HeroTitle from './HeroTitle';
import MarksheetTable from './MarksheetTable';
import ShippingLoop from './ShippingLoop';
import VorfluxingDefinition from './VorfluxingDefinition';
import Footer from './Footer';

afterEach(() => {
  cleanup();
});

describe('App — smoke render', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('renders the VORFLUX header text', () => {
    render(<App />);
    expect(screen.getAllByText(/VORFLUX/).length).toBeGreaterThan(0);
  });

  it('renders both benchmark names somewhere on the page', () => {
    render(<App />);
    expect(screen.getAllByText(/SWE-bench Verified/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Terminal-Bench 2\.0/).length).toBeGreaterThan(0);
  });
});

describe('HeroTitle', () => {
  it('renders the headline with report card text', () => {
    const { container } = render(<HeroTitle />);
    const heading = container.querySelector('h1');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toMatch(/report card/);
  });

  it('displays BEST HARNESS label', () => {
    render(<HeroTitle />);
    expect(screen.getAllByText(/BEST HARNESS/).length).toBeGreaterThanOrEqual(1);
  });
});

describe('SectionHeader', () => {
  it('renders the label text', () => {
    render(<SectionHeader label="SECTION 99" />);
    expect(screen.getByText('SECTION 99')).toBeInTheDocument();
  });

  it('renders the teal dot', () => {
    const { container } = render(<SectionHeader label="TEST" />);
    const dot = container.querySelector('.rounded-full');
    expect(dot).toBeInTheDocument();
  });
});

describe('HarnessPicker — interaction', () => {
  it('renders all four harness tabs', () => {
    render(<HarnessPicker />);
    expect(screen.getAllByText('BEST').length).toBeGreaterThan(0);
  });

  it('switches active harness on tab click', () => {
    render(<HarnessPicker />);
    const tab = screen.getAllByText('Opus 4.7 x Opus 4.7')[0];
    fireEvent.click(tab);
    expect(screen.getAllByText('Opus 4.7 x Opus 4.7').length).toBeGreaterThan(0);
  });
});

describe('TaskAtlas — interaction', () => {
  it('renders the task atlas heading', () => {
    const { container } = render(<TaskAtlas />);
    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toMatch(/Task atlas/);
  });

  it('shows EVALUATED and RESOLVED stats', () => {
    const { container } = render(<TaskAtlas />);
    expect(container.textContent).toContain('EVALUATED');
    expect(container.textContent).toContain('RESOLVED');
  });

  it('toggles between benchmarks', () => {
    const { container } = render(<TaskAtlas />);
    // Default is SWE-bench — should show 500 evaluated tasks
    expect(container.textContent).toContain('500');

    // Click Terminal-Bench toggle
    const termToggle = screen.getByRole('button', { name: /Terminal-Bench/ });
    fireEvent.click(termToggle);

    // Now should show 89 evaluated tasks
    expect(container.textContent).toContain('89');
  });

  it('renders dot grid items for all benchmark tasks', () => {
    const { container } = render(<TaskAtlas />);
    const dots = container.querySelectorAll('.dot-grid-item');
    // SWE-bench: 500 total tasks (87 evaluated + 413 placeholders)
    expect(dots.length).toBe(500);
  });

  it('renders real task IDs in evaluated dot tooltips', () => {
    const { container } = render(<TaskAtlas />);
    const dots = container.querySelectorAll('.dot-grid-item');
    const titles = Array.from(dots).map((d) => d.getAttribute('title'));
    // Check a known evaluated task ID appears
    expect(titles.some((t) => t.includes('django__django'))).toBe(true);
    // All 500 are now evaluated — no placeholder dots expected
    expect(titles.filter((t) => t === 'not yet evaluated')).toHaveLength(0);
  });

  it('shows "full benchmark score" annotation under BEST HARNESS', () => {
    const { container } = render(<TaskAtlas />);
    expect(container.textContent).toContain('full benchmark score');
  });
});

describe('ModelComparison — agent comparison', () => {
  it('shows Vorflux as an agent', () => {
    const { container } = render(<ModelComparison />);
    expect(container.textContent).toContain('Vorflux');
  });

  it('shows competitor agents', () => {
    const { container } = render(<ModelComparison />);
    expect(container.textContent).toContain('Claude Code');
    expect(container.textContent).toContain('Gemini CLI');
    expect(container.textContent).toContain('Mythos Preview');
  });

  it('renders section heading', () => {
    const { container } = render(<ModelComparison />);
    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toMatch(/stacks up/);
  });
});

describe('TopHarnesses', () => {
  it('shows top 3 harness names', () => {
    const { container } = render(<TopHarnesses />);
    // Top 3 by SWE-bench score: opus47-gpt55 (91), opus47-o4high (89.2), opus47-opus47 (88.4)
    expect(container.textContent).toContain('Opus 4.7 x GPT-5.5');
    expect(container.textContent).toContain('Opus 4.7 x o4 high');
    expect(container.textContent).toContain('Opus 4.7 x Opus 4.7');
  });

  it('shows BEST badge on first harness', () => {
    render(<TopHarnesses />);
    expect(screen.getAllByText('BEST').length).toBeGreaterThan(0);
  });

  it('renders benchmark scores', () => {
    const { container } = render(<TopHarnesses />);
    expect(container.textContent).toContain('91%');
    expect(container.textContent).toContain('86%');
  });
});

describe('MarksheetTable', () => {
  it('renders the marksheet heading', () => {
    const { container } = render(<MarksheetTable />);
    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toMatch(/official marksheet/);
  });

  it('includes verification disclaimer', () => {
    const { container } = render(<MarksheetTable />);
    expect(container.textContent).toMatch(/Verification artifacts/i);
  });

  it('renders VORFLUX HARNESSES and OTHER AGENTS group headers', () => {
    const { container } = render(<MarksheetTable />);
    expect(container.textContent).toContain('VORFLUX HARNESSES');
    expect(container.textContent).toContain('OTHER AGENTS');
  });
});

describe('ShippingLoop', () => {
  it('renders all four pipeline step names', () => {
    const { container } = render(<ShippingLoop />);
    expect(container.textContent).toContain('Plan');
    expect(container.textContent).toContain('Build');
    expect(container.textContent).toContain('Review');
    expect(container.textContent).toContain('Test');
  });

  it('renders sub-agents', () => {
    const { container } = render(<ShippingLoop />);
    expect(container.textContent).toContain('Explore');
    expect(container.textContent).toContain('Reproduce');
  });
});

describe('VorfluxingDefinition', () => {
  it('renders the word with phonetic pronunciation', () => {
    const { container } = render(<VorfluxingDefinition />);
    expect(container.textContent).toContain('vor');
    expect(container.textContent).toContain('flux');
    expect(container.textContent).toContain('verb');
    expect(container.textContent).toContain('gerund');
  });

  it('renders the definition text', () => {
    const { container } = render(<VorfluxingDefinition />);
    expect(container.textContent).toContain('frontier models');
  });

  it('renders the blockquote usage example', () => {
    const { container } = render(<VorfluxingDefinition />);
    const blockquote = container.querySelector('blockquote');
    expect(blockquote).toBeInTheDocument();
    expect(blockquote.textContent).toContain('vorfluxing the auth migration');
  });
});

describe('Footer', () => {
  it('renders start vorfluxing text', () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toContain('start vorfluxing');
  });

  it('renders copyright with current year', () => {
    const { container } = render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(container.textContent).toContain(year);
    expect(container.textContent).toContain('Vorflux');
  });
});
