import Phaser from "phaser"
import { useEffect, useRef, useState } from "react"
import Shuffle from "phaser/src/utils/array/Shuffle.js"
import { useOutletContext } from "react-router-dom"

function Blackjack() {

    const gameRef = useRef(null)
    const [restart, setRestart] = useState(0)
    const [currentUser, setCurrentUser] = useOutletContext()
    let points = 0

    useEffect(() => {

        fetch('/api/check-session')
        .then(res => res.json())
        .then(data => {
            points = data.points
            // console.log(points)
        })

        if (gameRef.current) {
            return
        }

        class StartGame extends Phaser.Scene {
            betAmount = 10

            constructor() {
                super('startGame')
            }

            create () {
                const startGame = this.add.text(250, 300, 'Start Game? Min 10 point buy-in.')
                .setInteractive()
                .on('pointerdown', () => {
                    // buy in fetch request
                    console.log(`Buy in with ${this.betAmount} points`)
                    console.log(points)
                    const newTotal = points - this.betAmount
                    console.log(newTotal)
                    fetch('/api/points', {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            'points': (newTotal)
                        })
                    })
                    .then(res => res.json())
                    .then(data => console.log(data.points))
                    this.scene.start('blackjack', {
                        bet: this.betAmount
                    })
                })
                
                const bet = this.add.text(390, 350, this.betAmount)

                const decrease = this.add.text(330, 350, '-10')
                .setInteractive()
                .on('pointerdown', () => {
                    if (this.betAmount > 10) {
                        this.betAmount -= 10
                        bet.setText(this.betAmount)
                    }
                })

                const increase = this.add.text(440, 350, '+10')
                .setInteractive()
                .on('pointerdown', () => {
                    this.betAmount += 10
                    bet.setText(this.betAmount)
                })
            }
        }

        class Blackjack extends Phaser.Scene {

            // dealer/player card sprites
            dealer = []
            player = []
            // dealer first card
            hiddenCard = {}
            // dealer/player array of card values
            dealerHand = []
            playerHand = []
            // dealer/player hand value
            dealerValue = 0
            playerValue = 0
            // player pressed stand
            standing = false

            deck = ['AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD', 'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC', 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH', 'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS',
            
            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD', 'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC', 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH', 'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS',

            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD', 'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC', 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH', 'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS',

            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD', 'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC', 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH', 'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS',

            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD', 'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC', 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH', 'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS',

            'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD', 'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC', 'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH', 'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS',
            ]

            constructor () {
                super('blackjack')
            }

            init (data) {
                this.bet = data.bet
            }

            preload() {
                // Diamonds
                this.load.image('AD', 'assets/Blackjack/D/A.png')
                this.load.image('2D', 'assets/Blackjack/D/2.png')
                this.load.image('3D', 'assets/Blackjack/D/3.png')
                this.load.image('4D', 'assets/Blackjack/D/4.png')
                this.load.image('5D', 'assets/Blackjack/D/5.png')
                this.load.image('6D', 'assets/Blackjack/D/6.png')
                this.load.image('7D', 'assets/Blackjack/D/7.png')
                this.load.image('8D', 'assets/Blackjack/D/8.png')
                this.load.image('9D', 'assets/Blackjack/D/9.png')
                this.load.image('0D', 'assets/Blackjack/D/0.png')
                this.load.image('JD', 'assets/Blackjack/D/J.png')
                this.load.image('QD', 'assets/Blackjack/D/Q.png')
                this.load.image('KD', 'assets/Blackjack/D/K.png')

                // Clubs
                this.load.image('AC', 'assets/Blackjack/C/A.png')
                this.load.image('2C', 'assets/Blackjack/C/2.png')
                this.load.image('3C', 'assets/Blackjack/C/3.png')
                this.load.image('4C', 'assets/Blackjack/C/4.png')
                this.load.image('5C', 'assets/Blackjack/C/5.png')
                this.load.image('6C', 'assets/Blackjack/C/6.png')
                this.load.image('7C', 'assets/Blackjack/C/7.png')
                this.load.image('8C', 'assets/Blackjack/C/8.png')
                this.load.image('9C', 'assets/Blackjack/C/9.png')
                this.load.image('0C', 'assets/Blackjack/C/0.png')
                this.load.image('JC', 'assets/Blackjack/C/J.png')
                this.load.image('QC', 'assets/Blackjack/C/Q.png')
                this.load.image('KC', 'assets/Blackjack/C/K.png')

                // Hearts
                this.load.image('AH', 'assets/Blackjack/H/A.png')
                this.load.image('2H', 'assets/Blackjack/H/2.png')
                this.load.image('3H', 'assets/Blackjack/H/3.png')
                this.load.image('4H', 'assets/Blackjack/H/4.png')
                this.load.image('5H', 'assets/Blackjack/H/5.png')
                this.load.image('6H', 'assets/Blackjack/H/6.png')
                this.load.image('7H', 'assets/Blackjack/H/7.png')
                this.load.image('8H', 'assets/Blackjack/H/8.png')
                this.load.image('9H', 'assets/Blackjack/H/9.png')
                this.load.image('0H', 'assets/Blackjack/H/0.png')
                this.load.image('JH', 'assets/Blackjack/H/J.png')
                this.load.image('QH', 'assets/Blackjack/H/Q.png')
                this.load.image('KH', 'assets/Blackjack/H/K.png')

                // Spades
                this.load.image('AS', 'assets/Blackjack/S/A.png')
                this.load.image('2S', 'assets/Blackjack/S/2.png')
                this.load.image('3S', 'assets/Blackjack/S/3.png')
                this.load.image('4S', 'assets/Blackjack/S/4.png')
                this.load.image('5S', 'assets/Blackjack/S/5.png')
                this.load.image('6S', 'assets/Blackjack/S/6.png')
                this.load.image('7S', 'assets/Blackjack/S/7.png')
                this.load.image('8S', 'assets/Blackjack/S/8.png')
                this.load.image('9S', 'assets/Blackjack/S/9.png')
                this.load.image('0S', 'assets/Blackjack/S/0.png')
                this.load.image('JS', 'assets/Blackjack/S/J.png')
                this.load.image('QS', 'assets/Blackjack/S/Q.png')
                this.load.image('KS', 'assets/Blackjack/S/K.png')

                this.load.image('back', 'assets/Blackjack/backs/tile000.png')
                this.load.image('deck', 'assets/Blackjack/deck/tile001.png')
            }

            create () {
                Shuffle(this.deck)
                
                this.playerScore = this.add.text(100, 400, `Hand Value: ${this.playerValue}`)
                this.dealerScore = this.add.text(100, 100, `Hand Value: ${this.dealerValue}`)

                this.deal(this.player)
                this.deal(this.dealer, true)
                this.deal(this.player)
                this.deal(this.dealer)


                const hitButton = this.add.text(500, 400, 'Hit')
                .setInteractive()
                .on('pointerdown', () => {
                    if (this.standing == false){
                        this.deal(this.player)
                    }
                    if (this.playerValue > 21) {
                        this.endGame('Dealer')
                        this.scene.pause()
                    }
                })

                const standButton = this.add.text(700, 400, 'Stand')
                .setInteractive()
                .on('pointerdown', () => {
                    this.standing = true
                    this.stand()
                })
                // TODO Add total points in users account display
            }

            deal(hand, hidden=false) {
                const cardX = 100 + (hand.length * 50)
                let cardY, currentHand, currentValue, currentScore
                if (hand == this.player) {
                    cardY = 500
                    currentHand = this.playerHand
                    // currentValue = this.playerValue
                    currentScore = this.playerScore
                }
                if (hand == this.dealer) {
                    cardY = 200
                    currentHand = this.dealerHand
                    // currentValue = this.dealerValue
                    currentScore = this.dealerScore
                }
                const card = this.deck.pop()
                if (hidden == false) {
                    const cardObj = this.add.sprite(cardX, cardY, card)
                    hand.push(cardObj)
                    currentHand.push(this.cardValue(card))
                }
                else {
                    const cardObj = this.add.sprite(cardX, cardY, 'back')
                    this.hiddenCard = {
                        'code': card,
                        'value': this.cardValue(card)
                    }
                    hand.push(cardObj)
                    currentHand.push(0)
                }
                this.checkScore()
            }

            cardValue(card) {
                let value
                switch (card[0]) {
                    case 'A':
                        value = 11
                        break
                    case 'J':
                        value = 10
                        break
                    case 'Q':
                        value = 10
                        break
                    case 'K':
                        value = 10
                        break
                    case '0':
                        value = 10
                        break
                    default:
                        value = parseInt(card[0])
                        break
                }
                return value
            }

            checkScore() {
                this.playerValue = this.updateScore(this.playerHand)
                this.playerScore.setText(`Hand Value: ${this.playerValue}`)
                this.dealerValue = this.updateScore(this.dealerHand)
                this.dealerScore.setText(`Hand Value: ${this.dealerValue}`)
            }

            updateScore(hand) {
                const initValue = 0
                let sum = hand.reduce((accumulator, currentValue) => 
                    accumulator + currentValue, initValue
                )
                while (sum > 21 && hand.includes(11)){
                    const ace = hand.indexOf(11)
                    hand[ace] = 1
                    sum = hand.reduce((accumulator, currentValue) => 
                    accumulator + currentValue, initValue
                )
                }
                return sum
            }

            stand () {
                this.dealer[0].setTexture(this.hiddenCard['code'])
                this.dealerHand[0] = this.hiddenCard['value']
                this.dealerValue = this.updateScore(this.dealerHand)
                this.dealerScore.setText(`Hand Value: ${this.dealerValue}`)
                while (this.dealerValue < 17) {
                    this.deal(this.dealer)
                    this.dealerValue = this.updateScore(this.dealerHand)
                    this.dealerScore.setText(`Hand Value: ${this.dealerValue}`)
                }
                if (this.dealerValue > 21) {
                    this.endGame('Player')
                }
                else if (this.dealerValue > this.playerValue) {
                    this.endGame('Dealer')
                }
                else if (this.dealerValue < this.playerValue) {
                    this.endGame('Player')
                }
                else if (this.dealerValue == this.playerValue) {
                    this.endGame('Tie')
                }
            }

            endGame (winner) {
                if (winner == 'Tie') {
                    const bust = this.add.text(350, 300, `It's a Tie`)
                    fetch('/api/points', {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            'points': (points)
                        })
                        .then(res => res.json())
                        .then(data => {
                            console.log(`Players Point total is now ${data.points}`)
                        })
                    })
                }
                else {
                    const bust = this.add.text(350, 300, `${winner} wins.`)
                }
                if (winner == 'Player'){
                    fetch('/api/points', {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            'points': (points + this.bet)
                        })
                        .then(res => res.json())
                        .then(data => {
                            console.log(`Players Point total is now ${data.points}`)
                        })
                    })
                }
                const restartGame = this.add.text(350, 350, 'Play Again?')
                .setInteractive()
                .on('pointerdown', () => {
                    setRestart(restart + 1)
                })
            }
        }

        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_VERTICALLY
            },
            backgroundColor: '#35654d',
            scene: [StartGame, Blackjack],
            parent: "blackjack"
        }

        gameRef.current = new Phaser.Game(config)

        return () => {
            gameRef.current.destroy(true)
            gameRef.current = null
        }
    })

    return (
        <div id='blackjack'></div>
    )
}

export default Blackjack