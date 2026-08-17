# Contrat de migration

## Comportement conservé

L'application affiche les montures Final Fantasy XIV fournies par XIVAPI, puis
propose une recherche immédiate par nom et un filtre par extension. La liste
reste dans l'ordre retourné par l'API.

## Frontière externe actuelle

La version existante appelle une API publique sans authentification :

```text
GET https://xivapi.com/mount
  ?limit=3000
  &Columns=ID,Name_fr,Description_fr,GamePatch.ExName,GamePatch.Version,Icon
```

La réponse est une enveloppe contenant `Results`. Un résultat est affichable
seulement si `ID`, `Name_fr`, `Description_fr` et `Icon` sont présents. Les
icônes sont des chemins relatifs à l'origine `https://xivapi.com`.

La réponse de l'API est une entrée non fiable : elle est validée et normalisée
dans l'adaptateur de données, sans jamais être exposée aux composants UI.

## Règles de filtrage

- La recherche cible `Name_fr`, est insensible à la casse et utilise une
  correspondance partielle.
- La valeur `all` signifie qu'aucune extension n'est filtrée.
- Les extensions exposées initialement sont : `A Realm Reborn`,
  `Heavensward`, `Stormblood`, `Shadowbringers` et `Endwalker`.

## Décisions de migration

- Le contrat XIVAPI v1 est conservé pour assurer la parité fonctionnelle.
- Les identifiants et URLs de l'API sont publics ; aucun secret ne doit être
  ajouté aux environnements du client.
- Une migration ultérieure vers XIVAPI v2 reste possible derrière
`MountRepository`.

## TODO — évolution XIVAPI v2

XIVAPI v2 ne maintient pas la compatibilité du schéma v1. Avant toute bascule,
caractériser son endpoint `Mount`, la pagination, les champs français et la
construction des URLs d'icône, puis remplacer uniquement l'implémentation du
gateway et ses tests de contrat.
