[//]: # (This is supposed to be a comment. If you see this, you are either editing/reading the source Markdown file, or using a markdown viewer that does not support comments.)

# MagicJinn

### Game Developer | Programmer | Game Modder

Aspiring game developer, basically a software dev, technically a webdev. Creator of **MrBeastify**, **SDLS**, **Beacon Aura**, **The Block Keeps Ticking**, **Chronos Backups** and **Quantum Things**. I'm an aspiring full-time game developer, and I make game mods and browser extensions in my free time. 1.5 year game development school dropout because it was terrible. Check out the games I made on my [Itch.io](https://magicjinn.itch.io/). I am also a YouTube content creator.

![Github Stats](https://github-readme-stats.vercel.app/api?username=MagicJinn&show_icons=true&count_private=true&theme=highcontrast&hide_rank=true)

## I am skilled at

- Javascript (Browser extension development)
- C#
- Unity game development
- Godot game development
- Minecraft mod development
- **Problem-solving and practical application of programming concepts**

## SDLS
[//]: # (html: project)

Sunless Data Loading Simplified (SDLS) is a tool designed to streamline Sunless Sea modding. By allowing modders to omit unused fields from .json files, SDLS simplifies mod creation and enhances compatibility. It converts .sdls files to .json on startup, without modifying game files. Other features include faster loading times and future support for merging mods and adding new content without overwriting existing data. SDLS aims to help mod authors focus on the things that are really important, writing excellent stories, without being bogged down by the complexity.

SDLS is in active development, with 1.5 bringing massive performance improvements and documentation, 1.6 to 1.9 bringing quality of life features and performance improvements to the base game, and 2.0 set to introduce mod merging.

**Language: C# .Net3.5**<br>
**Technologies: BepInEx, Unity, Harmony, JSON Processing, Multithreading**<br>
[**Nexusmods**](https://www.nexusmods.com/sunlesssea/mods/51)

## MrBeastify
[//]: # (html: project, feature-complete)

MrBeastify is a browser extension inspired by [MrBeastify.com](https://mrbeastify.com) that adds MrBeast to every YouTube thumbnail. It's feature-complete and no longer actively developed, but it's still maintained, adding extra images each month, as well as fixing bugs caused by youtube frontend changes. It works on Chrome, Edge, and Firefox, and was built for compatibility and optimized for speed and filesize.

**Language: Javascript**<br>
**Technologies: Browser Extensions**<br>
[**Chrome**](https://chromewebstore.google.com/detail/youtube-mrbeastify/dbmaeobgdodeimjdjnkipbfhgeldnmeb?hl=en), [**Edge**](https://chromewebstore.google.com/detail/youtube-mrbeastify/dbmaeobgdodeimjdjnkipbfhgeldnmeb?hl=en), [**Firefox**](https://addons.mozilla.org/en-US/firefox/addon/youtube-mrbeastify/)

## Sunless Sea Vortex Support
[//]: # (html: project, feature-complete)

Sunless Sea Vortex Extension for automatic installs of both BepInEx and JSON mods using Vortex. Built to handle most if not all cases and file structures for mod installation, and throws automatic warnings and has a fallback for incorrect mod formats.

[**Nexusmods**](https://www.nexusmods.com/site/mods/873)

## Minor Sunless Sea Mods
[//]: # (html: group, feature-complete)

- **SeaCull** - A performance optimization mod for Sunless Sea that significantly improves game performance through tile culling and frame rate optimizations, achieving performance gains of 40-70%. By dynamically managing the loading of sea tiles based on player distance, it reduces unnecessary resource usage and improves overall game responsiveness. The mod also addresses several technical issues in the base game, including the sea animation being tied to framerate and various quirks with VSync and TargetFPS settings. Feature-complete. [**Nexusmods**](https://www.nexusmods.com/sunlesssea/mods/57)
- **OriginalMainMenu** - Restores the original Sunless Sea main menu background and title card when Zubmariner is installed. Simple and easy to configure. Feature-complete. [**Nexusmods**](https://www.nexusmods.com/sunlesssea/mods/58)
- **CorrespondentFix** - Improves the Correspondent legacy by removing discovery data from dead characters' charts while preserving layout and fog state. Fixes the original "noob-trap" and makes the legacy actually useful. Feature-complete. [**Nexusmods**](https://www.nexusmods.com/sunlesssea/mods/56)
- **AllShipsAllSlots** - A lightweight (10KB) mod that adds both Forward and AFT weapon slots to every ship in Sunless Sea. Features user-friendly configuration and compatibility with vanilla and modded ships across all game versions (Steam, Epic, GOG). Serves as a more efficient replacement for the original "Aft Slots for ALL" mod. Feature-complete. [**Nexusmods**](https://www.nexusmods.com/sunlesssea/mods/55)
- **Legacy Yacht** - A story mod that makes the massively outclassed Steam Yacht inheritable so it's less terrible. Feature-complete. [**Nexusmods**](https://www.nexusmods.com/sunlesssea/mods/35)
- **Sacks As A Mascot** - During the Sacks and Snow quest, Mr Sacks is supposed to provide a boost to Engine Power and Fuel Efficiency; due to how the game is coded this bonus is never applied. This mod lets you benefit from it by equipping Mr Sacks as a mascot. [**Nexusmods**](https://www.nexusmods.com/sunlesssea/mods/52)

## Chronos Backups
[//]: # (html: project)
[//]: # (html: link=GitHub|https://github.com/MagicJinn/Chronos-Backups)

Chronos Backups is a multi-loader, multi-version Minecraft backup utility that keeps your world safe without filling your disk. Instead of backing up every chunk, it intelligently prunes backups to include only the most important parts of your world, dramatically reducing backup size while preserving the areas that actually matter. A shared core with loader-specific shells lets it run on Fabric, NeoForge, and Forge from 1.7.x through the latest releases, making it the broadest version range of any Minecraft backup mod. The mod is completely serverside, so vanilla clients can still play while the mod is installed.

Backups can be triggered manually or run on a schedule. Backup frequency, along with many other settings, such as a copy-blacklist prefilled with sensible defaults for common server setups, can all be configured. Compression can be set to zip or none, and you can set a maximum number of backups to keep.

At the heart of Chronos is a custom Rust-native chunk pruning library, built for speed using MCA parsing and NBT processing. Chunks that haven't been played in long enough can be excluded from backups based on configurable playtime thresholds.

Reliability across more than 100 Minecraft version and loader combinations is backed by a dedicated testing toolchain. A Docker-based `testServers` suite spins up a dedicated server for every supported combination, checking that the mod loads, initializes correctly, and runs a speedtest to verify functionality and performance. GitHub Actions CI cross-compiles native Rust libraries on Linux, Windows, and macOS, merges the artifacts, and builds every variant JAR on each push.

Chronos is in active development, with nightly builds on GitHub and stable releases on Modrinth and CurseForge. Publishing a stable GitHub release automatically uploads all variant JARs to both Modrinth and CurseForge.

**Language: Java, Rust**<br>
**Technologies: Minecraft Modding, Fabric, NeoForge, Forge, Native Rust FFI, Docker Integration Testing, GitHub Actions, CI/CD**<br>
[**Modrinth**](https://modrinth.com/mod/chronos-backups), [**Curseforge**](https://www.curseforge.com/minecraft/mc-mods/chronos-backups)

## Quantum Things
[//]: # (html: project)

Quantum Things is a 1.12.2 continuation of Lumien231's Random Things, a mod that adds a diverse collection of utility items, blocks, and gameplay enhancements. The goal of Quantum Things is to provide continued support for Random Things, including new features, bug and crash fixes, and compatibility with other mods, while staying true to the original design goal and intent of the mod.

Quantum Things introduces extensive configurability through an in-game config menu, allowing players to customize various aspects of the mod including plant and loot generation chances, Nature Core behavior, disabling the Spectre Dimension, and adding new or disabling existing Divining Rods, with over 100 new Divining Rods added by default. It also reintroduces several features from earlier versions of Random Things, such as Spectre Armor and Biome Painter.

Beyond new features, Quantum Things addresses numerous critical bugs and performance issues from the original mod, including item duplication exploits, game freezes, various crash fixes, and significant performance optimizations for systems like the Spectre Illuminator, Wireless Redstone, network messages, and Potion Vaporizer. The mod maintains full compatibility with the original Random Things while providing a more stable and configurable experience.

**Language: Java**<br>
**Technologies: Minecraft Modding, Forge**<br>
[**Modrinth**](https://modrinth.com/mod/quantum-things), [**Curseforge**](https://www.curseforge.com/minecraft/mc-mods/quantum-things)

## The Block Keeps Ticking
[//]: # (html: project)

The Block Keeps Ticking is a complete rewrite of Alive World (which is a fork of Presence Not Required) that allows blocks and entities to continue progressing in unloaded chunks, so your farms, furnaces, and passive mobs keep growing and working even when you're far away. The mod supports block entities (furnaces, campfires, brewing stands), crops and stems, nether wart, cocoa beans, tree saplings, growing plants (kelp, bamboo, sugar cane, cactus), dried ghast and sniffer eggs and more. Features include time modes (world time or real time progression), lazy tax settings to slow down simulation, and per-object configuration to enable or disable simulation for specific blocks and entities individually. The mod is completely serverside, so vanilla clients can still play while the mod is installed. Other mods can register custom ticking objects via the API.

**Language: Java**<br>
**Technologies: Minecraft Modding, Fabric**<br>
[**Modrinth**](https://modrinth.com/mod/the-block-keeps-ticking), [**Curseforge**](https://www.curseforge.com/minecraft/mc-mods/the-block-keeps-ticking)

## Beacon Aura
[//]: # (html: project, feature-complete)

Beacon Aura improves beacons by allowing you to *soak* in the beacon's effects while within its range, extending their duration, to be enjoyed after you leave their radius. The strength of the effect buildup and the maximum duration are determined by the beacon's level. The mod also increases the beacon's range by default, as well as allowing you to configure it for yourself. Feature-complete.

**Language: Java**<br>
**Technologies: Minecraft Modding, Fabric**<br>
[**Modrinth**](https://modrinth.com/mod/beacon-aura), [**Curseforge**](https://www.curseforge.com/minecraft/mc-mods/beacon-aura)

## Better Pet Teleporting
[//]: # (html: project, feature-complete)

Better Pet Teleporting is a Minecraft mod that vastly improves pet teleportation logic so you don't lose them. It supports all pets across all dimensions, ensuring your pets can always find you, even in unloaded chunks or when crossing dimensions. It has automatic support for mods (as long as they inherit the `EntityTameable` class) and randomized teleportation to prevent entity cramming. Feature-complete.

**Language: Java**
**Technologies: Minecraft Modding, Forge**<br>
[**Modrinth**](https://modrinth.com/mod/better-pet-teleporting), [**Curseforge**](https://www.curseforge.com/minecraft/mc-mods/better-pet-teleporting)

## Minor Minecraft Mods
[//]: # (html: group, feature-complete)

- **Portalfarm Despawn Fix** - A micro-mod for Fabric that fixes a common issue where mobs transported through nether portals on multiplayer servers would immediately despawn when there are players in the destination dimension. This mod prevents mobs from despawning in portal farms by setting an upper bound to the despawning check. It is named this because it fixes a mechanic most commonly seen when using portal based farms. Feature-complete. [**Modrinth**](https://modrinth.com/mod/portalfarm-despawn-fix), [**Curseforge**](https://www.curseforge.com/minecraft/mc-mods/portalfarm-despawn-fix)

## NO-verflow
[//]: # (html: project, feature-complete)

Silly indie platformer made in 3 days for **SpeedJam #4** with a team of 4. I did **development** together with AhaUser1, implementing gameplay, controls and levels. You play as a gremlin-like demon in a collapsing simulation where bits are overflowing; the goal is to escape and fix it. Art by Dr. Duskbunny, music/sfx by Aenjo.

**Language: GDScript (Godot)**
**Role: Developer (gameplay, systems)**
**Technologies: Godot**
[**Itch.io**](https://magicjinn.itch.io/no-verflow)

## As Per My Last Card
[//]: # (html: project, feature-complete)

Card game about corporate warfare. Small startup vs. massive corporation. Made for the **1 bit game jam** (theme: Capitalism). I did **development** with AhaUser1 (who also did the artwork). The corporation plays a card each turn, you try to survive as long as possible. Music by DELLTAmusic.

**Language: C# (Unity)**
**Role: Developer (gameplay, UI, logic)**
**Technologies: Unity**
[**Itch.io**](https://ahawarrior1.itch.io/as-per-my-last-card)

## Minor Projects
[//]: # (html: group, feature-complete)

- **Block Sponsor Comments** - A browser extension that removes sponsors from YouTube video descriptions and comments using simple string matching. The extension is feature-complete but still receives updates as I add new strings to the blocklist. [**Chrome**](https://chromewebstore.google.com/detail/block-sponsor-comments/ajfpidfnjbpldhaokhiclamancibkamm), [**Edge**](https://chromewebstore.google.com/detail/block-sponsor-comments/ajfpidfnjbpldhaokhiclamancibkamm), [**Firefox**](https://addons.mozilla.org/en-US/firefox/addon/block-sponsor-comments/)

## Find me literally anywhere

- **Website**: [magicjinn.github.io](https://magicjinn.github.io/MagicJinn/)
- **Itch.io**: [MagicJinn](https://magicjinn.itch.io/)
- **GitHub**: [MagicJinn](https://github.com/MagicJinn)
- **YouTube**: [MagicJinn](https://youtube.com/@magicjinn)
- **Twitch**: [MagicJinn](https://twitch.tv/magicjinn)
- **Twitter**: [@MagicJinn__](https://x.com/MagicJinn__)
- **LinkedIn**: [Marijn Bogerd](https://www.linkedin.com/in/marijn-bogerd-93bb0a2a4/)
- **Instagram**: [manderinjo](https://instagram.com/manderinjo/)
- **Discord**: [MagicJinn's Realm](https://discord.gg/bQvtauxXWp)
- **Nexusmods**: [MagicJinn](https://nexusmods.com/users/88893538)
- **Modrinth**: [MagicJinn](https://modrinth.com/user/MagicJinn)
- **Curseforge**: [MagicJinn](https://www.curseforge.com/members/magicjinn_/)
- <sub>**Steam**: [MagicJinn](https://steamcommunity.com/id/MagicJinn/)</sub>
- <sub>**Speedrun.com**: [MagicJinn](https://speedrun.com/user/MagicJinn)</sub>

## Support Me

I have a Ko-fi. Ko-fi lends itself more to one-time donations, but also supports a subscription model, and doesn't take a commission. While donations are always appreciated, they are in no way required. I will always continue to try and make awesome stuff, regardless of whether or not I get paid.

- **Ko-fi**: [MagicJinn](https://ko-fi.com/magicjinn)

## Contact

- Email: [MagicJinn@MagicJinn.net](mailto:MagicJinn@MagicJinn.net)
- Discord: @MagicJinn
