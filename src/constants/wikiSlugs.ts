// Wiki slugs for general wiki/concept pages
export const wikiSlugs = [
  'algorithms',
  'arrays',
  'async-programming',
  'backtracking',
  'camelcase',
  'chars',
  'classes',
  'conditionals',
  'constraints',
  'conventions',
  'data-structures',
  'data-types',
  'debugging',
  'design-patterns',
  'dynamic-programming',
  'exception-handling',
  'explicit',
  'file-io',
  'floating-point',
  'functions',
  'gracefully',
  'graphs',
  'greedy-algorithms',
  'inheritance',
  'inference',
  'interfaces',
  'late-initialized',
  'loops',
  'memory-management',
  'optimization',
  'parsing',
  'polymorphism',
  'programming-concepts',
  'reassignment',
  'recursion',
  'searching',
  'snake-case',
  'sorting',
  'stdin',
  'strings',
  'template',
  'testing',
  'threading',
  'trees',
  'uninitialized',
  'val',
  'variable',
  'variable-declarations',
] as const;

// Question slugs for specific question pages
export const questionSlugs = [
  '01-variable-declaration',
  '02-data-types',
  '03-arithmetic-operators',
  '04-basic-input-output',
  '05-comparison-operators',
  '06-logical-operators',
  '07-string-operations',
  '08-constants-immutable',
  '09-if-else-statements',
  '10-nested-conditionals',
  '11-switch-case-statements',
  '12-for-loops-basic-iteration',
  '13-while-loops',
  '14-do-while-loops-where-applicable',
  '15-nested-loops',
  '16-loop-control-break-continue',
  '17-range-based-loops',
  '18-arrays-declaration-and-initialization',
  '19-array-traversal-and-modification',
  '20-multi-dimensional-arrays',
] as const;

export type WikiSlug = (typeof wikiSlugs)[number];
export type QuestionSlug = (typeof questionSlugs)[number];
