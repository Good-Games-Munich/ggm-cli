[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT HEADER -->
<br />
<p align="center">
  <!-- https://github.com/stefanjudis/github-light-dark-image-example -->
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.github.com/Good-Games-Munich/assets/main/logos/GGM_logo_white.png">
    <img alt="Logo" src="https://raw.github.com/Good-Games-Munich/assets/main/logos/GGM_logo_black.png" height="150">
  </picture>

  <h3 align="center">⌨️ GGM-CLI</h3>

  <p align="center">
    ·
    <a href="https://github.com/Good-Games-Munich/ggm-cli/issues">Report Bug</a>
    ·
    <a href="https://github.com/Good-Games-Munich/ggm-cli/issues">Request Feature</a>
    ·
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About The Project

A CLI to help organize Good Games Munich.

## Usage

Fow now I do not implement that this automatically compiles down to a binary. So you need to run it via bun.

### Prerequisites

- [Bun](https://bun.sh/)

### Send SEPA-References to members

```bash
MAIL_PASSWORD='password' bun run src/ggm.ts mail sepaRef members.csv --paymentStartDate 2024-04-19
```

Help:

```bash
bun run src/ggm.ts mail sepaRef --help
```

#### CSV-File

The CSV-File should have the following columns:

- `email`
- `name`
- `iban`
- `sepaRef`
- `amount`


## TODO

- [ ] Make it association agnostic
- [ ] Offer compiled binaries

<!-- CONTRIBUTING -->

## Contributing

Follow [contributing](https://github.com/Good-Games-Munich/.github/wiki/workflows#contributing).

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Good-Games-Munich/ggm-cli.svg?style=flat-square
[contributors-url]: https://github.com/Good-Games-Munich/ggm-cli/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Good-Games-Munich/ggm-cli.svg?style=flat-square
[forks-url]: https://github.com/Good-Games-Munich/ggm-cli/network/members
[stars-shield]: https://img.shields.io/github/stars/Good-Games-Munich/ggm-cli.svg?style=flat-square
[stars-url]: https://github.com/Good-Games-Munich/ggm-cli/stargazers
[issues-shield]: https://img.shields.io/github/issues/Good-Games-Munich/ggm-cli.svg?style=flat-square
[issues-url]: https://github.com/Good-Games-Munich/ggm-cli/issues
