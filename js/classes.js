class Sprite { //cria propriedades para o que for inserido dentro do canvas
    constructor({ position, imageSrc, scale = 1, framesMax = 1 }){
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale 
        this.framesMax = framesMax 
        this.framesCurrent = 0 
        this.framesElapsed = 0
        this.framesHold = 5
    }

    draw(){ //mostra as imagens na tela dentro do canvas
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesMax)* this.scale, 
            this.image.height * this.scale)
    }    

    update(){
        this.draw()
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax -1){ //chama os frames até que voltem para o frame 0
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }    
}

class Fighter {
    constructor({position, velocity, color = 'red', offset }){
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox ={
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttaking
        this.health = 100
    }

    draw(){
        c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //ATTACK BOX
    if (this.isAttaking) {
    c.fillStyle = 'green'
    c.fillRect(
        this.attackBox.position.x, 
        this.attackBox.position.y, 
        this.attackBox.width, 
        this.attackBox.height )
        }
    }

    update(){ //parte que a gravidade afeta
        this.draw()
        // hitbox segue o player
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= 
            canvas.height -96){ //parte aonde os personagens cai e param
            this.velocity.y = 0;
        }else this.velocity.y += gravity
    }
    attack() {
        this.isAttaking = true
        setTimeout( () => {
            this.isAttaking = false
        }, 100)
    }
}