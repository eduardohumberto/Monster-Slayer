new Vue({
    el:"#app",
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning: false,
        turns:[]
    },
    methods:{
        startGame:function () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = true;
        },
        attack:function () {
            this.monsterHealth -= this.calculateDamage(3,10);
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },
        specialAttack:function () {
            this.monsterHealth -= this.calculateDamage(10,20);
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },
        heal:function () {
            if(this.playerHealth<=90){
                this.playerHealth += 10;
            }else{
                this.playerHealth = 100;
            }
            this.playerHealth += 10;
            this.monsterAttacks();
        },
        giveUp:function () {
            this.gameIsRunning = false;
        },
        monsterAttacks:function(){
            this.playerHealth -= this.calculateDamage(5,12);
            this.checkWin()
        },
        calculateDamage:function (min,max) {
            return Math.max(Math.floor(Math.random() * max) + 1,min);
        },
        checkWin:function () {
            if(this.playerHealth <= 0){
                if(confirm('GG u won!,new game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }else if(this.monsterHealth <= 0){
                if(confirm('Loser!,new game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }

});