# Préparation à l'oral : veille technologique et portfolio

> Document de travail **personnel**, à ne pas mettre en ligne (il est exclu du déploiement Vercel via `.vercelignore`).
> Objectif : savoir **présenter**, **expliquer** et surtout **te défendre** face aux questions du jury.

---

## 1. Ton fil rouge (à retenir, avec tes mots)

> « Quand on dit "l'IA", on parle en fait de plein d'IA différentes, chacune spécialisée dans une chose. J'ai tourné ma veille vers mon projet, Flux Master, parce que j'y utilise déjà cinq de ces IA : une qui lit les descriptions des annonces, une qui regarde les photos, une qui repère les arnaques, une qui surveille le site, et des agents qui m'aident à le développer. L'innovation la plus récente, ce sont ces agents branchés sur mes outils grâce au MCP. Ce que j'en retiens : ils proposent, mais c'est moi qui valide. Et pour valider, il faut connaître les bases. »

Tout ton oral doit revenir à cette idée. Si tu te perds, reviens-y.

---

## 2. Plan de présentation (environ 10 minutes)

| Temps | Partie | Ce que tu dis | Ce que tu montres |
|---|---|---|---|
| 0:00 | Accroche | « Quand on dit "l'IA", on pense à ChatGPT. Mais l'IA qui détecte un ransomware n'a rien à voir avec ChatGPT. » | Titre de la section Veille |
| 0:45 | Présentation | Nom, BTS SIO SISR, 1 phrase par projet | Hero + Projets |
| 2:00 | Bilan honnête | Ton retard en réseau, ta prise de conscience, ce que tu fais | Carte « Bilan personnel » |
| 3:00 | Problématique | « Comment des IA spécialisées peuvent faire tourner et surveiller une application comme Flux Master, sans créer de nouveaux risques ? » | Encadré Problématique |
| 3:30 | Les 5 spécialisations | 30 s chacune : ce que c'est, puis **ce qu'elle fait dans Flux Master** | Les onglets |
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
7. **Explique chaque mot technique** dès que tu l'utilises : « un VLAN, c'est-à-dire… ».
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

Les réponses sont volontairement simples. Dis-les avec tes mots, pas par cœur. Les notions sont expliquées dans `ANTISECHE.md`.

### Sur les spécialisations de l'IA (la remarque qu'on t'a faite)

**« Tu dis que l'IA a des spécialisations. Ça veut dire quoi ? »**
> Ça veut dire qu'il n'y a pas une seule IA. Chaque IA a appris à faire une chose précise. Dans Flux Master, j'en ai cinq qui font chacune un travail différent : une lit les descriptions des annonces, une regarde les photos, une repère les arnaques, une surveille le site, et des agents m'aident à développer. Aucune ne sait faire le travail des autres.

**« Pourquoi avoir tourné ta veille vers Flux Master ? »**
> Parce que c'est le projet sur lequel je passe le plus de temps. Je préfère parler de ce que j'utilise vraiment que d'exemples lus ailleurs. Et ça me permet de montrer les limites que j'ai vues moi-même.

**« Comment l'IA lit les descriptions dans Flux Master ? »**
> Toutes les 2 heures, des robots récupèrent les annonces. Pour les bonnes affaires, un script envoie la description du vendeur à une IA (Groq, ou Gemini si Groq ne répond pas). Elle en sort les défauts et les frais à prévoir, et ça corrige la marge. Le fait de passer à une autre IA si la première ne répond pas, c'est de la redondance, comme on en fait en réseau.

**« Et l'anti-fraude ? »**
> Quand une annonce arrive, une IA lui donne une note de risque de 0 à 100. Au-dessus de 70, l'annonce part en quarantaine au lieu d'être publiée. Ça peut se tromper, donc c'est un filtre, pas un juge.

**« Une IA qui sait tout faire, ça existe ? »**
> Non, pas aujourd'hui. Toutes les IA actuelles sont spécialisées.

**« C'est quoi le machine learning ? »**
> C'est quand on ne donne pas les règles à la machine : on lui montre des milliers d'exemples et elle trouve les règles toute seule. Par exemple, on lui montre plein d'e-mails marqués « spam » et elle apprend à reconnaître les spams.

**« Comment ChatGPT fonctionne, en gros ? »**
> Il a lu énormément de textes. Quand je lui pose une question, il écrit la réponse en devinant mot après mot ce qui est le plus probable. C'est pour ça qu'il peut se tromper avec assurance : ce qui est probable n'est pas forcément vrai.

**« Donne un exemple d'IA en cybersécurité. »**
> Microsoft Defender, l'antivirus de Windows en version entreprise. Il apprend comment un ordinateur se comporte normalement. Si un programme se met à chiffrer des centaines de fichiers d'un coup, ce qui ressemble à un rançongiciel, il donne l'alerte et peut bloquer l'ordinateur.

**« Et les pirates, ils utilisent l'IA ? »**
> Oui, par exemple pour écrire de faux e-mails sans fautes et très crédibles, pour piéger les gens.

### Sur l'innovation (MCP et agents)

**« Explique le MCP simplement. »**
> C'est un standard qui permet de brancher une IA sur des outils, comme GitHub ou Vercel. On le compare souvent à une prise USB-C : un seul type de prise, et ça marche avec tout. Il a été créé par Anthropic, l'entreprise qui fait Claude, en novembre 2024.

**« C'est quoi la différence entre un chatbot et un agent ? »**
> Un chatbot répond. Un agent agit : il peut ouvrir un fichier, aller voir un site, lancer une action, puis regarder le résultat et continuer.

