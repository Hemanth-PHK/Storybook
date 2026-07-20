// Tell TypeScript that side-effect CSS imports are valid modules.
// Vite handles the actual bundling; this just satisfies the type checker.
declare module "*.css";
