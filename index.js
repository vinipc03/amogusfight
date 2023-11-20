const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 130
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax : 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax : 8,
            
        },
        runl: { //MOVIMENTAÇÃO PARA ESQUERDA
            imageSrc: './img/samuraiMack/Runl.png',
            framesMax : 8,
            
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax : 2,
            
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax : 2,
        }

    }
})

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    }
})

console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

decreaseTimer()

function animate() { //função que cria animações e põe coisas na tela
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    //enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    
    //MOVIMENTAÇÃO DO JOGADOR
    
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5 
        player.switchSprite('runl')
        // player.image = player.sprites.runl.image //movimentação para esquerda
    }else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
        player.switchSprite('run')
        //player.image = player.sprites.run.image //movimentação para direita
    } else {
        player.switchSprite('idle')
    }

    // PULO
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0){
        player.switchSprite('fall')
    }

    //MOVIMENTAÇÃO DO INIMIGO
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    }else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5
    }

    // DETECÇÃO DE COLISÃO
    if ( 
        retangularCollision({
            retangle1: player,
            retangle2: enemy
        }) &&
        player.isAttaking) {
        player.isAttaking = false
        enemy.health -= 20
        document.querySelector('#vidaInimigo').style.width = enemy.health + '%'
        console.log('ataque do jogador');
    }

    if ( 
        retangularCollision({
            retangle1: enemy,
            retangle2: player
        }) &&
        enemy.isAttaking) {
        enemy.isAttaking = false
        document.querySelector('#vidaJogador').style.width = player.health + '%'
        player.health -= 20
        console.log('ataque do inimigo');
    }

    // finalizar o jogo baseado na vida dos personagens
    if (enemy.health <= 0 || player.health <=0) {
        determineWinner({ player, enemy, timerId })
    }
}


animate()


window.addEventListener('keydown', (event) => {

    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break
        case ' ':
            player.attack()
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
        case 'ArrowDown':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
        break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
    }

    //teclas do inimigo
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
})