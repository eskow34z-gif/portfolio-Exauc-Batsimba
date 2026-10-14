# Antisèche : tout ce qui est sur le site, en mots simples

> Document personnel, non publié. Pour chaque notion : **ce que c'est** en une phrase, **un exemple**, et **quoi dire si on insiste**.
> Ne l'apprends pas par cœur mot pour mot : comprends l'idée, puis redis-la avec tes mots.
> Ordre conseillé si tu manques de temps : ⭐ d'abord (indispensable), puis le reste.

---

## 1. Réseau et système (ton point faible : priorité)

### ⭐ Adresse IP
- **C'est quoi :** l'« adresse postale » d'un appareil sur un réseau. Chaque ordinateur, téléphone ou imprimante en a une.
- **Exemple :** `192.168.1.25`, c'est l'adresse d'un PC dans un réseau de maison ou d'entreprise.
- **Si on insiste :** une adresse IP est faite de deux parties : le **réseau** (le quartier) et la **machine** (le numéro de la maison). Le **masque** (par exemple `255.255.255.0`, aussi écrit `/24`) dit où s'arrête le quartier. Avec `/24`, tous les appareils `192.168.1.xxx` sont dans le même réseau.

### ⭐ VLAN
- **C'est quoi :** découper un réseau en plusieurs petits réseaux séparés, sur le même équipement (le même switch).
- **Exemple :** dans une entreprise, on met le Wi-Fi des invités dans un VLAN et les PC du personnel dans un autre. Les invités ont Internet mais ne voient pas les ordinateurs de l'entreprise.
- **Pourquoi c'est utile :** la **sécurité** (on isole) et l'**organisation** (un VLAN par service : compta, direction, invités…).
- **Si on insiste :** « Chaque VLAN a un numéro. Les appareils de VLAN différents ne se parlent pas directement, il faut passer par un routeur. »

### ⭐ DHCP
- **C'est quoi :** le service qui **donne automatiquement une adresse IP** à un appareil quand il se connecte.
- **Exemple :** chez toi, quand ton téléphone se connecte au Wi-Fi, c'est la box qui lui donne une adresse grâce au DHCP. Tu n'as rien à taper.
- **Si on insiste :** sans DHCP, il faudrait configurer l'adresse de chaque PC à la main.

### ⭐ DNS
- **C'est quoi :** l'« annuaire » d'Internet. Il traduit un nom (`google.fr`) en adresse IP, parce que les ordinateurs ne comprennent que les adresses.
- **Exemple :** tu tapes `youtube.com`, le DNS répond « c'est à telle adresse IP », et ton navigateur y va.
- **Si on insiste :** si le DNS tombe, Internet « marche » mais plus aucun site ne s'ouvre par son nom.

### Routeur / switch (au cas où)
- **Switch :** relie les appareils d'un même réseau entre eux (les PC d'un bureau).
- **Routeur :** relie des réseaux différents entre eux (ton réseau et Internet, ou deux VLAN).

### Modèle OSI (si on te le demande)
- **C'est quoi :** une façon de découper le fonctionnement d'un réseau en **7 couches**, du câble jusqu'à l'application.
- **À dire honnêtement :** « C'est un modèle en 7 couches, du physique (le câble) jusqu'à l'application. C'est une des notions que je reprends, je ne le maîtrise pas encore en détail. »

### ⭐ Machine virtuelle (VM) et Proxmox
- **Machine virtuelle :** un ordinateur « simulé » par un logiciel. Il tourne à l'intérieur d'un vrai ordinateur, avec son propre système (Windows, Linux…).
- **Proxmox :** un logiciel installé sur un serveur, qui permet de créer et gérer **plusieurs machines virtuelles** sur ce seul serveur.
- **Exemple :** sur un seul serveur physique, on peut faire tourner une VM Windows, une VM Linux et une VM serveur web, comme si c'étaient 3 ordinateurs différents.
- **Pourquoi c'est utile :** on économise du matériel, et on peut **tester sans risque**. Si on casse une VM, on la supprime ou on la restaure.
- **Snapshot (si le mot sort) :** une « photo » d'une VM à un instant donné. Si une modification se passe mal, on revient à la photo.
- **Si on insiste sur ce que tu as fait :** « En TP, j'ai créé des machines virtuelles avec Proxmox. Je ne me souviens plus de tous les détails, c'est une des choses que je reprends. »

---

## 2. Tes projets

