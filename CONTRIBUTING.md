# Prerequisite

1. Node.js 24: https://nodejs.org/en/download/
2. Enable pnpm through Corepack: `corepack enable`

# Building

1. Install the dependencies: `pnpm install --frozen-lockfile`
2. Build and run the project: `pnpm run build`

# Principles

1. Desing for extensivbility and **maintainability**
2. Make the code easy to understand and extend for people that are **familiar with Java**
3. Aim for **immutable** objects (https://immutable-js.github.io/immutable-js/)
4. Design for **testablity** and apply **test-driven development**
5. Aim for high **line, branch, and function coverage**. Run `pnpm test` before submitting a change; see `TESTING.md` for focused commands.
