[Hungarian version](./README-hu.md)

# Public Space Planner

This application is under development for the project laboratory course of the BME-VIK Computer Engineering curriculum, under the advisory of Cserkúti Péter.

## Description

The goal is the realization of a web appilcation by which a public area can be furnished by the people living in the neighbourhood of it. This would happen as a game-like activity, which encourages people to participate in the planning.

The game would consist of two phases:
  
* In the first phase, participants can add items to an (already populated) stock, based on their unique desires and needs. These items can be voted on, commented on for further modifications, etc. The items can be finalized by the operators of the game.
* In the second phase one can put these elements on a stylized map of the area, creating plans. The plans are subject to the same mechanisms as the stock items. The game is over when a certain time limit is passed.

The cental element in the game is the communication between participants, making the most proactive involvement possible.

## Usage

#### The application's current latest version is (<sub><sup>hopefully</sup></sub>) available at: [https://public-space-planner.herokuapp.com](https://public-space-planner.herokuapp.com).

To make this possible, the Heroku configuration uses https://github.com/balazsczap/dotnetcore-buildpack which is a fork of another buildpack, but it is extremely fragile, usable only for this app.

### Running locally

##### Dependencies:
* `.NET Core 1.1 SDK`: https://www.microsoft.com/net/download/core#/current 
  * `preview2-1-003177` is used, 
  <sub><sup>On 2017/03/05 it was available on the above URL.</sup></sub>
* `node.js v6.9.4` & `npm 3.10.10`

##### Installation: 
* in `Client` directory
  * `npm install -g @angular/cli@1.0.0-beta.32.3` if it's not installed
  * `npm install`

* in `Server\PublicSpacePlanner` directory
  * `dotnet restore`

##### Running:

In the root folder: `npm run dev`.
(If you want to launch it in two separate terminals, navigate to the subfolders, and `npm start` both.)

Client starts on the angular-cli default localhost:4200, server starts on the dotnet-core default localhost:5000, and API-calls from the client are proxied to the server.

