class PopUp {
    text;
    popUpContainer;
    content;
    distanceTop;
    distanceRight;
    
    
    lastAnimation=0;
/**
 * 
 * @param {string} string text that will be displayed in pop up 
 * @param {string} distanceTop "x%" x is percentual difference from top
 * @param {string} distanceRight "x%" x is percentual difference from right
 */
    constructor(string, distanceTop, distanceRight) {
        this.text = string;
        this.distanceTop = distanceTop;
        this.distanceRight = distanceRight;


    }

    createPopUp() {

        if(!this.isAnimating()){
            this.lastAnimation=new Date().getTime();
            
            this.popUpContainer = document.createElement('div');
            this.popUpContainer.classList.add('pop-up');
    
            this.popUpContainer.style.top = this.distanceTop;
            this.popUpContainer.style.right = this.distanceRight;
    
            document.body.appendChild(this.popUpContainer);
    
    
            this.phase1();
            this.phase2();
            this.phase3();
        }

       
        

    }

    phase1() {
        setTimeout(() => {
            this.popUpContainer.classList.add('pop-up-animation');
        }, 200);
    }

    phase2() {
        setTimeout(() => {
            this.content = document.createTextNode(`${this.text}`);
            this.popUpContainer.appendChild(this.content);
        }, 1200);
    }

    phase3() {
        setTimeout(() => {
            this.popUpContainer.classList.remove('pop-up-animation');
            this.popUpContainer.removeChild(this.content);
        }, 2200);

        setTimeout(() => {
           document.body.removeChild(this.popUpContainer);
        }, 3200);
    }
    /**
     * 
     * @returns boolean : true if animation is running, false otherwise
     */
    isAnimating() {
        if(new Date().getTime()-this.lastAnimation<3200){return true;}
        else{return false;}
    }

}