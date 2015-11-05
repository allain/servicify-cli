# servicify-cli

[![Build Status](https://travis-ci.org/allain/servicify-cli.svg)](https://travis-ci.org/allain/servicify-cli)
[![npm](https://img.shields.io/npm/v/servicify-cli.svg)]()
[![npm](https://img.shields.io/npm/l/servicify-cli.svg)]()

Servicify cli tool.

## Installation

```bash
npm install -g servicify-cli
```

## Usage

Usage: servicify COMMAND [options]

### LISTEN

```bash
servicify listen [--driver http] [--host 0.0.0.0] [--port 2020]
```

Starts a servicify registry making it possible for services to be found by clients wishing to consume them.
 

### OFFER

```bash
servicify offer PKGNAME [--driver http] [--host 127.0.0.1] [--port 2020]
```

If the package cannot be resolved using the normal npm package resolution strategy, servicify searches for it in the globally installed packages.

![Servicify All The Things!](http://cdn.meme.am/instances/500x/40263771.jpg)