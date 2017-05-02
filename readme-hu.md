# Public Space Planner

Az alkalmazás a BME-VIK Mérnökinformatikus BsC képzés Önálló laboratórium tárgyának keretein belül készül.

## Leírás

A cél egy olyan webalkalmazás megvalósítása, mely által egy közösségi területet a környezetében lakó emberek közösen rendezhessenek be. 
Ez egy egyszeri, játékszerű aktivitás keretében fog zajlani.

Két fázisból áll:
  
* Az első fázisban a résztvevők egy (már előre elkészített) készlethez adhatnak hozzá elemeket,
az egyedi elképzeléseik és szükségleteik alapján. Lehet rájuk szavazni, extra javaslatokat tenni, stb.
Az elemeket a játék üzemeltetői végérvényesíthetik.
* A második fázisban ezekből az elemekből a terület térképére helyezhetnek el tetszőlegesen, 
a különböző elhelyezésekről szavazni lehet. A játék vége az játékidő lejártával történik.

Központi elem a résztvevők közötti kommunikáció, a minél proaktívabb részvétel lehetővé tétele.

## Használat

#### A projekt (<sub><sup>reményeim szerint</sup></sub>) mindenkori buildelt változata elérhető a https://public-space-planner.herokuapp.com címen.

Ehhez a https://github.com/balazsczap/dotnetcore-buildpack -et használja, ami részben saját fejlesztés, viszont jelenlegi állapotában
csak ehhez a projekthez használható megbízhatóan.

### Lokális futtatáshoz:

##### Szükséges:
* A `.NET Core 1.1 SDK`: https://www.microsoft.com/net/download/core#/current 
  * A `preview2-1-003177`-es verzió van jelenleg használatban, 
  <sub><sup>2017.03.05-én és korábban ez volt megtalálható a fenti linken.</sup></sub>
* `node.js v6.9.4` és `npm 3.10.10`

##### Telepítés: 
* a `Client` könyvtárban
  * `npm install -g @angular/cli@1.0.0-beta.32.3` ha még nem lenne telepítve
  * `npm install`

* a `Server\PublicSpacePlanner` könyvtárban
  * `dotnet restore`

##### Futtatás:

A projekt gyökérkönyvtárában `npm run dev`.

Ha két külön parancssorban szeretnénk futtatni:
* a Client könyvtárban `npm start`,
* a Server\PublicSpacePlanner könyvtárban `dotnet run --environment=Development`

parancsok hatására a kliens a localhost:4200, a szerver a localhost:5000-es portján indul, és ide van irányítva a kliens összes api hívása is.
