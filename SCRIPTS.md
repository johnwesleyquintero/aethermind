# Development Scripts Guide

## Essential Commands

| Command          | Description                                       |
| ---------------- | ------------------------------------------------- |
| `npm run dev`    | Start development server at http://localhost:3000 |
| `npm run build`  | Build production-ready application                |
| `npm install`    | Install project dependencies                      |
| `npm run format` | Format all code files                             |

## Cleanup Commands

| Command                                                                                                          | Description                         |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `npm run cleanup`                                                                                                | Basic cleanup and reinstall         |
| `npm run cleanup:admin`                                                                                          | Force cleanup with admin privileges |
| `npm run reset`                                                                                                  | Remove dependencies and reinstall   |
| `Start-Process powershell -Verb RunAs -ArgumentList "-Command Remove-Item -Path 'node_modules' -Recurse -Force"` | Force remove node_modules as admin  |

## Build & Deploy

| Command           | Description                 |
| ----------------- | --------------------------- |
| `npm run build`   | Build for production        |
| `npm run preview` | Preview production build    |
| `vercel`          | Deploy to Vercel preview    |
| `vercel --prod`   | Deploy to Vercel production |

## Code Quality

| Command             | Description                 |
| ------------------- | --------------------------- |
| `npm run lint`      | Check and fix code style    |
| `npm run typecheck` | Run TypeScript checks       |
| `npm run format`    | Format code with Prettier   |
| `npm run validate`  | Run all code quality checks |

## Windows PowerShell Setup

| Command                                               | Description              |
| ----------------------------------------------------- | ------------------------ |
| `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` | Allow script execution   |
| `Get-ExecutionPolicy -List`                           | Check execution policies |

## Environment Setup

| Command                        | Description              |
| ------------------------------ | ------------------------ |
| `copy .env.example .env.local` | Create local env file    |
| `code .env.local`              | Open env file in VS Code |

## Common Issues & Fixes

### Node Modules Locked

```powershell
# Run as Administrator
Start-Process powershell -Verb RunAs -ArgumentList "-Command Remove-Item -Path 'node_modules' -Recurse -Force"
npm cache clean --force
npm install
```

### TypeScript Issues

```bash
npm run typecheck
npm install @types/react @types/react-dom --save-dev
```

### Cache Issues

```bash
npm cache clean --force
npm cache verify
npm install
```

## Git Workflow

| Command                                | Description           |
| -------------------------------------- | --------------------- |
| `git checkout -b feature/name`         | Create feature branch |
| `git add . && git commit -m "message"` | Stage and commit      |
| `git push origin HEAD`                 | Push current branch   |

## Pro Tips

- Use `npm run cleanup:admin` for stubborn locked files
- Run `npm run validate` before committing
- Use VS Code terminal for better PowerShell integration
- Keep `.env.local` updated with required API keys
