import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['count']
    static values = {
        number: Number,
    }
    connect() {
        console.log('Hello controller connected!')
        this.updateDisplay()
    }

    increment() {
        this.numberValue += 2
        this.updateDisplay()
    }

    decrement() {
        this.numberValue -= 1
        this.updateDisplay()
    }

    reset() {
        this.numberValue = 0
        this.updateDisplay()
    }

    updateDisplay() {
        this.countTarget.textContent = this.numberValue
    }
}
