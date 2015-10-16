# servicify-cli

Servicify cli tool.

## Installation

```bash
npm install -g servicify-cli
```

## Usage

Usage: servicify COMMAND [options]

### LISTEN

```bash
servicify listen [--driver pigato] [--host 0.0.0.0] [--port 2020]
```

### OFFER

```bash
servicify offer PKGNAME [--host 127.0.0.1] [--port 2020]
```

If the package cannot be resolved locally, servicify will try in the globally installed packages.