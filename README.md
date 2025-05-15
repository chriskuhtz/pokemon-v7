# Running the project

1. create a new Branch
2. npm install
3. npm run dev
4. put a devmode=true entry into your localstorage

# Creating a new Map

1. create a new MapId in mapsRecord.ts
2. create a new Map File with an export of type OverworldMap in /src/constants/maps (you can copy EmptyMap from mapsRecord.ts)
3. link your mapId to the exported map in mapsRecord.ts
4. add your mapId to mapMakerRoutes in Routing.ts
5. start the project with devmode
6. access the mapmaker through the main menu

# Adding a tileset

1. tilesets are png files in which 16x16px represent one tile for the game
2. add a new tileset png in /public/tilesets
3. define it in tileMaps.ts with its size
4. add it to tileMapsRecord in tileMaps.ts
5. now you can add it as tilesetUrl to your map
