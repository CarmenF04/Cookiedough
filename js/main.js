class Cookie{
    name = "";
    htmlElement = undefined;
    score = undefined;
    factor = 1;
    //
    constructor (newName, newHTMLElement,newScore){
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onCookieClicked;
        this.score = newScore;
    }

    onCookieClicked = () =>{
        this.score.onCookieClicked(this.factor);
    }

    onStyleChange(){
        this.htmlElement.classList.add("cookie--chocolate");
    }

    onStyleChangesecond(){
        this.htmlElement.classList.remove("cookie--chocolate");
        this.htmlElement.classList.add("cookie--velvet");
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
        this.htmlElement.innerText = newScore;
    }

    onCookieClicked(factorFromCookie){
        this.score = this.score + factorFromCookie;
        this.htmlElement.innerText = this.score;
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
        this.score = this.score + 10000
        this.htmlElement.innerText = this.score;
    }

    scoreLoaded(newScore){
        this.score = newScore;
        this.htmlElement.innerText = this.score;
    }
}    


class Multiplier{
    factor = 100;
    htmlElement = undefined;
    cookie = undefined;
    bought = false;

    constructor(htmlElement, cookie){
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick =this.onMultiplierClicked;
    }

    onMultiplierClicked = () => {
        if(this.bought === false){
            this.bought = true;
            this.cookie.score.subtractScore(); // 100 punten er af
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
        if(this.bought === false){
            this.bought = true;
            this.score.subtractScore();
            this.score.onAutoScoreClicked();
        }
    }
}

class ChocolateCookie{
    htmlElement = undefined;
    bought = false;
    cookie = undefined;

    constructor(htmlElement,cookie){
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onChocolateCookieClicked;
    }

    onChocolateCookieClicked = () => {
        if(this.bought === false){
            this.bought = true;
            this.cookie.onStyleChange();
            this.cookie.score.addPoints();
        }
    }
}

class Save{
    htmlElement;
    score;

    constructor(newHTMLElement, score){
            this.htmlElement = newHTMLElement;
            this.htmlElement.onclick = this.onSaveButtonClicked;

    }

    onSaveButtonClicked = () => {
            window.localStorage.setItem("score", score.score);
    }
}

class Load{
    score;

    constructor(score){
        this.score = score;

        this.onload();
    }

    onload = function(){
        const scoreFromLocalStorage = parseInt(window.localStorage.getItem("score"));
        if(typeof scoreFromLocalStorage === "number" ){
            this.score.scoreLoaded(scoreFromLocalStorage); 
        }
    }
}



class VelvetCookie{
    htmlElement = undefined;
    bought = false;
    forward = false;
    cookie = undefined;

    constructor(htmlElement,cookie){
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onVelvetCookieClicked;
    }

    onVelvetCookieClicked = () => {
        if(this.bought === false){
            this.bought = true;
            this.cookie.onStyleChangesecond();
            this.cookie.score.addPoints();
        }
    }
}


// Setup for cookie
const score = new Score(555, "Default Score", document.getElementById("js--score"));
const cookie = new Cookie("Default Cookie", document.getElementById("js--cookie"), score);

// Setup desktop
const multiplier = new Multiplier(document.getElementById("js--multiplier"), cookie);
const auto = new AutoScore(document.getElementById("js--autoScore"), score);
const chocolate = new ChocolateCookie(document.getElementById("js--chocolate"), cookie);
const velvet = new VelvetCookie(document.getElementById("js--velvet"), cookie);
const save = new Save(document.getElementById("js--save"));
const load = new Load(score);

// Setup Mobile
const multiplierMobile = new Multiplier(document.getElementById("js--multiplier--mobile"), cookie);
const autoMobile = new AutoScore(document.getElementById("js--autoScore--mobile"), score)
const chocolateMobile = new ChocolateCookie(document.getElementById("js--chocolate--mobile"),cookie);
const velvetMobile = new VelvetCookie(document.getElementById("js--velvet--mobile"), cookie);

// window.localStorage.clear();
// window.localStorage.setItem("name", "Jeroen");
// console.log(window.localStorage);