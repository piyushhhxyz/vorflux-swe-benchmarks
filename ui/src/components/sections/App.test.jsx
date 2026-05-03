/**
 * Smoke and interaction tests for the redesigned benchmarks page.
 *
 * Covers: App render, HarnessPicker tab interaction, TaskAtlas benchmark toggle,
 * SectionHeader reuse, and ModelComparison data-driven annotations.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from '../../App';
import HarnessPicker from './HarnessPicker';
import TaskAtlas from './TaskAtlas';
import SectionHeader from './SectionHeader';
import ModelComparison from './ModelComparison';
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
  it('renders the headline and score cards', () => {
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
    expect(screen.getAllByText('BEST RESULT').length).toBeGreaterThan(0);
    expect(screen.getAllByText('PARANOID REVIEW').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SINGLE-VENDOR').length).toBeGreaterThan(0);
    expect(screen.getAllByText('DEEP REVIEW').length).toBeGreaterThan(0);
  });

  it('switches active harness on tab click', () => {
    render(<HarnessPicker />);
    // Click the PARANOID REVIEW tab
    const paranoidTab = screen.getAllByText('PARANOID REVIEW')[0];
    fireEvent.click(paranoidTab);

    // The Opus 4.7 x Opus 4.7 harness name should appear
    expect(screen.getAllByText('Opus 4.7 x Opus 4.7').length).toBeGreaterThan(0);
  });
});

describe('TaskAtlas — interaction', () => {
  it('renders the aggregate results heading', () => {
    const { container } = render(<TaskAtlas />);
    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toMatch(/full picture/);
  });

  it('shows RESOLVED and SCORE stats', () => {
    const { container } = render(<TaskAtlas />);
    expect(container.textContent).toContain('RESOLVED');
    expect(container.textContent).toContain('SCORE');
  });

  it('toggles between benchmarks', () => {
    const { container } = render(<TaskAtlas />);
    // Default is SWE-bench — should show /500
    expect(container.textContent).toContain('/ 500');

    // Click Terminal-Bench toggle
    const termToggle = screen.getByRole('button', { name: /Terminal-Bench/ });
    fireEvent.click(termToggle);

    // Now should show /300
    expect(container.textContent).toContain('/ 300');
  });

  it('renders dot grid items', () => {
    const { container } = render(<TaskAtlas />);
    const dots = container.querySelectorAll('.dot-grid-item');
    expect(dots.length).toBe(500);
  });
});

describe('ModelComparison — data-driven annotations', () => {
  it('renders without crashing', () => {
    const { container } = render(<ModelComparison />);
    expect(container).toBeTruthy();
  });

  it('displays the "self-reported harness" annotation from data', () => {
    const { container } = render(<ModelComparison />);
    expect(container.textContent).toContain('self-reported harness');
  });

  it('renders all model names', () => {
    const { container } = render(<ModelComparison />);
    expect(container.textContent).toContain('Opus 4.7');
    expect(container.textContent).toContain('GPT-5.4');
    expect(container.textContent).toContain('Gemini 3.1 Pro');
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
  it('renders the vor·flux·ing text', () => {
    const { container } = render(<VorfluxingDefinition />);
    // The middot entities render as the actual character
    expect(container.textContent).toContain('vor·flux·ing');
  });

  it('renders the definition blurb', () => {
    const { container } = render(<VorfluxingDefinition />);
    expect(container.textContent).toContain('pairing frontier models');
  });
});

describe('Footer', () => {
  it('renders the giant "vorfluxing" text', () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toContain('vorfluxing');
  });

  it('renders copyright text with current year', () => {
    const { container } = render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(container.textContent).toContain(`© ${year} Vorflux`);
  });
});
