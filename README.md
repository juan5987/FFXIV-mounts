# Mount XIV

Catalogue français des montures de Final Fantasy XIV, publié sur GitHub Pages :
<https://juan5987.github.io/FFXIV-mounts/#/>.

## Socle technique

- Angular 21 standalone, zoneless et TypeScript strict
- Cas d'usage TypeScript pur, presenter Angular et view-model de présentation
- Port métier `MountRepository`, adaptateur HTTP typé et URLs XIVAPI contrôlées
- Sass, ESLint, Vitest et Playwright

L'architecture et les règles de dépendance sont documentées dans
[docs/architecture.md](docs/architecture.md). Le contrat préservé pendant la
migration est disponible dans [docs/modernization-contract.md](docs/modernization-contract.md).

## Démarrage

Prérequis : Node.js 20.19+ (Node 20.20.2 est la version actuellement validée).

```bash
npm ci
npm start
```

Ouvrir ensuite <http://localhost:4200/#/>.

## Qualité

```bash
npm run lint
npm run test
npm run build
npm run e2e:install
npm run e2e
```

Les tests E2E interceptent XIVAPI avec une fixture locale et n'utilisent donc
pas le réseau pour valider le catalogue.

## Déploiement

```bash
npm run deploy
```

`predeploy` produit un build avec le `base-href` GitHub Pages. Aucun secret
doit être mis dans l'application cliente : les fichiers `.env*` locaux sont
ignorés par Git, à l'exception d'un éventuel `.env.example` sans valeur sensible.
