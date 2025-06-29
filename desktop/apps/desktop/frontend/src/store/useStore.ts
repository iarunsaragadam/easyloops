import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CodeStorage {
  [problemId: string]: {
    [language: string]: string
  }
}

interface StoreState {
  solvedProblems: Set<string>
  codeStorage: CodeStorage
  
  // Actions
  addSolvedProblem: (problemId: string) => void
  removeSolvedProblem: (problemId: string) => void
  saveCodeForProblem: (problemId: string, language: string, code: string) => void
  getCodeForProblem: (problemId: string, language: string) => string | null
  clearCodeForProblem: (problemId: string, language?: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      solvedProblems: new Set<string>(),
      codeStorage: {},

      addSolvedProblem: (problemId: string) => {
        set(state => ({
          solvedProblems: new Set([...Array.from(state.solvedProblems), problemId])
        }))
      },

      removeSolvedProblem: (problemId: string) => {
        set(state => {
          const newSolved = new Set(state.solvedProblems)
          newSolved.delete(problemId)
          return { solvedProblems: newSolved }
        })
      },

      saveCodeForProblem: (problemId: string, language: string, code: string) => {
        set(state => ({
          codeStorage: {
            ...state.codeStorage,
            [problemId]: {
              ...state.codeStorage[problemId],
              [language]: code
            }
          }
        }))
      },

      getCodeForProblem: (problemId: string, language: string) => {
        const state = get()
        return state.codeStorage[problemId]?.[language] || null
      },

      clearCodeForProblem: (problemId: string, language?: string) => {
        set(state => {
          if (language) {
            // Clear specific language
            const updatedProblem = { ...state.codeStorage[problemId] }
            delete updatedProblem[language]
            return {
              codeStorage: {
                ...state.codeStorage,
                [problemId]: updatedProblem
              }
            }
          } else {
            // Clear all languages for this problem
            const updatedStorage = { ...state.codeStorage }
            delete updatedStorage[problemId]
            return { codeStorage: updatedStorage }
          }
        })
      }
    }),
    {
      name: 'codequest-storage',
      serialize: (state) => {
        return JSON.stringify({
          ...state.state,
          solvedProblems: Array.from(state.state.solvedProblems)
        })
      },
      deserialize: (str) => {
        const parsed = JSON.parse(str)
        return {
          state: {
            ...parsed,
            solvedProblems: new Set(parsed.solvedProblems || [])
          },
          version: parsed.version
        }
      }
    }
  )
)