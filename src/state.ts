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
    this.setState({ data });
  },
  setState({ data }) {
    this.data = data;
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
  move(move: Play) {
    //la jugada del jugador
    const { data } = this.getState();
    data.game.player.push(move);
    //jugada de la maquina
    const computerPlay: Play = this.getComputerMove();
    data.game.computer.push(computerPlay);
    this.setState(data);
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
    const { data } = this.getState();
    const { game } = data;
    return game.results.reduce((prev, act) => {
      return act < 0 ? prev + 1 : prev;
    }, 0);
  },
  getPlayerScore() {
    const { data } = this.getState();
    const { game } = data;
    return game.results.reduce((prev, act) => {
      return act > 0 ? prev + 1 : prev;
    }, 0);
  },
};