### ⭐ Flux Master : le pitch en 30 secondes
> « Flux Master, c'est un comparateur d'annonces de voitures d'occasion. Il récupère les annonces de plus de 15 sites, comme AutoScout24 ou ParuVendu. Pour chaque voiture, il calcule le prix du marché et la vraie marge, une fois payés la carte grise, le transport et le contrôle technique. Ensuite il dit si c'est une bonne affaire, une voiture à négocier ou à éviter. C'est gratuit, et il est en bêta avec de vrais testeurs. »

**Pour qui :** les gens qui achètent des voitures d'occasion pour les revendre, ou qui veulent juste savoir si un prix est correct.

**Les mots à connaître (si on te pose des questions techniques) :**
- **Robots de collecte (scrapers) :** des petits programmes qui vont lire les annonces sur les sites, tout seuls, plusieurs fois par jour. Ils respectent les règles des sites (pas de contournement des protections).
- **GitHub Actions :** le service qui lance ces robots automatiquement, à heure fixe, sans que tu aies besoin d'allumer ton PC.
- **Base de données (Supabase) :** l'endroit où toutes les annonces sont rangées, comme un énorme tableau Excel en ligne. La version gratuite est limitée à 500 Mo, donc il faut surveiller la place.
- **Calcul automatique :** toutes les 5 minutes, la base recalcule la marge et le score des nouvelles annonces.
- **Score de rentabilité :** une note sur 100. À partir de 85, l'annonce est marquée comme une très bonne affaire.
- **Vercel :** le service qui met le site en ligne (comme pour ce portfolio).
- **Version 18.47 :** chaque modification augmente le numéro de version, pour savoir exactement ce qui est en ligne.
- **Connexion :** par Google ou Discord, il n'y a pas de mot de passe stocké sur le site (c'est plus sûr).

**Le lien avec ta veille (à placer à l'oral, c'est ton meilleur argument) :**
> « Sur Flux Master, j'ai deux agents IA qui se réveillent chaque semaine. Le lundi, l'un fait un audit : sécurité, taille de la base de données, robots en panne. Il a des règles strictes : il ne supprime rien, il ne met rien en ligne tout seul. Il propose ses corrections dans une demande de modification, et c'est moi qui relis et qui valide. »

**Le chemin d'une modification :**
- **Branche :** une copie de travail du code. On modifie dessus sans toucher à la version en ligne.
- **Pull request :** une demande pour fusionner cette copie dans la version principale, après relecture.
- **Préproduction :** une version de test que personne ne voit.
- **Production :** la vraie version, en ligne pour tout le monde.

**Si on te demande « c'est toi qui as tout codé ? » :** dis la vérité. « Je l'ai conçu et je le pilote, et je développe avec un agent IA (Claude Code). Mon rôle, c'est de décider ce qu'on fait, de relire et de valider avant la mise en ligne. »

### ⭐ Stage chez METM : installation de postes et de logiciels Windows
- **Ta phrase :** « Pendant mon stage chez METM, j'ai installé des postes de travail et des logiciels Windows. C'est à la fois du matériel (hardware) et du logiciel (software). »
- **Hardware (matériel) :** tout ce qu'on peut toucher. PC, écran, clavier, imprimante, câbles.
- **Software (logiciel) :** les programmes. Windows, la suite bureautique, l'antivirus, les logiciels de l'entreprise.
- **« Installer un poste », ça veut dire quoi :** préparer un ordinateur pour qu'un salarié puisse travailler dessus. En général : le brancher (écran, clavier, réseau), installer ou configurer Windows, créer ou connecter le compte de l'utilisateur, puis installer les logiciels dont il a besoin.
- **Si on te demande les étapes :** raconte seulement celles que **tu as vraiment faites**. Si tu ne te souviens pas d'un détail : « je ne me souviens plus du détail, mais je faisais [ce dont tu te souviens] ».
- **Ce que tu peux dire avoir appris :** « être rigoureux, parce qu'un poste mal installé bloque quelqu'un dans son travail ».

---

## 3. Ta veille : l'IA et ses spécialisations

### ⭐ « IA spécialisée »
- **C'est quoi :** une IA qui sait faire **une seule chose**, parce qu'elle a appris uniquement ça.
- **Exemple :** l'IA d'un antivirus sait repérer un virus, mais elle ne sait pas écrire un texte. ChatGPT sait écrire, mais il ne protège pas ton PC.
- **Phrase clé :** « Toutes les IA d'aujourd'hui sont spécialisées. Une IA qui sait tout faire comme un humain, ça n'existe pas encore. »

