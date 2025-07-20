# Running the project

1. create a new Branch
2. npm install
3. npm run dev
4. for put a devmode=true entry into your localstorage

# Creating your own Game version

1. make a new branch called /edition/NAME_OF_YOUR_GAME
2. build your game through the constants/gameData folder
3. duplicate your gameData folder into /NAME_OF_YOUR_GAME_edition to avoid merge issues when keeping up with main branch
4. If you want to implement new features, please consider making a separate Branch and Pull Request into main

# Creating a new Map

1. create a new MapId in mapsRecord.ts
2. create a new Map File with an export of type OverworldMap in /src/constants/maps (you can copy EmptyMap from mapsRecord.ts)
3. link your mapId to the exported map in mapsRecord.ts
4. start the project with devmode
5. access the mapmaker through the main menu
6. Maps are rendered in layers with different properties
   1. Base Layer is the basic background
   2. Decoration Layer is partially transparent tiles that need the base background
   3. Foreground Layer is for tiles that should be rendered "in front" of the character, like the tops of trees
   4. Obstacle Layer is impassable
   5. Water Layer is only passable if the player can swim
   6. Encounter Layer leads to wild pokemon battles (if you define encounter tiles, you must also define at least some base encounters)
7. Your latest map is always copied into your clipboard
8. paste your copied map as the "tilemap" property in your file
9. occupants and encounters can be defined directly in the code (bc your map file will be large and slow to format, you should define encounters and occupants in separate files and import them)

# Adding a tileset

1. tilesets are png files in which 16x16px represent one tile for the game
2. add a new tileset png in /public/tilesets
3. define it in tileMaps.ts with its size
4. add it to tileMapsRecord in tileMaps.ts
5. now you can add it as tilesetUrl to your map
