# Préparation à l'oral : veille technologique et portfolio

> Document de travail **personnel**, à ne pas mettre en ligne (il est hors du dossier `src/` déployé sur Vercel).
> Objectif : savoir **présenter**, **expliquer** et surtout **te défendre** face aux questions du jury.

---

## 1. Ton fil rouge (à retenir par cœur)

> « L'IA n'est pas une seule technologie : ce sont des IA spécialisées. Je m'intéresse à celles qui changent le métier de technicien systèmes et réseaux. L'innovation la plus récente, ce sont les agents IA reliés aux outils grâce au MCP. Je l'ai testée moi-même, et ma conclusion, c'est qu'il faut maîtriser les bases encore mieux qu'avant. C'est pour ça que j'ai décidé de rattraper mon retard en réseau. »

Tout ton oral doit revenir à cette idée. Si tu te perds, reviens-y.

---

## 2. Plan de présentation (environ 10 minutes)

| Temps | Partie | Ce que tu dis | Ce que tu montres |
|---|---|---|---|
| 0:00 | Accroche | « Quand on dit "l'IA", on pense à ChatGPT. Mais l'IA qui détecte un ransomware n'a rien à voir avec ChatGPT. » | Titre de la section Veille |
| 0:45 | Présentation | Nom, BTS SIO SISR, recherche d'alternance, 1 phrase par projet | Hero + Projets |
| 2:00 | Bilan honnête | Ton retard en réseau, ta prise de conscience, ce que tu fais | Carte « Bilan personnel » |
| 3:00 | Problématique | La lire telle quelle | Encadré Problématique |
| 3:30 | Les 5 spécialisations | 30 s chacune : définition, 1 outil réel, 1 usage, 1 limite | Les onglets |
| 6:00 | Méthodologie | Le cycle en 5 étapes, les sources, la grille de vérification | Section Méthode |
| 7:30 | Innovation | MCP : USB-C de l'IA, schéma, chronologie, **ton cas vécu** | Section Innovation |
| 9:00 | Risques et avis | 3 risques et leurs parades, puis ton avis | Fin de la section |
| 9:45 | Conclusion | Reprendre le fil rouge | Contact |

---

## 3. Expression orale : règles simples

1. **Ne lis pas l'écran.** L'écran est un support. Regarde le jury, jette un coup d'œil à l'écran seulement pour te repérer.
2. **Phrases courtes.** Sujet, verbe, complément. Si tu te perds au milieu d'une phrase, arrête-la et recommence plus simplement.
3. **Annonce ce que tu vas dire** : « Je vais vous présenter 5 spécialisations. La première… ». Le jury suit mieux, et toi aussi.
4. **Un exemple concret par idée.** Une idée sans exemple paraît récitée ; avec un exemple, elle paraît maîtrisée.
5. **Ralentis.** Le stress fait parler vite. Marque une pause d'1 seconde après chaque idée importante.
6. **Évite les tics** : « du coup », « en fait », « genre », « voilà ». Remplace-les par un silence.
7. **Explique le jargon** dès que tu l'utilises : « un LLM, c'est-à-dire un modèle de langage comme ChatGPT ».
8. **Entraîne-toi à voix haute au moins 3 fois**, dont une en te chronométrant et une en t'enregistrant avec ton téléphone.

---

## 4. Se défendre face aux questions : la méthode

Pour **chaque** question, applique ces 4 étapes :

1. **Reformuler** : « Si je comprends bien, vous me demandez… » (ça te laisse 3 secondes pour réfléchir).
2. **Répondre directement** en 1 phrase.
3. **Illustrer** avec un exemple concret (un outil réel, ton projet, ton cas vécu).
4. **Conclure** en reliant à ta problématique ou au métier SISR.

**Si tu ne sais pas** : ne jamais inventer. Dis :
> « Je ne connais pas précisément ce point. Ce que je sais, c'est [ce qui s'en rapproche]. Je vérifierais dans [source fiable] pour être sûr. »

Le jury valorise l'honnêteté et la méthode, pas le fait de tout savoir.

