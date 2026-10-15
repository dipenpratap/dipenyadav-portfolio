export const NAV_STATS = [
  { value: '6+', label: 'Years in data engineering' },
  { value: '3', label: 'Countries supported: US, Nepal, India' },
  { value: 'iOS + Web', label: 'Native staff app and web platform' },
  { value: '9+', label: 'AWS services in production' },
] as const;

export const BUILT = [
  { title: 'Queue and booking', body: 'Walk-in queue, appointments, a check-in kiosk and a lobby TV board, ranked server-side so every surface shows the same order.' },
  { title: 'Point of sale', body: 'Card payments through Stripe Terminal, QR payments for markets where cards are not the default, receipts, refunds with approver controls.' },
  { title: 'Native staff app', body: 'SwiftUI app for iPad and iPhone with PIN sign-in, push notifications and live updates, released in lockstep with the web platform.' },
  { title: 'Multi-country', body: 'US, Nepal and India with a tax engine, local currency handling and country-aware phone and messaging rules.' },
  { title: 'AI features', body: 'Assistive features on AWS Bedrock (insights, suggested replies) gated to paid plans and cached to keep inference cost bounded.' },
  { title: 'Security program', body: 'Designed toward SOC 2, HIPAA-readiness and PCI SAQ A: tenant isolation, audited admin access, WAF, same-origin guards. Not yet certified.' },
] as const;

export const HIGHLIGHTS = [
  'Strict multi-tenancy: every query is keyed by organisation, with auth resolved before any database access.',
  'Raw SQL on PostgreSQL (RDS) with a large migration history, idempotent writes and transactional outbox-style background jobs.',
  'AWS ECS Fargate behind an ALB with WAF, SQS plus a dead-letter queue for webhooks, SES, SNS, EventBridge schedules and CloudWatch alarms.',
  'Large automated test suite (unit plus Playwright end to end) and a CI pipeline tuned for cost.',
  'A documented findings ledger: root causes and traps are written down so the next engineer does not re-derive them.',
] as const;

export const COMPETENCIES = [
  'Product Engineering and Founder-Level Ownership',
  'Multi-Tenant SaaS Architecture',
  'Payments (Stripe, Terminal, QR)',
  'AWS Cloud Architecture (9+ services)',
  'Enterprise Data Pipeline Design',
  'PySpark / Hadoop / Hive',
  'ETL and ELT Workflow Architecture',
  'AI / LLM Integration (Bedrock, OpenAI)',
  'Data Governance and Quality Frameworks',
  'Native iOS and Full-Stack TypeScript',
] as const;

export const EXPERIENCE = [
  {
    title: 'Founder & Engineering Lead',
    company: 'Queuella',
    href: 'https://queuella.com',
    location: 'Georgetown, TX',
    period: '2024 – Present',
    bullets: [
      'Built and run a multi-tenant queue, booking and POS platform end to end: Next.js and TypeScript on PostgreSQL, with a native Swift iOS staff app.',
      'Shipped card and QR payments, billing, loyalty and a tax engine covering the US, Nepal and India.',
      'Designed the AWS backend (ECS, RDS, SQS, SES, Cognito, Bedrock, EventBridge, WAF) and migrated authentication to Cognito without losing user data.',
      'Set up the engineering system: broad unit and end-to-end coverage, cost-aware CI and documented decisions.',
    ],
  },
  {
    title: 'Senior Data Engineer',
    company: 'Liberty Mutual Insurance Company',
    location: 'Remote | Austin, TX',
    period: 'Jan 2021 – Present',
    bullets: [
      'Led migration of core insurance data systems to AWS (S3, EMR, Glue, Redshift); redesigned ETL/ELT workflows cut processing errors and testing cycles by 85%.',
      'Built enterprise PySpark, Hadoop and Hive pipelines over multi-TB datasets feeding analytics, reporting and ML.',
      'Put data quality and lineage controls in place (schema validation, reconciliation, null-rate monitoring) so regulated reporting stays auditable.',
      'Tuned Spark jobs (partitioning, broadcast joins, skew handling) to shorten runtimes and lower cluster cost.',
      'Delivered ML-ready feature pipelines with point-in-time correctness, and mentored an Agile team on monthly reporting.',
    ],
  },
  {
    title: 'Engineering Lead, Business Automation',
    company: 'iBrows Studio | Multi-Location Beauty Brand',
    location: 'Georgetown, TX',
    period: '2024 – Present',
    bullets: [
      'Replaced manual multi-location payroll with an automated pipeline (Python, AWS Lambda, EventBridge) that runs every pay cycle.',
      'Turned raw timecard, team and payment data into per-employee payroll with configurable rules.',
      'Added timezone-aware anomaly detection for clock violations, oversized shifts and probable auto-clockouts.',
      'Sends branded pay stubs, exception reports and a manager summary automatically.',
    ],
  },
  {
    title: 'Data Engineer',
    company: 'Cognizant Technology Solutions',
    location: 'Austin, TX',
    period: 'Aug 2020 – Dec 2020',
    bullets: [
      'Built a real-time social stream pipeline on Kafka and Spark Streaming, from ingestion to output sink.',
      'Analysed multi-source COVID-19 healthcare data on AWS EMR and shipped Power BI call-center dashboards.',
    ],
  },
  {
    title: 'Student Research Assistant',
    company: 'Texas Tech University',
    location: 'Lubbock, TX',
    period: 'Apr 2019 – May 2020',
    bullets: ['Automated log-file extraction and processing with Python and Bash, improving data accuracy for analysis.'],
  },
] as const;

