import Phaser from "phaser"
import { useEffect, useRef } from "react"

function Blackjack() {

    const gameRef = useRef(null)

    useEffect(() => {

        if (gameRef.current) {
            return
        }

        class Scene extends Phaser.Scene {

            // Unique deck ID
            deckID = ''
            // dealer/player card sprites
            dealer = []
            player = []
            // dealer/player array of card values
            dealerHand = []
            playerHand = []
            // dealer/player hand value
            dealerValue = 0
            playerValue = 0
            // dealer/player hand value display text
            dealerScore
            playerScore

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

            async create () {
                const res = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
                const data = await res.json()
                this.deckID = await data['deck_id']

                this.playerScore = this.add.text(100, 400, `Hand Value: ${this.playerValue}`)
                this.dealerScore = this.add.text(100, 100, `Hand Value: ${this.dealerValue}`)
                
                this.deal(this.player)
                this.deal(this.dealer)
                
                this.deal(this.player)
                this.deal(this.dealer)
            }

            deal(hand) {
                fetch(`https://www.deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=1`)
                .then(res => res.json())
                .then(data => {
                    // passes down an array of cards
                    const cardX = 100 + (hand.length * 110)
                    let cardY, currentHand, currentValue, currentScore
                    if (hand == this.player) {
                        cardY = 500
                        currentHand = this.playerHand
                        currentValue = this.playerValue
                        currentScore = this.playerScore
                    }
                    if (hand == this.dealer) {
                        cardY = 200
                        currentHand = this.dealerHand
                        currentValue = this.dealerValue
                        currentScore = this.dealerScore
                    }
                    currentValue = 0
                    currentHand.push(data.cards[0].value)
                    currentHand.forEach(cardValue => {
                        let value
                        console.log(cardValue)
                        switch (cardValue) {
                            case 'ACE':
                                value = 11
                                break;
                            case ('JACK'):
                                value = 10
                                break;
                            case ('QUEEN'):
                                value = 10
                                break;
                            case ('KING'):
                                value = 10
                                break;
                            default:
                                value = parseInt(cardValue)
                                break;
                        }
                        // console.log(value)
                        currentValue += value
                    })
                    currentScore.setText(`Hand Value: ${currentValue}`)
                    const card = this.add.sprite(cardX, cardY, data.cards[0].code)
                    card.name = data.cards[0].code
                    hand.push(card)
                })
            }
        }

        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            scene: Scene,
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