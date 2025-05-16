# Sequence Marketplace Boilerplate

A boilerplate for building marketplaces with Sequence.

## Setup

1. Set up a white-label marketplace in [Sequence Builder](https://sequence.build/) following the [Sequence Marketplace documentation](https://docs.sequence.xyz/solutions/marketplaces/white-label-marketplace).

2. Create an `.env` file by copying the example file:

```sh
pnpm env-file
```

3. Configure the following environment variables in your `.env` file:

```sh
# API key from Builder > Settings > API keys
# https://sequence.build/project/{PROJECT_ID}/settings/apikeys
NEXT_PUBLIC_ACCESS_KEY=""

# Project ID from Builder, found in the URL of the project
# e.g. https://sequence.build/project/{PROJECT_ID}
NEXT_PUBLIC_PROJECT_ID=""

# Optional WalletConnect project id, for integration with WalletConnect
NEXT_PUBLIC_WALLETCONNECT_ID=""
```

## Installation

Install dependencies:

```sh
pnpm install
```

## Development

Run the development server:

```sh
pnpm dev
```

The application will be available at [http://localhost:4444](http://localhost:4444)

## Production

Build the application:

```sh
pnpm build
```

Start the production server:

```sh
pnpm start
```
