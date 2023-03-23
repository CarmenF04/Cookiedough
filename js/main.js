class Cookie{
    name = "";
    htmlElement = undefined;
    score = undefined;
    factor = 1;
    // Dit wordt 1x uitgevoerd wanneer "new" wordt gebruikt
    constructor(newName, newHTMLElement, newScore){
            this.name = newName;
            this.htmlElement = newHTMLElement;
            this.htmlElement.onclick = this.onCookieClicked;
            this.score = newScore;
    }

    onCookieClicked = () =>{
            this.score.onCookieClicked(this.factor);
    }

    onStyleChangeChocolate(){
            this.htmlElement.classList.add("cookie--chocolate");
    }

    onStyleChangeRedvelvet(){
            this.htmlElement.classList.add("cookie--velvet");
    }

    returnOldStyle(){
            this.htmlElement.classList.remove("cookie--velvet");
    }

    multiplierLoaded(){
            this.factor = 100;
    }
}

class Score{
    score;
    name = "";
    htmlElement = undefined;

    constructor(newScore, newName, newHTMLElement){
            this.score = newScore;
            this.name = newName;
            this.htmlElement = newHTMLElement;
            this.htmlElement.innerText= newScore;
    }

    onCookieClicked(factorFromCookie){
            this.htmlElement.innerText = this.score += factorFromCookie;
    }

    subtractScore(){
            this.score = this.score - 100;
            this.htmlElement.innerText = this.score;
    }

    onAutoScoreClicked(){
            setInterval( () => {
            this.score = this.score + 500;
            this.htmlElement.innerText = this.score;
            }, 10000)
            
    }

    addPoints(){
            this.score = this.score + 10000;
            this.htmlElement.innerText = this.score;
    }

    scoreLoaded(newScore) {
            this.score = newScore;
            this.htmlElement.innerText = this.score;
    }

}

class Multiplier{
    factor= 100;
    htmlElement = undefined;
    cookie = undefined;
    bought = false;

    constructor(htmlElement, cookie){
            this.htmlElement = htmlElement
            this.cookie = cookie;
            this.htmlElement.onclick = this.onMultiplierClicked;
    }

    onMultiplierClicked = () =>{
            if(this.bought === false && window.localStorage.getItem("multiplier") !== "true"){
                    this.bought = true;
                    window.localStorage.setItem("multiplier", this.bought);
                    this.cookie.score.subtractScore();
                    this.cookie.factor = this.factor;
            }
    }
}

class AutoScore{
    htmlElement = undefined;
    score = undefined;
    bought = false;

    constructor(htmlElement, score){
            this.htmlElement = htmlElement;
            this.score = score;
            this.htmlElement.onclick = this.onAutoScoreClicked;
    }

    onAutoScoreClicked = () => {
            if(this.bought === false && window.localStorage.getItem("autoSave") !== "true"){
                    this.bought = true;
                    window.localStorage.setItem("autoSave", this.bought);
                    this.score.subtractScore();
                    this.score.onAutoScoreClicked();
            }
    }
}

class ChocolateCookie{
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor(htmlElement, cookie){
            this.htmlElement = htmlElement;
            this.cookie = cookie;
            this.htmlElement.onclick = this.onChocolateCookieClicked;
    }

    onChocolateCookieClicked = () => {
            if(this.bought === false && window.localStorage.getItem("chocolateCookie") !== "true"){
                    this.bought = true;
                    window.localStorage.setItem("chocolateCookie", this.bought);
                    this.cookie.score.addPoints();
            }
            this.cookie.onStyleChangeChocolate();
    }
}

class VelvetCookie{
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor(htmlElement, cookie){
            this.htmlElement = htmlElement;
            this.cookie = cookie;
            this.htmlElement.onclick = this.onVelvetCookieClicked;
            }

    onVelvetCookieClicked = () => {
            // Opdracht 
            if (this.bought === false) {
                    this.bought = true;
                    this.cookie.onStyleChangeRedvelvet();
            }
    }
}

class Save{
    htmlElement;

    constructor(newHTMLElement){
            this.htmlElement = newHTMLElement;
            this.htmlElement.onclick = this.onSaveButtonClicked;

    }

    onSaveButtonClicked = () => {
            window.localStorage.setItem("score", score.score);
    }
}

class Load{
    score;
    cookie;

    constructor(score, cookie) {
            this.cookie = cookie;
            this.score = score;
            this.onLoad();
    }

    onLoad = function() {
            // Load the score in the localStorage
            const scoreFromLocalStorage = window.localStorage.getItem("score");
            if(scoreFromLocalStorage !== null){
            this.score.scoreLoaded(parseInt(scoreFromLocalStorage));
            }
            // Load the multiplier in localStorage
            const multiplierFromLocalStorage = window.localStorage.getItem("multiplier");
            if(multiplierFromLocalStorage !== null && multiplierFromLocalStorage === "true"){
            this.cookie.multiplierLoaded();
            }
            // Load the autoScore in localStorage
            const autoSaveFromLocalStorage = window.localStorage.getItem("autoSave");
            if(autoSaveFromLocalStorage !== null && autoSaveFromLocalStorage === "true"){
            this.score.onAutoScoreClicked();
            }
    }
}




// Setup for score and cookie
const score = new Score(555, "Default score", document.getElementById("js--score"));
const cookie = new Cookie("Default cookie", document.getElementById("js--cookie"), score);

// Setup desktop upgrades
const multiplier = new Multiplier(document.getElementById("js--multiplier"), cookie);
const auto = new AutoScore(document.getElementById("js--autoScore"), score);
const chocolate = new ChocolateCookie(document.getElementById("js--chocolate"), cookie);
const velvet = new VelvetCookie(document.getElementById("js--velvet"), cookie);

const save = new Save(document.getElementById("js--save"));
const load = new Load(score, cookie);


// Setup mobile upgrades
const multiplierMobile = new Multiplier(document.getElementById("js--multiplier--mobile"), cookie);
const autoMobile = new AutoScore(document.getElementById("js--autoScore--mobile"), score);
const chocolateMobile = new ChocolateCookie(document.getElementById("js--chocolate--mobile"), cookie);
const redVelvetMobile = new VelvetCookie(document.getElementById("js--velvet--mobile"), cookie);
