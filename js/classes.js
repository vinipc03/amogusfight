class Sprite { //cria propriedades para o que for inserido dentro do canvas
    constructor({ 
        position, 
        imageSrc, 
        scale = 1, 
        framesMax = 1,  
        offset = {x: 0, y:0} 
    }){
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
        this.offset = offset
    }

    draw(){ //mostra as imagens na tela dentro do canvas
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax)* this.scale, 
            this.image.height * this.scale)
    }    

    animateFrames(){
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax -1){ //chama os frames até que voltem para o frame 0
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }

    update(){
        this.draw()
        this.animateFrames()
    }    
}

class Fighter extends Sprite {
    constructor({position, 
        velocity, 
        color = 'red',
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = { x: 0, y:0 },
        sprites
     }){
        super({
            position,
            imageSrc, 
            scale, 
            framesMax,
            offset
        })
        
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
        this.framesCurrent = 0 
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    

    update(){ //parte que a gravidade afeta
        this.draw()
        this.animateFrames()

        // hitbox segue o player
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // FUNÇÃO DA GRAVIDADE
        if (this.position.y + this.height + this.velocity.y >= 
            canvas.height -96){ //parte aonde os personagens cai e param
            this.velocity.y = 0
            this.position.y = 330
        }else this.velocity.y += gravity
    }
    attack() {
        this.isAttaking = true
        setTimeout( () => {
            this.isAttaking = false
        }, 100)
    }

    switchSprite(sprite) {
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image){
                this.image = this.sprites.idle.image
                this.framesMax = this.sprites.idle.framesMax
                this.framesCurrent = 0
                }
                break;
            case 'run':
                if (this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'runl':
                if (this.image !== this.sprites.runl.image){
                    this.image = this.sprites.runl.image
                    this.framesMax = this.sprites.runl.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image){  
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image){  
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}