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
            this.turns = [];
        },
        attack:function () {
            var damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                txt:'Player hits the monster for '+damage
            });

            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },
        specialAttack:function () {
            var damage = this.calculateDamage(10,20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                txt:'Player hits the monster with a special attack for '+damage
            });
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
            this.turns.unshift({
                isPlayer:true,
                txt:'Player heals for 10'
            });
            this.monsterAttacks();
        },
        giveUp:function () {
            this.gameIsRunning = false;
        },
        monsterAttacks:function(){
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer:false,
                txt:'Monster hits PLayer for '+ damage
            });
            this.checkWin();
        },
        calculateDamage:function (min,max) {
            return Math.max(Math.floor(Math.random() * max) + 1,min);
        },
        checkWin:function () {
            if(this.playerHealth <= 0){
                if(confirm('Loser!,new game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }else if(this.monsterHealth <= 0){
                if(confirm('GG u won!,new game?')){
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