import { Question, TestCase } from '@/shared/types';
import { formatQuestionName } from '@/shared/lib/formatters';

export async function loadQuestion(
  questionId: string
): Promise<Question | null> {
  try {
    // Load question description
    const questionResponse = await fetch(
      `/questions/${questionId}/question.md`
    );
    if (!questionResponse.ok) {
      throw new Error(`Failed to load question: ${questionId}`);
    }
    const description = await questionResponse.text();

    // Load testcases manifest
    const manifestResponse = await fetch(
      `/questions/${questionId}/testcases.json`
    );
    if (!manifestResponse.ok) {
      throw new Error(
        `Failed to load testcases manifest for question: ${questionId}`
      );
    }
    const testCases: TestCase[] = await manifestResponse.json();

    // Prepend the question folder to file paths
    const testCasesWithPaths = testCases.map((tc) => ({
      ...tc,
      inputFile: `/questions/${questionId}/${tc.inputFile}`,
      expectedFile: `/questions/${questionId}/${tc.expectedFile}`,
    }));

    return {
      id: questionId,
      name: formatQuestionName(questionId),
      description,
      testCases: testCasesWithPaths,
    };
  } catch (error) {
    console.error(`Error loading question ${questionId}:`, error);
    return null;
  }
}

export async function getAvailableQuestions(): Promise<string[]> {
  try {
    console.log('Getting available questions...');
    // Dynamically fetch the list of question directories from the public/questions folder
    // This is a static export, so we need to hardcode the list at build time
    const questions = [
      '01-variable-declaration',
      '02-data-types',
      '02-data-types-conversion',
      '03-arithmetic-operators',
      '03-basic-input-output',
      '04-arithmetic-operators',
      '04-basic-input-output-operations',
      '05-comparison-operators',
      '06-logical-operators',
      '07-string-operations',
      '07-string-operations-and-manipulation',
      '08-constants-and-immutable-values',
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
      '21-basic-string-manipulation',
      '22-string-searching-and-comparison',
      '23-character-manipulation',
      '24-function-definition-and-calling',
      '25-function-parameters-and-arguments',
      '26-return-values-and-types',
      '27-local-vs-global-scope',
      '28-function-overloading-where-applicable',
      '29-basic-recursion',
      '30-recursive-problem-solving',
      '31-basic-exception-handling',
      '32-try-catch-blocks',
      '33-input-validation',
      '34-error-propagation',
      '35-reading-from-files',
      '36-writing-to-files',
      '37-file-processing-line-by-line',
      '38-csv-file-handling',
      '39-json-basics-parsing-simple-structures',
      '40-file-error-handling',
      '41-dynamic-arrays-lists',
      '42-stack-implementation-and-usage',
      '43-queue-implementation-and-usage',
      '44-linked-lists-singly',
      '45-doubly-linked-lists',
      '46-hash-tables-dictionaries',
      '47-sets-and-set-operations',
      '48-trees-binary-trees',
      '49-binary-search-trees',
      '50-tree-traversals',
      '51-higher-order-functions',
      '52-lambda-functions-anonymous-functions',
      '53-function-pointers-references',
      '54-closures',
      '55-decorators-python-function-composition',
      '56-generator-functions',
      '57-iterator-patterns',
      '58-class-definition-and-instantiation',
      '59-instance-variables-and-methods',
      '60-constructors-and-destructors',
      '61-access-modifiers-private-public-protected',
      '62-inheritance-basics',
      '63-method-overriding',
      '64-polymorphism',
      '65-abstract-classes',
      '66-interfaces',
      '67-multiple-inheritance-where-applicable',
      '68-composition-vs-inheritance',
      '69-static-methods-and-variables',
      '70-class-relationships',
      '71-regular-expressions-basics',
      '72-pattern-matching',
      '73-string-formatting',
      '74-unicode-handling',
      '75-text-parsing',
      '76-linear-search',
      '77-binary-search',
      '78-bubble-sort',
      '79-selection-sort',
      '80-insertion-sort',
      '81-merge-sort',
      '82-quick-sort',
      '83-counting-algorithms',
      '84-graph-traversal-bfs',
      '85-graph-traversal-dfs',
      '86-dynamic-programming-basics',
      '87-greedy-algorithms',
      '88-backtracking',
      '89-network-requests-http',
      '90-api-consumption',
      '91-database-connections',
      '92-serialization-deserialization',
      '93-binary-file-handling',
      '94-stream-processing',
      '95-pointers-where-applicable',
      '96-memory-allocation-deallocation',
      '97-garbage-collection-concepts',
      '98-memory-leaks-prevention',
      '99-reference-counting',
      '100-resource-management',
      '101-unit-testing-basics',
      '102-test-driven-development',
      '103-debugging-techniques',
      '104-profiling-basics',
      '105-code-coverage',
      '106-mock-objects',
      '107-integration-testing',
      '108-map-filter-reduce',
      '109-immutable-data-structures',
      '110-pure-functions',
      '111-function-composition',
      '112-currying',
      '113-monads-basic-concepts',
      '114-solid-principles',
      '115-dry-don-t-repeat-yourself',
      '116-kiss-keep-it-simple',
      '117-code-organization',
      '118-modular-programming',
      '119-dependency-injection',
      '120-interface-segregation',
      '121-singleton-pattern',
      '122-factory-pattern',
      '123-abstract-factory-pattern',
      '124-builder-pattern',
      '125-observer-pattern',
      '126-strategy-pattern',
      '127-command-pattern',
      '128-decorator-pattern',
      '129-adapter-pattern',
      '130-facade-pattern',
      '131-template-method-pattern',
      '132-state-pattern',
      '133-chain-of-responsibility',
      '134-visitor-pattern',
      '135-proxy-pattern',
      '136-mvc-pattern',
      '137-mvp-pattern',
      '138-mvvm-pattern',
      '139-thread-creation-and-management',
      '140-thread-synchronization',
      '141-mutexes-and-locks',
      '142-semaphores',
      '143-condition-variables',
      '144-thread-pools',
      '145-producer-consumer-pattern',
      '146-reader-writer-locks',
      '147-atomic-operations',
      '148-lock-free-programming',
      '149-coroutines',
      '150-async-await-patterns',
      '151-parallel-algorithms',
      '152-race-condition-prevention',
      '153-deadlock-prevention',
      '154-thread-safe-data-structures',
      '155-heap-implementation',
      '156-priority-queues',
      '157-graphs-weighted',
      '158-shortest-path-algorithms-dijkstra',
      '159-minimum-spanning-trees',
      '160-topological-sorting',
      '161-union-find-structures',
      '162-trie-data-structures',
      '163-b-trees',
      '164-red-black-trees',
      '165-avl-trees',
      '166-segment-trees',
      '167-fenwick-trees',
      '168-hash-table-collision-resolution',
      '169-bloom-filters',
      '170-skip-lists',
      '171-generics-templates',
      '172-type-inference',
      '173-reflection',
      '174-metaprogramming',
      '175-code-generation',
      '176-annotations-attributes',
      '177-memory-mapped-files',
      '178-weak-references',
      '179-event-driven-programming',
      '180-reactive-programming',
      '181-algorithm-complexity-analysis',
      '182-profiling-and-benchmarking',
      '183-memory-optimization',
      '184-cpu-cache-optimization',
      '185-compiler-optimizations',
      '186-lazy-evaluation',
      '187-memoization',
      '188-tail-recursion-optimization',
      '189-system-calls',
      '190-process-management',
      '191-inter-process-communication',
      '192-signals-and-event-handling',
      '193-memory-mapping',
      '194-file-system-operations',
      '195-network-programming-sockets',
      '196-protocol-implementation',
      '197-event-sourcing',
      '198-cqrs-command-query-responsibility-segregation',
      '199-microservices-patterns',
      '200-distributed-systems-patterns',
    ];

    console.log(`Successfully loaded ${questions.length} questions`);
    return questions;
  } catch (error) {
    console.error('Error getting available questions:', error);
    throw new Error(
      `Failed to load available questions: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
