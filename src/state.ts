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
    console.log("state init");
    const { data } = this.storage.get("saved-state");
    const newState = { ...this.data.game, ...data };
    this.setState(newState);
  },
  setState(data) {
    this.data = data;
    this.storage.save("saved-state", data);
    for (const cb of this.listeners) {
      cb(this.getState());
    }
  },
  getState() {
    const data = this.storage.get("saved-state");
    return data;
  },
  subscribe(callback) {
    this.listeners.push(callback);
  },
  move(playerPlay: Play) {
    //la jugada del jugador
    const game = this.getState();
    game.player.push(playerPlay);
    //jugada de la maquina
    const computerPlay: Play = this.getComputerMove();
    game.computer.push(computerPlay);
    const result = this.whoWins(computerPlay, playerPlay);
    game.results.push(result);
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
    // si son iguales -> 0
    // si pc es tijera ->
    //    si player papel -> player pierde
    //    si player piedra -> player gana

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
    //quien va ganando en TOTAL,
    // todo: ver si la funcion queda o se va
    const result = results.reduce((a, b) => a + b);
    return result == 0 ? "empate" : result > 0 ? "player" : "computer";
  },
  getComputerScore() {
    const game = this.getState();
    return game.results.reduce((prev, act) => {
      return act < 0 ? prev + 1 : prev;
    }, 0);
  },
  getPlayerScore() {
    const game = this.getState();
    return game.results.reduce((prev, act) => {
      return act > 0 ? prev + 1 : prev;
    }, 0);
  },
  getLastResult() {
    const game = this.getState();
    return game.results.at(-1);
  },
  resetResults() {
    this.setState({
      player: [],
      computer: [],
      results: [],
    });
    // this.setState();
  },
};
