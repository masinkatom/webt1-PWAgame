export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Helvetica";
        this.level = game.level;
        this.fontColor = "white";
        this.background = new Image();
        this.background.src = "./images/background-sky-night.png";
        this.cobbles = new Image();
        this.cobbles.src = "./images/cobblestone.png";
        this.setWidthOuterDiv();
    }   

    draw(ctx) {
        ctx.drawImage(this.background, 0, 0, 360, 720, 0, 0, this.game.width, this.game.height);
        ctx.font = this.fontSize + "px " + this.fontFamily;
        ctx.textAlign = "left";
        ctx.fillStyle = this.fontColor;
        ctx.fillText("Level " + this.level, 10, this.fontSize + 5);
    }
    
    drawCobbles(ctx) {
        ctx.drawImage(
            this.cobbles, 
            0, this.game.height - (this.game.height / 5.3), 
            this.game.width, this.game.height / 5.3
        );
    }

    drawStartMsg(ctx) {
        ctx.font = 18 + "px " + this.fontFamily;
        ctx.textAlign = "left";
        ctx.fillStyle = this.fontColor;
        ctx.fillText("KLIKNI NA OBRAZOVKU", 10, this.game.height / 2);
    }

    // sets the width of outer canvas div to place ui elements correctly
    setWidthOuterDiv() {
        let outerDiv = document.getElementById("gameContain");
        outerDiv.style.width = this.game.width + 6 + "px";
    }



}