**Si on te met en difficulté sur une critique** (« tes sources ne sont pas fiables », « tu n'as pas travaillé le réseau ») : **accepte la critique, puis montre ce que tu en fais**.
> « Vous avez raison, c'est une limite. C'est justement pour ça que j'ai [mis en place / fait]… »

---

## 5. Questions probables et réponses

### Sur les spécialisations de l'IA (la remarque qu'on t'a faite)

**« Tu dis que l'IA a des spécialisations. Qu'est-ce que tu veux dire concrètement ? »**
> Une IA, c'est un modèle entraîné sur un type de données pour une tâche précise. Un EDR comme CrowdStrike Falcon est entraîné à reconnaître des comportements malveillants sur un poste. ChatGPT est entraîné sur du texte pour produire du texte. Ils ne font pas du tout la même chose. Toutes les IA actuelles sont « faibles », c'est-à-dire spécialisées : l'IA générale, capable de tout faire comme un humain, n'existe pas. Pour un technicien SISR, j'en retiens cinq : générative, cybersécurité, AIOps, IA réseau et agents.

**« Quelle différence entre IA, machine learning et deep learning ? »**
> Ce sont des cercles emboîtés. L'IA, c'est le domaine entier. Le machine learning, c'est quand la machine apprend à partir d'exemples au lieu qu'on lui programme les règles. Le deep learning, c'est du machine learning avec des réseaux de neurones à plusieurs couches. Et l'IA générative, comme ChatGPT, c'est du deep learning entraîné à produire du contenu.

**« C'est quoi un LLM ? »**
> Un Large Language Model, un grand modèle de langage. Il a été entraîné sur énormément de texte et il prédit le mot suivant le plus probable. C'est pour ça qu'il peut se tromper avec assurance : il produit ce qui est *probable*, pas forcément ce qui est *vrai*. On appelle ça une hallucination.

**« C'est quoi l'AIOps ? »**
> C'est l'IA appliquée à l'exploitation informatique. Au lieu de seuils fixes comme dans Zabbix (« alerte si le disque dépasse 90 % »), le modèle apprend le comportement normal et détecte les anomalies ou prédit une panne. Par exemple Dynatrace avec son moteur Davis.

**« Donne-moi un exemple d'IA en cybersécurité. »**
> Les EDR, comme Microsoft Defender for Endpoint ou CrowdStrike Falcon. Ils surveillent le comportement des postes : si un processus se met à chiffrer des centaines de fichiers d'un coup, c'est typique d'un ransomware, et l'EDR peut isoler le poste automatiquement.

**« Et les attaquants, ils utilisent l'IA ? »**
> Oui : hameçonnage sans fautes et personnalisé, deepfakes vocaux pour se faire passer pour un dirigeant, et maintenant l'injection de prompt pour détourner des agents IA.

### Sur l'innovation (MCP et agents)

**« Explique le MCP simplement. »**
> C'est un standard ouvert, créé par Anthropic en novembre 2024, qui permet à une IA de se brancher sur des outils. On le compare à un port USB-C : chaque outil crée une seule fois son serveur MCP, et toutes les IA compatibles peuvent l'utiliser.

**« Quelle différence entre un chatbot et un agent ? »**
> Un chatbot répond. Un agent agit : il planifie des étapes, utilise des outils (lire un fichier, interroger une API), regarde le résultat et continue jusqu'à atteindre l'objectif.

**« Comment ça marche techniquement ? »**
> Il y a trois éléments : l'hôte (par exemple Claude Code ou VS Code) qui contient le client MCP, les serveurs MCP qui exposent des outils, et les outils réels derrière. Les messages sont en JSON-RPC 2.0. En local, le transport se fait par stdio ; à distance, par HTTP avec une authentification OAuth. Un serveur propose trois choses : des tools (actions), des resources (données à lire) et des prompts (modèles de tâches).

**« Pourquoi c'est une innovation récente et importante ? »**
> Parce qu'en un an, tout le secteur l'a adopté : OpenAI, Google, Microsoft. En décembre 2025, il a été confié à l'Agentic AI Foundation, sous la Linux Foundation, donc il n'appartient plus à une seule entreprise. Et la dernière version de la spécification date du 28 juillet 2026 : elle rend le protocole « sans état », plus simple à héberger.

**« Tu l'as utilisé toi-même ? »**
> Oui, et c'est mon meilleur exemple. Pour préparer ce portfolio, j'ai demandé à un agent IA de récupérer mon ancien site sur Vercel via le serveur MCP de Vercel. Il a listé mes 27 projets et les fichiers du site, mais il a reçu une erreur 403 quand il a voulu accéder à mon équipe : le jeton n'avait pas les droits. Ça montre deux choses : les permissions fonctionnent, et la gestion des droits est une vraie compétence d'administrateur. J'utilise aussi un agent pour développer Flux Master : chaque modification passe par une branche et une pull request avant d'aller en production.

**« Quels sont les risques ? »**
> Trois principaux. L'injection de prompt : un texte piégé dans un ticket ou une page web donne des ordres cachés à l'agent ; en mai 2025, ça a permis de faire fuiter du code privé via le serveur MCP de GitHub. L'empoisonnement d'outil : un serveur malveillant cache des instructions dans la description de ses outils. Et les permissions excessives. Les parades : moindre privilège, serveurs officiels uniquement, validation humaine des actions sensibles et journalisation.

**« Est-ce que l'IA va remplacer les techniciens ? »**
> Je ne pense pas. Elle va remplacer des tâches répétitives, pas le métier. Le technicien devient celui qui valide, sécurise et surveille. Mais pour valider ce que propose une IA sur un VLAN, il faut savoir soi-même ce qu'est un VLAN : les bases deviennent encore plus importantes.

### Sur ta méthodologie

**« Reddit, TikTok, YouTube… ce ne sont pas des sources fiables. »**
> Vous avez raison, et c'est pour ça que je ne les utilise pas comme sources finales. Ce sont mes **déclencheurs** : ils me signalent une nouveauté vite. Ensuite je remonte à la source d'origine (blog officiel de l'éditeur, documentation, CERT-FR pour les failles) et je recoupe avec au moins deux sources indépendantes. Par exemple, pour la nouvelle version du MCP, je l'ai vue passer sur Reddit, puis je l'ai vérifiée sur le blog officiel modelcontextprotocol.io.

**« Comment tu reçois tes alertes ? »**
> Je suis abonné à des subreddits ciblés (r/sysadmin, r/networking, r/homelab, r/cybersecurity), avec le tri « Top de la semaine ». Sur YouTube, j'ai activé la cloche sur les chaînes clés. Sur TikTok, l'algorithme est entraîné sur la tech et j'enregistre les vidéos utiles dans une collection « veille ». Reddit propose aussi des flux RSS par subreddit, que je peux mettre dans un lecteur RSS.

**« Tu utilises l'IA pour faire ta veille sur l'IA. Ce n'est pas un problème ? »**
> C'est un risque, je le sais : elle peut halluciner ou avoir des connaissances datées. Je l'utilise pour **expliquer et résumer**, pas comme source. Je pose la même question à deux IA (Claude et Gemini, par exemple) et si les réponses divergent, je vais vérifier à la source.

**« Combien de temps tu y consacres ? »**
> Un peu chaque jour en mode « flux » (Reddit, TikTok, YouTube), et un moment dans la semaine pour vérifier et rédiger mes fiches.
> *(Adapte avec ta vraie fréquence : il faut que ce soit vrai.)*

**« Montre-moi une fiche de veille. »**
> Montre la fiche MCP du portfolio : date, déclencheur, source vérifiée, résumé, impact SISR, fiabilité.

### Sur ton bilan et tes projets

**« Pourquoi tu ne t'es pas impliqué en réseau en début d'année ? »**
> J'ai mis mon énergie ailleurs, surtout sur le développement de Flux Master et l'IA, et j'ai sous-estimé l'importance du réseau. Je m'en suis rendu compte en TP. Aujourd'hui je reprends les bases, je refais les TP, je pratique sur mon labo Proxmox et j'utilise l'IA comme répétiteur. Ma veille m'a d'ailleurs confirmé que c'était indispensable : même les IA réseau ne servent à rien si on ne sait pas valider ce qu'elles proposent.

**« Concrètement, où en es-tu en réseau ? »**
> *(Prépare 2 ou 3 notions que tu maîtrises maintenant, par exemple :)* Je sais découper un réseau en sous-réseaux, par exemple un /24 en quatre /26 de 62 hôtes chacun. Je sais expliquer à quoi sert un VLAN : séparer logiquement des réseaux sur un même switch, par exemple isoler les postes des invités.
> **À réviser avant mercredi** : modèle OSI (les 7 couches), calcul de sous-réseaux, VLAN et trunk, DHCP (DORA), DNS.

**« Explique ton infrastructure Proxmox. »**
> *(À préparer avec tes vrais éléments :)* combien de VM et de conteneurs, quels services, comment le réseau est configuré (bridge `vmbr0`), à quoi servent les snapshots (revenir en arrière avant une modification risquée).

**« Flux Master, c'est quoi ? »**
> *(À préparer en 3 phrases :)* ce que fait l'application, pour qui, et comment tu la déploies (GitHub, puis prévisualisation Vercel, puis production). Mentionne la version 18.47 et le programme bêta avec recueil d'avis.

---

## 6. Checklist avant mercredi

- [ ] Relire **tout** le portfolio et corriger ce qui n'est pas exact te concernant (stage METM, niveaux, parcours).
- [ ] Compléter l'e-mail et le lien LinkedIn dans la section Contact (`src/index.html`, commentaires « À COMPLÉTER »).
- [ ] Ajouter les images dans `src/images/` : `proxmox.png` (capture de ton Proxmox) et `stage-metm.png` (facultatif).
- [ ] Préparer 3 phrases sur Proxmox, METM et Flux Master.
- [ ] Réviser les bases réseau listées plus haut.
- [ ] Répéter l'oral **à voix haute 3 fois**, chronométré.
- [ ] Faire poser les questions de la partie 5 par quelqu'un, dans le désordre.
- [ ] Le jour J : ouvrir le site **avant** de passer et vérifier qu'il s'affiche (avoir une capture d'écran en secours si pas de connexion).
