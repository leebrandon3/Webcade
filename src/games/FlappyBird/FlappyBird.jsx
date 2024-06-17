import Phaser from "phaser";
import { useEffect, useRef } from "react";

function FlappyBird() { 

    const gameRef = useRef(null)

    useEffect(() => {

        let points = 0

        fetch('/api/check-session')
        .then(res => res.json())
        .then(data => {
            points = data.points
        })

        if (gameRef.current) {
            return
        }

        class StartGame extends Phaser.Scene {
            constructor () {
                super('startgame')
            }

            preload () {
                this.load.image('background', 'assets/FlappyBird/background-day.png')
            }

            create () {
                this.background = this.add.tileSprite(144, 256, 288, 512, 'background')
                const play = this.add.text(50, 256, 'Press space to jump!')
                this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
            }

            update () {
                this.background.tilePositionX +=0.5
                if (this.spaceKey.isDown) {
                    this.scene.start('flappybird')
                }
            }
        }

        class FlappyBird extends Phaser.Scene {
            background
            bird
            pipe
            scoreValue
            pauseValue = false

            constructor () {
                super('flappybird')
            }
        
            preload () {
                this.load.image('bird', 'assets/FlappyBird/yellowbird-midflap.png')
                this.load.image('bird-up', 'assets/FlappyBird/yellowbird-downflap.png')
                this.load.image('bird-down', 'assets/FlappyBird/yellowbird-upflap.png')
                this.load.image('background', 'assets/FlappyBird/background-day.png')
                this.load.image('pipe', 'assets/FlappyBird/pipe-green.png')
                this.load.image('sensor', 'assets/FlappyBird/rect1.png')
                this.load.image('restart', '/assets/FlappyBird/restart.png')
                this.load.image('restart-hover', '/assets/FlappyBird/restart-hover.png')
                this.load.image('restart-press', '/assets/FlappyBird/restart-press.png')
            }
        
            create () {
                this.background = this.add.tileSprite(144, 256, 288, 512, 'background')
                this.bird = this.physics.add.sprite(144, 256, 'bird')
                    .setCollideWorldBounds(true)

                this.pipe = this.physics.add.group({
                    defaultKey: 'pipe',
                    collideWorldBounds: false,
                    allowGravity: false,
                })
                this.sensor = this.physics.add.group({
                    defaultKey: 'sensor',
                    collideWorldBounds: false,
                    allowGravity: false,
                })

                this.scoreValue = 0

                this.score = this.add.text(20, 20, `Score: ${this.scoreValue}`)
                this.score.setDepth(1)
                this.score.setTint("0x000000")
    
                this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    
                this.timedEvent = this.time.addEvent({
                    delay: 3000,
                    callback: this.onEvent,
                    callbackScope: this,
                    loop: true
                })
                this.physics.add.collider(this.bird, this.pipe, () => {

                    this.pauseValue = true
                    this.gameover = this.add.text(95, 256, 'Game Over!')
                    this.gameover.setTint("0x000000")
                    const restart = this.add.sprite(144, 300, 'restart').setInteractive()

                    fetch('/api/points', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            'points': this.scoreValue + points
                        })
                    })
                    .then(res => {
                        if (res.ok){
                            res.json()
                            .then(data => {
                                console.log(`${this.scoreValue} added! Original: ${points}, New: ${data.points}`)
                            })
                        }
                        else {
                            alert("Not logged in!")
                        }
                    })

                    fetch('/api/score', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            'game': 'flappybird',
                            'score': this.scoreValue
                        })
                    })
                    .then(res => {
                        if (res.ok) {
                            res.json()
                            .then(data => {
                                console.log('Saved new score onto database!')
                            })
                        }
                    })

                    restart.on('pointerdown', () => {
                        restart.setTexture('restart-press')
                        this.scene.restart()
                        this.pauseValue = false
                        this.scoreValue = 0
                    })

                    restart.on('pointerout', () => {
                        restart.setTexture('restart')
                    })

                    restart.on('pointerup', () => {
                        restart.setTexture('restart-hover')
                    })

                    this.physics.world.bodies.iterate(body => {
                        if (body != this.restart) {
                            body.setVelocity(0)
                            body.moves = false
                        }
                    })
                })
            }
        
            update() {
                this.background.tilePositionX +=0.5

                if (this.spaceKey.isDown) {
                    this.bird.setVelocityY(-250)
                }
                if (this.bird.body.velocity.y > 0){
                    this.bird.setTexture('bird-down')
                }
                if (this.bird.body.velocity.y < 0){
                    this.bird.setTexture('bird-up')
                }
            }
    
            onEvent() {
                if (this.pauseValue == false){
                    // random from y:360 pixels to y:600
                    const randY = Phaser.Math.Between(360, 550)
                    // pipe pixel dimensions x:52 y:320
                    this.pipe.create(350, randY, 'pipe')
                    // inverse pipe has an difference of y:320
                    this.pipe.create(350, randY-420, 'pipe').setFlipY(true)
                    const sensor = this.sensor.create(400, randY-210, 'sensor')
                    sensor.setVisible(false)
                    console.log(randY)
                    this.pipe.setVelocityX(-75)
                    sensor.setVelocityX(-75)
                    sensor.alreadyTriggered = false

                    this.physics.add.overlap(this.bird, this.sensor, this.handleOverlap, null, this)
                }
            }

            handleOverlap(bird, sensor) {
                if(!sensor.alreadyTriggered){
                    sensor.alreadyTriggered = true
                    this.scoreValue += 10
                    this.score.setText(`Score: ${this.scoreValue}`)
                }
            }
        }

        var config = {
            type: Phaser.AUTO,
            width: 288,
            height: 512,
            // width: 576,
            // height: 1024,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_VERTICALLY
            },
            physics: {
                default: 'arcade',
                arcade: {
                    // final build gravity 1000, testing
                    gravity: { y: 1000 },
                    debug: false
                }
            },
            scene: [StartGame, FlappyBird],
            parent: "flappy-bird"
        }
    
        gameRef.current = new Phaser.Game(config)

        return () => {
            gameRef.current.destroy(true)
            gameRef.current = null
        }
    })


    return (
        <div id="flappy-bird"></div>
    )
}

export default FlappyBird