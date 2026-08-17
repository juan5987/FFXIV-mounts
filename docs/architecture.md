# Architecture

## Principes

L'application est une SPA Angular standalone, zoneless et strictement typée.
Ses couches sont explicites et leurs dépendances vont vers le domaine :

```text
domain/mounts             modèles, règles pures et port `MountRepository`
application/mounts        façade de cas d'usage et état du catalogue
infrastructure/           configuration et adaptateur HTTP XIVAPI
presentation/mounts       pages et composants Angular
```

La présentation dépend de l'application et du domaine. L'application dépend
uniquement du domaine. L'infrastructure implémente le port du domaine et ne
dépend jamais de la présentation ou de l'application. Seuls `app.config.ts` et
`app.routes.ts` sont des composition roots autorisés à relier les couches.

Un composant ne fait jamais d'appel HTTP, ne manipule jamais le DTO externe et
ne contient aucune règle métier. `MountCatalogFacade` reçoit les intentions de
l'UI et orchestre le chargement, le retry et les filtres.

## Configuration et sécurité

Les fichiers d'environnement ne contiennent que l'origine publique de XIVAPI.
Ils ne sont pas un emplacement pour des secrets : tout secret doit rester côté
serveur. Les fichiers `.env*` locaux sont ignorés par Git à l'exception d'un
éventuel `.env.example` sans valeur sensible.

## État

`MountCatalogFacade` conserve les données source et les filtres ; le résultat
affiché est un `computed` dérivé, ce qui interdit l'état dupliqué et les
désynchronisations. `filterMounts` reste une règle pure du domaine.

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
