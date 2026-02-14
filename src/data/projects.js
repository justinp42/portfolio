export const projects = [
  {
    id: 1,
    title: "Mnemo",
    subtitle: "AI-Powered SaaS Platform for Marketing Agencies",
    description: "Solo-built multi-tenant SaaS with a multi-model AI orchestrator, RAG pipeline with pgvector embeddings, and ad scoring engine. Full production stack with comprehensive testing.",
    featured: true,
    metrics: [
      { label: "DB tables", value: 49 },
      { label: "tests", value: 5082 },
      { label: "endpoints", value: 68, suffix: "+" },
      { label: "LLM providers", value: 4 }
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "React", "Supabase"],
    github: "https://github.com/justinp42",
    demo: null,
    period: "Dec 2025 — Present"
  },
  {
    id: 2,
    title: "Genetic Algorithm with Wisdom of Crowds",
    subtitle: "Vertex Cover Optimization",
    description: "Evolutionary algorithm combining genetic algorithms with Wisdom of Crowds consensus to achieve measurably better vertex cover solutions. Interactive GUI with real-time visualization, validated across 150+ controlled trials.",
    featured: false,
    metrics: [
      { label: "reduction vs standard GA", value: 7, suffix: "%" },
      { label: "trials", value: 150, suffix: "+" },
      { label: "experiments", value: 15 },
      { label: "IEEE paper pages", value: 8 }
    ],
    tech: ["Python", "NetworkX", "Tkinter", "Matplotlib"],
    github: "https://github.com/justinp42",
    demo: null,
    period: "Fall 2025"
  },
  {
    id: 3,
    title: "ext2 File System Analysis Tool",
    subtitle: "Binary Disk Image Parser",
    description: "CLI tool parsing raw binary ext2 disk images up to 100MB. Implements recursive directory traversal with zero memory leaks validated by Valgrind.",
    featured: false,
    metrics: [
      { label: "core commands", value: 4 },
      { label: "max image size", value: 100, suffix: "MB" }
    ],
    tech: ["C", "Linux", "ext2fs"],
    commands: ["fsinfo", "catfile", "ls", "tree"],
    github: "https://github.com/justinp42",
    demo: null,
    period: "Fall 2025"
  }
];
