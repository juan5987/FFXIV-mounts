# Architecture

## Principes

L'application est une SPA Angular standalone, zoneless et strictement typée.
Le code est organisé par responsabilité et non par type de fichier global :

```text
core/config        configuration injectée de l'application
features/mounts    domaine, accès aux données, état, page et composants UI
```

Les dépendances vont vers le domaine : l'UI dépend du store, le store dépend du
port `MountsGateway`, et seul `data-access` connaît XIVAPI. Un composant ne
fait jamais d'appel HTTP et ne manipule jamais le DTO externe.

## Configuration et sécurité

Les fichiers d'environnement ne contiennent que l'origine publique de XIVAPI.
Ils ne sont pas un emplacement pour des secrets : tout secret doit rester côté
serveur. Les fichiers `.env*` locaux sont ignorés par Git à l'exception d'un
éventuel `.env.example` sans valeur sensible.

## État

`MountCatalogStore` est fourni au niveau de la route lazy. Il conserve les
données source et les filtres ; le résultat affiché est un `computed` dérivé,
ce qui interdit l'état dupliqué et les désynchronisations.

## Qualité

Le dépôt impose TypeScript strict, diagnostics Angular étendus, ESLint,
Vitest et Playwright. La CI n'utilise que `npm ci`, ne dépend jamais de XIVAPI
pour les tests et vérifie les dépendances de production.

## TODO — maintenance planifiée

- Passer à Angular 22 quand l'environnement de développement et la CI seront
  sur Node 22.22 ou plus récent ; Angular 22 n'est pas compatible avec le
  Node 20.20 actuellement utilisé par ce projet.
- Étudier la migration XIVAPI v2 derrière `MountsGateway` après avoir figé un
  nouveau contrat de réponse et d'assets.
