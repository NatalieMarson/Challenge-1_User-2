// this function is ploting a single dot, this will be
// used for showing the dot, . will be saved,
// in a string to demonstrate the dot
function AddADot () {
    led.plot(2, 2)
    CharacterString = "" + CharacterString + "."
    basic.pause(500)
    basic.clearScreen()
}
radio.onReceivedNumber(function (receivedNumber) {
    NumRecieve = receivedNumber
    if (NumRecieve == 10) {
        Wait = 1
    } else {
        Wait = 0
        basic.clearScreen()
        ClearVariable()
    }
})
// This function is plotting a dash by showing three
// led's, - will be saved in a string to
// demonstrate the dash
function AddADash () {
    for (let index = 0; index <= 2; index++) {
        led.plot(index + 1, 2)
    }
    CharacterString = "" + CharacterString + "-"
    basic.pause(500)
    basic.clearScreen()
}
// When button a is pressed go to the function
input.onButtonPressed(Button.A, function () {
    if (Wait == 0) {
        radio.sendNumber(15)
        AddADot()
    }
})
// this function will reset all of the variables, after
// it was already saved
function ClearVariable () {
    CharacterString = ""
    let CodeReceived
radio.setGroup(1)
    CharReceive = ""
    CheckCodeSent = ""
    Wait = 0
}
// when button a and b are pressed call the function
input.onButtonPressed(Button.AB, function () {
    if (Wait == 0) {
        radio.sendNumber(15)
        radio.sendValue(CharacterString, CharacterString.length)
        Time = input.runningTime()
        TimeOut()
    }
})
// will set the variables to the different strings,
// it will then be sent to the function MorseCodeCheck, to
// make sure it sent the right thing.
radio.onReceivedString(function (receivedString) {
    CodeSent = receivedString
    CheckCodeSent = MCCode[MCCharacter.indexOf(CodeSent)]
    MorseCodeCheck()
})
// When button b is pressed call the function
input.onButtonPressed(Button.B, function () {
    if (Wait == 0) {
        radio.sendNumber(15)
        AddADash()
    }
})
// When the microbit is shook clear the variables
input.onGesture(Gesture.Shake, function () {
    ClearVariable()
})
radio.onReceivedValue(function (name, value) {
    CharReceive = name
    basic.showString(CharReceive)
    MorseCode()
})
// This function will resend the string if it is taking
// to long
function TimeOut () {
    if (input.runningTime() - Time > 1) {
        basic.showIcon(IconNames.SmallHeart)
        radio.sendValue(CharacterString, CharacterString.length)
    }
}
// this function checks if the morse code that was sent
// was the write one, if yes then it will show a check,
// if not it will resend the string
function MorseCodeCheck () {
    if (CheckCodeSent == CharacterString) {
        basic.showIcon(IconNames.Yes)
        radio.sendNumber(25)
        ClearVariable()
        basic.clearScreen()
    } else {
        radio.sendValue(CharacterString, CharacterString.length)
    }
}
// This function translates the numbers into which
// letters they corrospond with, and enter it into the string
// The running time is noted to make sure it does not take to long
// it will send the string
function MorseCode () {
    CodeReceived2 = MCCharacter[MCCode.indexOf(CharReceive)]
    basic.showString("" + (CodeReceived2))
    radio.sendString("" + (CodeReceived2))
}
/**
 * letter
 */
/**
 * This states that the variables are all empty
 */
/**
 * MCCharacter and MCCode show the morse code symbols for each
 */
/**
 * This is the second microbit, it will be the first reciever
 */
let CodeSent = ""
let NumRecieve = 0
let Wait = 0
let CheckCodeSent = ""
let CharReceive = ""
let MCCode: string[] = []
let MCCharacter: string[] = []
let Time = 0
let CharacterString = ""
CharacterString = ""
let CodeReceived2
radio.setGroup(1)
Time = 0
MCCharacter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
MCCode = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", ".----", "..---", "...--", "....-", "-....", "--...", "---..", "----.", "-----"]
CharReceive = ""
CheckCodeSent = ""
Wait = 0
/* NumRecieve is set to 0 in the begningIn this code only one user will be allowed to input numbers or doing any action at a time. Once an action has been completed on this microbit, the number 15 will be sent to the other microbit. 
If the number 10 is recieved from the other microbit, the variable NumRecieve, will turn to 1. If it is at 1 all the actions will be blocked and only will be unblocked when the NumRecieve turns back to 0.  
When the checkmark appears on this screen it will send the number 25 to the other screen. If this microbit recieves a 20, the NumRecieve will turn to 0, meaning the otherpersons turn is done and you can now start inputing
*/
