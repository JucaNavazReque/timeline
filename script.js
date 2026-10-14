const publications = [
  {
    year: '2024',
    type: 'Journal',
    title: 'Mixed reality head mounted displays for enhanced indoor point cloud segmentation with virtual seeds',
    question: 'Can HoloLens 2 acquire enhanced data?',
    logos: ['assets/logos/resilient_cities_and_structures.png'],
    links: [{ label: 'Read', href: 'https://doi.org/10.1016/j.rcns.2024.06.005' }],
  },
  {
    year: '2024',
    type: 'Conference',
    title: 'Scanning indoor environments with Microsoft HoloLens 2 for interactive generation of floor plans',
    question: 'Are simple maps extracted from HoloLens 2 data good and usable?',
    logos: ['assets/logos/eurocarto.png'],
    links: [{ label: 'Read', href: 'https://doi.org/10.5194/ica-abs-7-115-2024' }],
  },
  {
    year: '2025',
    type: 'Journal',
    title: 'HoloLens 2 performance analysis for indoor/outdoor 3D mapping',
    question: 'HoloLens 2 limitations: can it be used for Scan-to-BIM?',
    logos: ['assets/logos/journal_of_building_engineering.png'],
    links: [{ label: 'Read', href: 'https://doi.org/10.1016/j.jobe.2025.112826' }],
  },
  {
    year: '2026',
    type: 'Conference',
    title: 'The Role of Augmented Reality and Governance in Improving Labour Productivity for Building Inventories: Insights from the Binckhorst Area',
    question: 'How does HoloLens 2 enhance productivity in a real case scenario?',
    logos: ['assets/logos/egrwse.png'],
    links: [{ label: 'Read', href: 'https://doi.org/10.1007/978-3-032-15934-2_32' }],
  },
  {
    year: '2026',
    type: 'Conference',
    title: 'Integrating Lidar and Virtual Reality for Safe Building Condition Assessment',
    question: 'Can extended reality be used for safety scenarios?',
    logos: ['assets/logos/esrel.png'],
    links: [{ label: 'Read', href: 'https://rpsonline.com.sg/proceedings/esrel2026/pdf/esrel26-p26205.pdf' }],
  },
  {
    year: '2026',
    type: 'Journal',
    title: 'Mixed Reality framework for 3D data acquisition, AI segmentation and visualization in near real-time',
    question: 'Can AI be used for on-site segmentation and semantic visualization?',
    logos: ['assets/logos/ieee_transactions_on_visualization_and_computer_graphics.jpg'],
    pending: true,
    links: [],
  },
].sort((a, b) => a.year.localeCompare(b.year));

const timelineTrack = document.getElementById('timeline-track');
const statusToast = document.getElementById('status-toast');
let statusToastTimer;

function showPendingStatus() {
  statusToast.textContent = 'Work still under journal review!';
  statusToast.classList.add('is-visible');
  window.clearTimeout(statusToastTimer);

  const isPhone = Math.min(window.innerWidth, window.innerHeight) <= 700;
  statusToastTimer = window.setTimeout(() => {
    statusToast.classList.remove('is-visible');
  }, 2000);
}

function renderTimeline() {
  publications.forEach((publication) => {
    const item = document.createElement('article');
    item.className = 'timeline-item';
    item.setAttribute(
      'aria-label',
      publication.pending
        ? `${publication.year} publication pending journal review`
        : `${publication.year} publication`,
    );

    const control = document.createElement(publication.pending ? 'button' : 'a');
    control.className = 'publication-control';
    if (publication.pending) {
      control.type = 'button';
      control.addEventListener('click', showPendingStatus);
    } else {
      control.href = publication.links[0].href;
    }
    control.setAttribute(
      'aria-label',
      publication.pending
        ? `${publication.question} ${publication.title}. Work still under journal review.`
        : publication.title,
    );
    control.setAttribute(
      'title',
      `${publication.question} — ${publication.title}`,
    );

    const icon = document.createElement('img');
    icon.className = 'pub-icon';
    icon.src = publication.type === 'Conference'
      ? 'assets/icons/conference.png'
      : 'assets/icons/journal.png';
    icon.alt = '';
    icon.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.className = 'publication-label';

    const question = document.createElement('span');
    question.className = 'publication-question';
    question.textContent = publication.question;

    const hoverContent = document.createElement('span');
    hoverContent.className = 'publication-hover-content';
    hoverContent.setAttribute('aria-hidden', 'true');

    const title = document.createElement('span');
    title.className = 'publication-title';
    title.textContent = publication.title;

    const logos = document.createElement('span');
    logos.className = 'publication-logos';
    publication.logos.forEach((src) => {
      const logo = document.createElement('img');
      logo.src = src;
      logo.alt = '';
      logo.setAttribute('aria-hidden', 'true');
      logos.appendChild(logo);
    });

    hoverContent.append(title, logos);
    label.append(question, hoverContent);
    control.append(icon, label);
    item.append(control);
    timelineTrack.appendChild(item);
  });
}

renderTimeline();
