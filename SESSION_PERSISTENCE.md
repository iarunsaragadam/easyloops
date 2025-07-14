# Session Persistence Implementation

## Overview

The EasyLoops platform now automatically persists user's current session code for each question and language combination using localStorage. This ensures that users don't lose their work when switching between questions, languages, or refreshing the page.

## How It Works

### 1. **SessionPersistenceService** (`src/shared/services/sessionPersistenceService.ts`)

A dedicated service that handles all localStorage operations for session persistence:

- **`saveCode(questionId, language, code)`** - Saves code for a specific question-language combination
- **`loadCode(questionId, language)`** - Loads saved code for a specific question-language combination
- **`clearQuestionSession(questionId)`** - Clears all sessions for a specific question
- **`loadAllSessions()`** - Loads all saved sessions
- **`getQuestionIdsWithSessions()`** - Gets all question IDs that have saved sessions

### 2. **Redux Integration** (`src/store/slices/appSlice.ts`)

The app slice integrates with the SessionPersistenceService to automatically:

- **Save code** whenever the user types (via `setPythonCode`, `setGoCode`, `setCodeForLanguage`)
- **Save current session** before switching questions or languages
- **Load saved session** when switching to a question or language
- **Preserve saved sessions** over code stubs when loading questions

### 3. **Storage Structure**

```json
{
  "easyloops_session_code": {
    "01-variable-declaration": {
      "python": "print('Hello World')",
      "go": "fmt.Println('Hello World')"
    },
    "02-data-types": {
      "python": "x = 42\ny = 'hello'",
      "go": "var x int = 42\nvar y string = 'hello'"
    }
  }
}
```

## Key Features

### **Automatic Persistence**

- Code is automatically saved as the user types
- No manual save required
- Works across all supported languages

### **Question-Specific Sessions**

- Each question maintains its own session
- Users can work on multiple questions simultaneously
- Sessions are preserved when switching between questions

### **Language-Specific Sessions**

- Each language maintains its own session per question
- Switching languages preserves code in both languages
- Users can work in multiple languages for the same question

### **Smart Code Stub Loading**

- Saved sessions take precedence over code stubs
- Code stubs are only loaded when no saved session exists
- Prevents accidental overwriting of user's work

### **Error Handling**

- Graceful handling of localStorage errors
- Fallback to default behavior if persistence fails
- No impact on core functionality

## Usage Examples

### **Automatic Session Management**

```typescript
// User types code - automatically saved
dispatch(setPythonCode('print("Hello World")'));

// User switches questions - current session saved, new session loaded
dispatch(setSelectedQuestionId('02-data-types'));

// User switches languages - current session saved, new session loaded
dispatch(setSelectedLanguage('go'));
```

### **Manual Session Management**

```typescript
// Clear session for a specific question
dispatch(clearSessionForQuestion('01-variable-declaration'));

// Load session for a specific question and language
dispatch(
  loadSessionForQuestion({
    questionId: '01-variable-declaration',
    language: 'python',
  })
);
```

## Benefits

1. **No Data Loss** - Users never lose their work due to page refresh or navigation
2. **Seamless Experience** - Sessions are automatically managed without user intervention
3. **Multi-Question Workflow** - Users can work on multiple questions simultaneously
4. **Multi-Language Support** - Each language maintains its own session per question
5. **Performance** - Minimal impact on performance with efficient localStorage usage
6. **Reliability** - Robust error handling ensures core functionality is never affected

## Technical Implementation

### **Redux Actions**

- `setPythonCode`, `setGoCode`, `setCodeForLanguage` - Automatically save to localStorage
- `setSelectedQuestionId` - Save current session, load new session
- `setSelectedLanguage` - Save current session, load new session
- `clearSessionForQuestion` - Clear specific question sessions
- `loadSessionForQuestion` - Manually load specific sessions

### **Storage Limits**

- No artificial limits on session storage
- Relies on browser's localStorage limits (~5-10MB)
- Efficient JSON storage with minimal overhead

### **Browser Compatibility**

- Works in all modern browsers that support localStorage
- Graceful degradation for older browsers
- No external dependencies

## Future Enhancements

1. **Session Expiration** - Automatic cleanup of old sessions
2. **Session Export/Import** - Allow users to backup/restore sessions
3. **Cloud Sync** - Sync sessions across devices (requires backend)
4. **Session History** - Track changes over time
5. **Storage Analytics** - Monitor storage usage and optimize