export const AWS_CERTS = [
  {
    name: 'AWS Certified Developer – Associate',
    issued: 'Earned Oct 2020',
    img: 'https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png',
    href: 'https://www.credly.com/badges/94b6ba0a-48d6-47ca-8534-e91e02425f40',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issued: 'Earned Oct 2020',
    img: 'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
    href: 'https://www.credly.com/badges/cc8ce929-47ab-4cc2-b1b8-6868b4a40d46',
  },
] as const;

export const OTHER_CERTS = [
  { name: 'Academy Accreditation — Databricks Lakehouse Fundamentals', issuer: 'Databricks', issued: 'Oct 2022' },
  { name: 'Advances in Deep Learning', issuer: 'UT Austin', issued: 'Jan 2026' },
  { name: 'Design Principles & Causal Inference', issuer: 'UT Austin', issued: 'Dec 2024' },
  { name: 'Data Structures & Algorithms', issuer: 'UT Austin', issued: 'Dec 2024' },
  { name: 'Optimization', issuer: 'UT Austin', issued: 'May 2025' },
  { name: 'Deep Learning', issuer: 'UT Austin', issued: 'Aug 2024' },
  { name: 'Data Science for Health Discovery and Innovation', issuer: 'UT Austin', issued: 'May 2024' },
  { name: 'Foundations of Regression and Predictive Modeling', issuer: 'UT Austin', issued: 'May 2024' },
  { name: 'Machine Learning', issuer: 'edX', issued: 'Dec 2021' },
  { name: 'Probability and Simulation-Based Inference', issuer: 'edX', issued: 'Nov 2021' },
] as const;

export const SKILLS = [
  { cat: 'Languages', items: ['Python', 'SQL', 'TypeScript', 'Swift', 'R', 'SAS', 'Bash', 'PowerShell'] },
  { cat: 'Big Data', items: ['PySpark', 'Apache Spark', 'Hadoop', 'Hive', 'MapReduce', 'Kafka', 'Spark Streaming'] },
  { cat: 'Cloud / AWS', items: ['S3', 'EMR', 'Glue', 'Redshift', 'SQS', 'SNS', 'SES', 'Cognito', 'ECS', 'Lambda', 'Bedrock', 'EventBridge', 'WAF'] },
  { cat: 'Databases', items: ['PostgreSQL', 'Oracle Autonomous DB', 'MySQL', 'MongoDB', 'Cassandra'] },
  { cat: 'APIs / Integration', items: ['Stripe', 'Square API', 'REST API Design', 'OpenAI API'] },
  { cat: 'AI / LLM', items: ['AWS Bedrock', 'OpenAI API', 'LLM Integration', 'AI-Assisted Engineering'] },
  { cat: 'ETL / ELT', items: ['Apache Airflow', 'Informatica', 'Talend', 'dbt', 'pandas', 'Event-Driven Pipelines'] },
  { cat: 'Data Quality', items: ['Great Expectations', 'Schema Validation', 'Anomaly Detection', 'Data Lineage', 'Governance Frameworks'] },
  { cat: 'ML Frameworks', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Statistical Modeling'] },
  { cat: 'BI / Viz', items: ['Tableau', 'Power BI', 'Recharts', 'Oracle Analytics Cloud'] },
  { cat: 'DevOps / Testing', items: ['Docker', 'Kubernetes', 'AWS ECS', 'Git', 'Agile/Scrum', 'Vitest', 'Playwright'] },
] as const;
