# Architecture

## Principes

L'application est une SPA Angular standalone, zoneless et strictement typée.
Ses couches sont explicites et leurs dépendances vont vers le domaine :

```text
domain/mounts             modèles, invariants, règles pures et port `MountRepository`
application/mounts        cas d'usage TypeScript purs
infrastructure/           configuration, adaptateur HTTP et contrôle des URLs XIVAPI
presentation/mounts       presenter Angular, view-models, pages et composants
```

La présentation dépend de l'application et du domaine. L'application dépend
uniquement du domaine. L'infrastructure implémente le port du domaine et ne
dépend jamais de la présentation ou de l'application. Seuls `app.config.ts` et
`app.routes.ts` sont des composition roots autorisés à relier les couches.

Un composant ne fait jamais d'appel HTTP, ne manipule jamais le DTO externe et
ne contient aucune règle métier. `MountCatalogPresenter` reçoit les intentions
de l'UI, appelle le cas d'usage pur et expose un unique view-model de lecture.

## Configuration et sécurité

Les fichiers d'environnement ne contiennent que la configuration publique de
XIVAPI et l'allowlist exacte des origines d'images HTTPS autorisées.
Ils ne sont pas un emplacement pour des secrets : tout secret doit rester côté
serveur. Les fichiers `.env*` locaux sont ignorés par Git à l'exception d'un
éventuel `.env.example` sans valeur sensible.

## État

`LoadMountCatalogUseCase` ne conserve aucun état et ne dépend pas d'Angular.
`MountCatalogPresenter` détient uniquement l'état d'écran et projette un
`MountCatalogViewModel` dérivé. `filterMounts` reste une règle pure du domaine.

## Qualité

Le dépôt impose TypeScript strict, diagnostics Angular étendus, ESLint,
Vitest et Playwright. La CI n'utilise que `npm ci`, ne dépend jamais de XIVAPI
pour les tests et vérifie les dépendances de production.

## TODO — maintenance planifiée

- Passer à Angular 22 quand l'environnement de développement et la CI seront
  sur Node 22.22 ou plus récent ; Angular 22 n'est pas compatible avec le
  Node 20.20 actuellement utilisé par ce projet.
- Étudier la migration XIVAPI v2 derrière `MountRepository` après avoir figé un
  nouveau contrat de réponse et d'assets.
