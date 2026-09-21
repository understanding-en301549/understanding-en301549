# Understanding EN 301 549

Understanding EN 301 549 is a community project writing plain-language explanations of the accessibility requirements in EN 301 549 that WCAG, the W3C web accessibility standard, does not cover: what each requirement is trying to achieve, and what it means in practice.

## Why this exists

EN 301 549 is the accessibility standard used across Europe for ICT products and services — websites, software, hardware, documents, and the support around them. It is the standard behind the EU Web Accessibility Directive, and it turns up routinely in public procurement.

Large parts of it are WCAG. The chapters covering web content, non-web documents and software are built directly on the WCAG success criteria, which EN 301 549 adopts rather than rewrites. For those requirements, help already exists: the W3C, which publishes WCAG, also publishes a companion series called Understanding WCAG — one page per success criterion, setting out its intent, how it applies, and where the hard edges are. When two auditors disagree about a WCAG criterion, that series is usually what settles the argument.

The rest of EN 301 549 has no equivalent. The functional performance statements, the generic requirements, closed functionality, hardware, two-way voice communication, video, documentation and support services — all of it gets audited, and none of it has a published account of what the requirements are for. So the intent lives in people's heads. Two competent auditors can read the same clause, look at the same product, reach opposite conclusions, and have nothing to point at to resolve it. Vendors get conflicting findings from different auditors, and procurement gets answers it cannot compare.

This project writes that missing layer down. Where WCAG already covers a requirement, we link to the W3C's work instead of duplicating it. Our job is the gaps.

## Who this is for

Accessibility auditors and testers, first and foremost — the people who have to decide whether a product meets a requirement and then defend that decision.

The documents explain requirements. They are not test procedures, and they do not define pass or fail criteria. That makes them useful to a wider group too: developers and designers trying to understand what is being asked of them, and procurement staff reading accessibility claims they need to assess.

## What a document covers

Take clause 5.2, on activating accessibility features. Paraphrased: where a product has accessibility features, it must be possible to switch those features on without needing the ability that the feature exists to compensate for. A blind user should not have to see the screen in order to turn on speech output.

Put that way it sounds obvious, but in an audit the questions come quickly. Does a setting buried several menus deep count? What about a device that can only be configured through a companion app on a phone? Is a printed quick-start guide enough? Does a feature the product ships with but does not document fall in scope at all?

An Understanding document for that clause would set out what the requirement is protecting, which of those situations meet it and which do not, and the reasoning behind each answer — so that two people working separately arrive at the same place.

## Unofficial status

These documents are unofficial. They have no standing with ETSI, CEN, or CENELEC, and this project is not an ETSI, CEN, or CENELEC publication. Editors take part in a personal capacity, not on behalf of their employers.

Nothing here changes what EN 301 549 requires; only the standard itself does that. The aim is for these documents to be trusted and cited because the reasoning in them holds up — which is a different thing from being official, and every page will say so.

## Status

Early. No Understanding documents have been published yet.

What exists today is the groundwork: this repository and its licensing. The site, the document template, and the first documents are all still ahead.

## How to contribute

Anyone can contribute — you do not have to be an editor. Right now the most valuable contributions are issues: requirements you have seen interpreted in conflicting ways, disagreements you have had to argue out in real audits, or an offer to draft a document.

Open an issue or a pull request on this repository. Two things always apply: contributions are accepted under the project licences below, and AI-assisted work is welcome but must be disclosed on the contribution. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Project details

- **Language** — English only. Translations are not planned.
- **Site** — The public site address will be added here when it is known.
- **Made possible by** — Organisation names will be listed here in text once they are confirmed. This project does not use organisation logos.
- **Licence** — Code is under the MIT License, see [LICENSE-CODE](LICENSE-CODE). Project content is under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), see [LICENSE-CONTENT](LICENSE-CONTENT). Requirement text quoted from EN 301 549 is © ETSI, CEN and CENELEC and is **not** covered by those licences, see [LICENSE](LICENSE).
- **For coding agents** — Read [AGENTS.md](AGENTS.md) before making changes.
