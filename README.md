# Gábor Kriskó website

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

Configure the `GITHUB_TOKEN` environmental variable to a valid github token

## Development Server

Start the development server on http://localhost:3000

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

## Serverless
To deploy to serverless platforms the contents of the '/public' directory have to be included with the serverless functions