**« Pourquoi c'est la dernière innovation importante ? »**
> Parce qu'en un an, les grandes entreprises de l'IA l'ont adopté : OpenAI, Google, Microsoft. Et en décembre 2025, il a été confié à une fondation indépendante (la Linux Foundation). Il n'appartient plus à une seule entreprise.

**« Tu l'as utilisé toi-même ? »**
> Oui. Pour préparer ce portfolio, j'ai demandé à un agent IA de récupérer mon ancien site sur Vercel. Il a trouvé mes projets tout seul, mais il a été bloqué par une erreur 403, qui veut dire « accès refusé », parce que je ne lui avais pas donné le droit d'accéder à mon équipe. J'ai dû donner l'autorisation moi-même. Ça montre que l'IA ne peut pas faire plus que ce qu'on lui autorise.

**« Quels sont les risques ? »**
> Deux principaux. Un texte piégé : quelqu'un cache des ordres dans une page ou un message que l'agent va lire, et l'agent les suit. Et trop de droits : si l'agent peut tout faire, une seule erreur peut tout casser. La solution : lui donner le minimum de droits, et valider ce qu'il fait.

**« L'IA va remplacer les techniciens ? »**
> Je ne crois pas. Elle va prendre les tâches répétitives, c'est sûr. Mais quelqu'un doit vérifier ce qu'elle fait. Et pour vérifier, il faut connaître les bases. Donc les bases comptent encore plus qu'avant.

### Sur ta méthodologie

**« Reddit, TikTok, YouTube… ce n'est pas fiable. »**
> Vous avez raison, c'est pour ça que je ne m'arrête pas là. Ces sites me servent à repérer les nouveautés. Ensuite je cherche la source officielle, et je vérifie que deux sources différentes disent la même chose.

**« Tu utilises l'IA pour ta veille sur l'IA, ce n'est pas un problème ? »**
> C'est un risque, je le sais : elle peut se tromper. Je m'en sers pour m'expliquer des choses, pas comme source. Si j'ai un doute, je pose la même question à deux IA différentes, et je vérifie à la source.

**« Tu y passes combien de temps ? »**
> *(Réponds la vérité. Par exemple : « un peu tous les jours en scrollant, et je creuse quand un sujet m'intéresse ».)*

### Sur ton bilan et tes projets

**« Pourquoi tu ne t'es pas impliqué en réseau en début d'année ? »**
> J'ai mis mon énergie ailleurs, surtout sur Flux Master et l'IA, et j'ai sous-estimé le réseau. Je m'en suis rendu compte, et je reprends les bases une par une.

**« Concrètement, tu sais quoi en réseau aujourd'hui ? »**
> Réponds honnêtement : « Je suis encore débutant. Par exemple, un VLAN, c'est découper un réseau en plusieurs réseaux séparés sur le même équipement, pour isoler les invités du personnel. » Avant mercredi, apprends au minimum les fiches **adresse IP**, **VLAN**, **DHCP** et **DNS** de l'antisèche.

**« Explique ce que tu as fait avec Proxmox. »**
> « En TP, j'ai utilisé Proxmox pour créer des machines virtuelles, c'est-à-dire des ordinateurs simulés sur un seul serveur. Ça sert à tester sans risquer de casser un vrai poste. » Si on te pose une question plus précise : « Je ne m'en souviens plus en détail, c'est une des choses que je reprends. »

**« Flux Master, c'est quoi ? »**
> « C'est un comparateur d'annonces de voitures d'occasion. Il récupère les annonces de plus de 15 sites et calcule pour chaque voiture le prix du marché et la vraie marge, une fois payés la carte grise, le transport et le contrôle technique. Puis il dit si c'est une bonne affaire. C'est gratuit et en bêta avec de vrais testeurs. » Ensuite, place le lien avec ta veille : les agents IA qui font un audit chaque lundi (voir `ANTISECHE.md`).

**« C'est toi qui as tout codé ? »**
> « Je l'ai conçu et je le pilote, et je développe avec un agent IA. Mon rôle, c'est de décider, de relire et de valider avant la mise en ligne. »

**« Qu'est-ce que tu as fait pendant ton stage ? »**
> « J'ai installé des postes de travail et des logiciels Windows. Donc à la fois du matériel (hardware) et du logiciel (software). » Si on te demande comment tu t'y prenais, décris les étapes que tu as vraiment faites (voir `ANTISECHE.md`).

### La phrase de secours (à garder en tête)

> « Je ne sais pas répondre précisément à ça pour l'instant. Ce que je peux dire, c'est [ce que tu sais]. C'est justement une des choses que je travaille. »

Un jury préfère mille fois ça à une réponse inventée.

---

## 6. Checklist avant mercredi

- [ ] Relire **tout** le portfolio et corriger ce qui n'est pas exact te concernant (stage METM, niveaux, parcours).
- [ ] Compléter l'e-mail et le lien LinkedIn dans la section Contact (`src/sections/Contact.tsx`, constantes `EMAIL` et `LINKEDIN` en haut du fichier).
- [ ] Ajouter les images dans `public/images/` : `proxmox.png` (capture de ton Proxmox) et `stage-metm.png` (facultatif).
- [ ] Apprendre le pitch Flux Master (30 s) et la phrase sur ton stage METM.
- [ ] Apprendre l'antisèche (`ANTISECHE.md`), en priorité : adresse IP, VLAN, DHCP, DNS, machine virtuelle, MCP, erreur 403.
- [ ] Répéter l'oral **à voix haute 3 fois**, chronométré.
- [ ] Faire poser les questions de la partie 5 par quelqu'un, dans le désordre.
- [ ] Le jour J : ouvrir le site **avant** de passer et vérifier qu'il s'affiche (avoir une capture d'écran en secours si pas de connexion).
