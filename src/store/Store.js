import { observable, action, decorate } from 'mobx';

class Store {
    modeGames = {};
    choosenModeGame = {};
    isPlay = false;
    playerName = '';
    url = 'https://starnavi-frontend-test-task.herokuapp.com/';
    gameSettings = [];
    grid = [];
    count = 0;
    gameScore = {
        player: 0,
        computer: 0,
        countForWin: 0,
    }
    playerWinner = '';
    setPlayerWinner (props) {
        this.playerWinner = props;
    }
    leaderBoards = [];
    setGameScore(props){
        this.gameScore = JSON.parse(JSON.stringify(props));
    }
    setCount (props) {
        this.count = props;
    }
    setModeGames(props) {
        this.modeGames = JSON.parse(JSON.stringify(props));
    }
    setIsPlay(props) {
        this.isPlay = props;
    }
    setPlayerName(props) {
        this.playerName = props;
    }
    setChoosenModeGame(props) {
        this.choosenModeGame = JSON.parse(JSON.stringify(props));
    }
    setGrid(props){
        this.grid = [...props];
    }
    async getGameSetings() {
        return fetch(`${this.url}game-settings`, {
            method: 'GET'
        }).then(res => res.json())
            .then(res => {
                this.gameSettings = Object.entries(res);
                this.modeGames = res;
            })
    }
    async getWinners() {
        return fetch(`${this.url}winners`, {
            method: 'GET'
        }).then(res => res.json()).then(res => this.leaderBoards = [...res])
    }
    async sendWinningPlayer(data) {
        fetch(`${this.url}winners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .catch(error => console.error('Ошибка:', error));
    }
    

}
decorate(Store, {
    leaderBoards: observable,
    modeGames: observable,
    isPlay: observable,
    playerName: observable,
    gameSettings: observable,
    choosenModeGame: observable,
    grid: observable,
    count: observable, 
    gameScore: observable,
    playerWinner: observable,

    setPlayerWinner: action,
    setGameScore: action,
    setCount: action,
    setIsPlay: action,
    setModeGames: action,
    setPlayerName: action,
    setChoosenModeGame: action,
    setGrid: action
});

const store = new Store();
store.getGameSetings()
export default store;
export { Store };