### Les cercles (IA → machine learning → deep learning → IA générative)
- **IA :** le grand ensemble, faire faire à une machine des choses « intelligentes ».
- **Machine learning :** la machine apprend à partir de milliers d'exemples au lieu qu'on lui écrive les règles. Exemple : on lui montre plein de spams, elle apprend à reconnaître les spams.
- **Deep learning :** une méthode d'apprentissage plus puissante, inspirée du cerveau. On l'utilise pour les images, la voix, le texte.
- **IA générative :** celle qui **crée** du texte ou des images (ChatGPT, Claude, Gemini).
- **À retenir :** chaque cercle est inclus dans le précédent, comme des poupées russes.

### Les 5 spécialisations (une phrase chacune)
1. **IA générative** : elle écrit du texte (ChatGPT). Risque : elle peut **halluciner**, c'est-à-dire inventer une réponse fausse avec assurance.
2. **IA de cybersécurité** : elle surveille un ordinateur et donne l'alerte si quelque chose est anormal (Microsoft Defender). Exemple : un **rançongiciel** (ransomware), un programme qui chiffre tous les fichiers et demande une rançon.
3. **IA de supervision** : elle surveille les serveurs (mémoire, disque) et prévient **avant** la panne (Datadog). Exemple : « ton disque sera plein dans 3 jours ».
4. **IA réseau** : elle cherche pourquoi la connexion est lente ou coupée et propose une correction (Cisco AI Assistant).
5. **Agents IA** : une IA qui **agit**. Elle utilise des outils, regarde le résultat et continue (Claude Code).

---

## 4. L'innovation : agents IA et MCP

### ⭐ MCP (Model Context Protocol)
- **C'est quoi :** un standard qui permet de **brancher une IA sur des outils** (GitHub, Vercel…).
- **Image à utiliser :** « C'est comme une prise USB-C : un seul type de prise, et ça marche avec tous les appareils. »
- **Qui :** créé par **Anthropic** (l'entreprise qui fait Claude) en **novembre 2024**. Adopté ensuite par OpenAI, Google et Microsoft. Confié à une fondation indépendante (la **Linux Foundation**) le **9 décembre 2025**.
- **Serveur MCP :** le petit programme qui fait le lien entre l'IA et un outil. Il y a un serveur MCP pour GitHub, un pour Vercel, etc.
- **Les 3 choses qu'un serveur MCP propose (si on insiste) :** des **actions** (ex. « lister mes projets »), des **données à lire** (ex. un fichier), et des **modèles de tâches** tout prêts.

### ⭐ Erreur 403 (ton cas réel)
- **C'est quoi :** un code qui veut dire **« accès refusé »** : on sait qui tu es, mais tu n'as pas le droit.
- **Ton histoire :** l'agent IA a trouvé tes projets Vercel tout seul, puis a été bloqué par une 403 parce que tu ne lui avais pas donné accès à ton équipe. Tu as dû donner l'autorisation toi-même.
- **Ce que ça montre :** l'IA ne peut pas faire plus que ce qu'on l'autorise à faire.
- **Autorisation / OAuth (si le mot sort) :** le système qui te permet de donner à une appli un accès **limité** à ton compte, **sans lui donner ton mot de passe**. C'est le bouton « Autoriser l'accès » qu'on voit sur beaucoup de sites.

### Les risques
- **Texte piégé (injection de prompt) :** quelqu'un cache des ordres dans un texte que l'agent va lire (une page web, un message), et l'agent les suit.
- **Outil piégé :** un faux serveur MCP installé depuis une source douteuse.
- **Trop de droits :** si l'agent peut tout faire, une seule erreur peut tout casser.
- **La solution, en une phrase :** « Donner le minimum de droits, installer seulement des outils officiels, et valider ce que l'agent fait. »

### Ticket et supervision (mots du schéma)
- **Ticket :** une demande d'aide enregistrée (« mon imprimante ne marche plus »), que le support informatique traite.
- **Supervision :** surveiller en permanence que les serveurs et le réseau fonctionnent.

---

## 5. Ta méthode de veille (rien de technique, c'est ta réalité)
- **Sources :** Reddit, YouTube, TikTok, et l'IA (Claude, Gemini, ChatGPT).
- **Le principe :** ces sources sont rapides mais pas toujours fiables. Elles servent à **repérer**. Ensuite tu **vérifies** : source officielle, date, deux sources qui disent la même chose.
- **Source officielle :** le site de l'entreprise ou de l'organisme qui a fait l'annonce (par exemple le blog officiel du MCP).
- **CERT-FR :** le site officiel français qui publie les alertes de sécurité (failles, attaques en cours).

---

## La phrase de secours
> « Je ne sais pas répondre précisément à ça pour l'instant. Ce que je peux dire, c'est [ce que tu sais]. C'est une des choses que je travaille. »

Dire « je ne sais pas, mais voilà ce que je sais » montre que tu es honnête. Inventer une réponse se voit tout de suite.
