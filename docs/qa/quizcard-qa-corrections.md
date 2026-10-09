# QuizCard QA corrections

Date: 2026-10-09 (Asia/Calcutta)
Branch: `fix/quizcard-qa`, based on the completed local integration at `0a243f9`.
Recommendation: Ready for Lead Review, subject to the manual checks below.

## Corrections

- ValidationError, IncorrectFeedback, and CorrectFeedback now use an interactive parent-controlled assessment example rather than fixed messages.
- Submit without selection displays exactly "Select an answer to continue." immediately after the options, focuses the first enabled option, and associates the alert with the fieldset and radios. Selection clears the message immediately. No error is displayed initially.
- Added optional `answerStatus` presentation prop, preserving existing props and the controlled selection API. Selected incorrect/correct options receive semantic danger/success borders and visible text labels; feedback uses the same tokens. Results remain readable while answer controls are locked.
- Incorrect response displays "Incorrect answer. Try again." and a Retry button. Selection is retained during feedback and after Retry; Retry returns focus to that selection and lets the learner change it. No explanation or correct-option indication appears after an incorrect response.
- The demo parent allows explanation only after a correct response, displays "Correct answer.", and disables the finalized action. Pending responses disable options/actions and use a synchronous guard against duplicate submission.
- Assessment response simulation exists only in the story. QuizCard never scores answers or receives a hidden correct-answer ID. Production parents retain responsibility for submission, allowed retries, finalization, and whether explanations may be supplied.

## Validation

- `npx --no-install tsc --noEmit -p packages/ui/tsconfig.json`: passed on final source.
- `npm run build-storybook --workspace=@edtech/ui`: passed on final source with approved subprocess access; existing bundle-size warning remains.
- `node scripts/qa-ramesh-components.cjs`: passed 204 checks, covering 37 component stories at 320/375/768/1024/1440px, interactions, six themes, and 123 other rendered stories.
- `node --check scripts/qa-ramesh-components.cjs` and `git diff --check`: passed.
- First browser run failed due to a scoped test query searching for Storybook's root inside itself. Corrected the test query and reran. This was a harness failure, not a passing run.
- Inspected rendered 320px screenshots of validation, incorrect feedback, and correct feedback. Error placement, focus outline, selected-result borders/text, Retry, success explanation, and finalized action are visible without horizontal overflow. Images/logs remain ignored local build artifacts.

The updated harness checks no initial error, empty submission, error clearance, pending lock, incorrect-answer retention/highlight, Retry and another selection, correct finalization, gated explanation, and real Space/Enter keyboard interaction. Existing tests still cover disabled states, native arrow selection, long content, and all five requested viewport widths.

## Limitations and scope

The existing repository has no configured unit runner or Storybook interaction runner; browser interactions use its existing Chrome/CDP harness. ESLint remains unavailable as documented in the integration report. Screen-reader announcement behavior, cross-browser behavior, and actual assessment-service rules require manual/integration verification. No unrelated components or dependencies were changed.

Changed files: QuizCard.tsx, QuizCard.stories.tsx, scripts/qa-ramesh-components.cjs, and this report. Existing integrated component work is preserved. Nothing was pushed, merged into main, or submitted as a PR.

Local commit: obtain with `git log -1 --format=%H -- docs/qa/quizcard-qa-corrections.md`; the chat handoff includes its hash.
