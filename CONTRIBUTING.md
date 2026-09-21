# Contributing

Anyone may open issues and pull requests. Editors review contributions and merge pull requests.

## Licence grant

A pull request may only be merged once the contributor has agreed to the project licences:

- Code is licensed under MIT.
- Project content is licensed under CC BY 4.0.

Quoted EN 301 549 clause text is a separate field and is not covered by those licences.

Agree to the licences using the checkbox on the pull request template. There is no CLA bot.

## Code of conduct

Participation is covered by the [Code of Conduct](CODE_OF_CONDUCT.md).

## AI-assisted work

AI-assisted work is permitted. It must be disclosed on the contribution using the checkbox on the pull request template.

## Formatting

Run `npm run format` before you open a pull request; CI checks it with `npm run format:check`.

## Governance

Who the editors are and how decisions are made is in [GOVERNANCE.md](GOVERNANCE.md).

## Automated checks

CI builds the site, then runs axe-core (WCAG 2.2 AA) and a link check against the built HTML. Run them locally with `npm run build`, `npm run check:a11y`, and `npm run check:links`.
