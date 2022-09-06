import { Storage } from "./types/storage";
import { State } from "./types/state";
import { Play } from "./types/play";
const moveList: Play[] = ["tijeras", "papel", "piedra"];
export const state: State = {
  data: {
    game: {
      player: [],
      computer: [],
      results: [],
    },
  },
  listeners: [],
  storage: new Storage(),
  init() {
    const data = this.storage.get("saved-state");
    // console.log("data del storage", data);
    const { game } = data;
    const newState = { ...this.data.game, ...game };
    // console.log("data que se le envia a setState: ", newState);
    this.setState(newState);
  },
  setState(data) {
    // console.log("data qu llega al state", data);
    this.data = data;
    // console.log("se actualizo el state: ", this.data);
    this.storage.save("saved-state", data);
    for (const cb of this.listeners) {
      cb(this.getState());
    }
  },
  getState() {
    return this.data;
  },
  subscribe(callback) {
    this.listeners.push(callback);
  },
  move(playerPlay: Play) {
    //la jugada del jugador
    const game = this.getState();
    // console.log("state dentro de move:", game);
    game.player.push(playerPlay);
    //jugada de la maquina
    const computerPlay: Play = this.getComputerMove();
    game.computer.push(computerPlay);
    const result = this.whoWins(computerPlay, playerPlay);
    game.results.push(result);
    // console.log("state que se genera despues de una jugada:", game);
    this.setState(game);
  },
  getComputerMove() {
    const randNumber: number = Math.floor(Math.random() * 3);
    const computerPlay: Play = moveList[randNumber];
    return computerPlay;
  },
  whoWins(computer: Play, player: Play) {
    // -1 gana pc
    // 0 empate
    // 1 gana player
    if (computer === player) {
      return 0;
    } else {
      if (computer === "tijeras") {
        return player === "papel" ? -1 : 1;
      }
      if (computer === "papel") {
        return player === "piedra" ? -1 : 1;
      }
      if (computer === "piedra") {
        return player === "tijeras" ? -1 : 1;
      }
    }
  },
  matchResult(results: number[]) {
    const result = results.reduce((a, b) => a + b);
    return result == 0 ? "empate" : result > 0 ? "player" : "computer";
  },
  getComputerScore() {
    const game = this.getState();
    return game.results.reduce((prev, act) => {
      // console.log("actual: ", act);
      return act < 0 ? prev + 1 : prev;
    }, 0);
  },
  getPlayerScore() {
    const game = this.getState();
    // console.log("state dentro de getplayerScore", game);
    return game.results.reduce((prev, act) => {
      return act > 0 ? prev + 1 : prev;
    }, 0);
  },
  resetResults() {
    const resetedState = {
      game: {
        player: [],
        computer: [],
        results: [],
      },
    };
    // console.log("state reset: ", resetedState);
    this.setState(resetedState.game);
  },
};

// state.resetResults();
