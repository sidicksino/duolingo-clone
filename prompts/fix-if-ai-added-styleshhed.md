The AGENTS.md file specifies: use NativeWind `className` for Text, Image, View, and other standard components. Only use StyleSheet imports or inline styles for React Native-specific components where NativeWind class names don't work (for example, SafeAreaView from react-native-safe-area-context). Fix the onboarding screen accordingly.

## VS Code warning:

Open the VS Code Problems panel (Ctrl+Shift+M / Cmd+Shift+M) or review yellow/red highlights in the editor. For each warning or error:

1. Read the message to understand the issue
2. Run the project's linter/formatter: `npm run lint`
3. Fix the code or configuration as suggested
4. Re-run TypeScript type checking, ESLint, and build to confirm resolution:
   - `npm run typecheck`
   - `npm run lint`
   - `npx expo start`

Ensure all warnings/errors are resolved before committing code.
