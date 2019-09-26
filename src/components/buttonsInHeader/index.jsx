import React from "react";
import { inject, observer } from "mobx-react";
import { Select, Button, Input, message } from "antd";
import "./btnInHeader.css";
const { Option } = Select;
let moment = require("moment");

class Headers extends React.Component {
  state = { firstGames: false, arr: [] };
  intervalGame = null;

  createGrid = size => {
    let temp = [];
    for (let i = 0; i < +size; i++) {
      temp[i] = [];
      for (let j = 0; j < +size; j++) {
        temp[i][j] = {
          classColor: "",
          id: `${i}/${j}`
        };
      }
    }
    return temp;
  };
  randomSort = () => {
    let tempArr = [...this.props.Store.grid];
    let arr = [].concat(...tempArr);
    let j;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  };
  handleChange = value => {
    clearInterval(this.intervalGame);
    this.props.Store.setChoosenModeGame(this.props.Store.modeGames[value]);
    this.props.Store.setIsPlay(false);
    this.props.Store.setPlayerWinner("");
    this.props.Store.setCount(0);
    this.props.Store.setGameScore({ computer: 0, player: 0, countForWin: 0 });
    this.props.Store.setGrid(
      this.createGrid(this.props.Store.modeGames[value].field)
    );
  };
  handleChangeName = name => {
    this.props.Store.setPlayerName(name.target.value);
  };
  gameEnd = winner => {
    // добавить отправку результатов на сервер
    clearInterval(this.intervalGame);
    this.props.Store.setIsPlay(false);
    this.props.Store.setGameScore({ player: 0, computer: 0, countForWin: 0 });
    this.props.Store.setCount(0);
    this.props.Store.setPlayerWinner(winner);
    this.props.Store.sendWinningPlayer({
      winner,
      date: moment().format("H:mm; DD MMMM YYYY")
    });
  };
  checkerCell = () => {
    let counts = this.props.Store.count; //номер ячейки для проверки
    let grids = [...this.props.Store.grid];
    let arr = [...this.state.arr];
    let score = JSON.parse(JSON.stringify(this.props.Store.gameScore));
    if (counts === 0) {
      //если первый элемент, то просто красим в синий цвет
      let [i, j] = arr[counts].id.split("/");
      grids[i][j].classColor = "blue-cell";
      counts = counts + 1;
    } else if (counts === arr.length) {
      //если последний элемент, то только проверяем прыдыдущий
      let [i, j] = arr[counts - 1].id.split("/");
      if (grids[i][j].classColor === "blue-cell") {
        // если предыдущая была синая, добавляем очко комппьютеру
        grids[i][j].classColor = "red-cell";
        score.computer = score.computer + 1;
      } else {
        //иначе мы добавяем очко игроку
        score.player = score.player + 1;
      }
      if (score.player === score.countForWin) {
        //game win player
        this.gameEnd(this.props.Store.playerName);
        return null;
      } else if (score.computer === score.countForWin) {
        this.gameEnd("Computer");
        return null;
      }
    } else {
      // если не перый и не послдений, то проверяем предыдущий и красим в синий текущий
      let [iPrew, jPrew] = arr[counts - 1].id.split("/");
      let [i, j] = arr[counts].id.split("/");
      if (grids[iPrew][jPrew].classColor === "blue-cell") {
        // если предыдущая была синая, добавляем очко комппьютеру
        grids[iPrew][jPrew].classColor = "red-cell";
        score.computer = score.computer + 1;
      } else {
        //иначе мы добавяем очко игроку
        score.player = score.player + 1;
      }
      if (score.player === score.countForWin) {
        this.gameEnd(this.props.Store.playerName);
        return null;
      } else if (score.computer === score.countForWin) {
        this.gameEnd("Computer");
        return null;
      } else {
        grids[i][j].classColor = "blue-cell";
        counts = counts + 1;
      }
    }
    this.props.Store.setCount(counts);
    this.props.Store.setGrid(grids);
    this.props.Store.setGameScore(score);
  };
  handlePlayGame = () => {
    if (
      !this.props.Store.isPlay &&
      Object.entries(this.props.Store.choosenModeGame).length
    ) {
      if (this.props.Store.playerName === "") {
        message.error("enter your name!");
      } else {
        clearInterval(this.intervalGame);
        this.props.Store.setPlayerWinner("");
        let GameScore = this.props.Store.gameScore;
        let field = this.props.Store.choosenModeGame.field;
        this.props.Store.setGrid(this.createGrid(field));
        GameScore.countForWin = Math.floor((field * field) / 2) + 1;
        this.props.Store.setGameScore(GameScore);
        this.props.Store.setIsPlay(true);
        this.intervalGame = setInterval(
          this.checkerCell,
          this.props.Store.choosenModeGame.delay
        );
        this.setState({
          firstGames: true,
          arr: this.randomSort()
        });
      }
    } else {
      message.error("pick game mode or game is plaing");
    }
  };
  render() {
    const { gameSettings, isPlay } = this.props.Store;
    const { firstGames } = this.state;
    const { handleChange, handleChangeName, handlePlayGame } = this;
    return (
      <div className="header-container">
        {gameSettings.length ? (
          <div className="pick-game-mod-select">
            <Select
              style={{ width: 200 }}
              onChange={handleChange}
              defaultValue="Pick game mode"
            >
              {gameSettings.map(item => {
                return (
                  <Option key={item[0]} value={item[0]}>
                    {item[0]}
                  </Option>
                );
              })}
            </Select>
          </div>
        ) : (
          <div> load... </div>
        )}

        <div className="enter-name-input">
          <Input placeholder="Enter your name" onChange={handleChangeName} />
        </div>
        <div className="play-button">
          <Button type="primary" onClick={handlePlayGame}>
            {firstGames && !isPlay ? "PLAY AGAIN" : "PLAY"}
          </Button>
        </div>
      </div>
    );
  }
}
const Header = inject("Store")(observer(Headers));
export default Header;
