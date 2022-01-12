class PopUp {
    text;
    popUpContainer;
    distanceTop;
    distanceRight;
    completeAnimationTime;

    fadeInDuration;
    fadeOutDuration;
    lastAnimation = 0;
    /**
     * 
     * @param {string} string text that will be displayed in pop up 
     * @param {string} distanceTop "x%" x is percentual difference from top
     * @param {string} distanceRight "x%" x is percentual difference from right
     * @param {integer} fadeInDuration time in seconds that it take from showing the popUp to starting the transform
     * @param {integer} fadeOutDuration time in seconds that it take to show the popUp text
     * @param {integer} completeAnimationTime time in seconds that the whole animation lasts
     */
    constructor(string, distanceTop, distanceRight, fadeInDuration, fadeOutDuration, completeAnimationTime) {
        this.text = string;
        this.distanceTop = distanceTop;
        this.distanceRight = distanceRight;
        this.fadeInDuration = fadeInDuration;
        this.fadeOutDuration = fadeOutDuration;
        this.completeAnimationTime = completeAnimationTime;
    }

    /**
     * 
     * @returns boolean : true if animation is running, false otherwise
     */
    isAnimating() {
        if (new Date().getTime() - this.lastAnimation < this.completeAnimationTime * 1000) { return true; } else { return false; }
    }

/**
 * if called and if no popUp already animating, new pop up will be created in the DOM.
 * then the animation will be started.
 */
    show() {

        if (!this.isAnimating()) {
            this.lastAnimation = new Date().getTime();
            this.popUpWrapper = document.createElement('div');

            this.popUpContainer = document.createElement('span');
            this.popUpWrapper.appendChild(this.popUpContainer);
            this.popUpContainer.innerHTML = "";
            this.popUpContainer.innerHTML = `${this.text}`;
            this.popUpContainer.classList.add('pop-up');

            this.popUpContainer.style.top = this.distanceTop;
            this.popUpContainer.style.right = this.distanceRight;

            document.body.appendChild(this.popUpWrapper);
            this.fadeInAndOut();
        }

    }
/**
 * adds and removes animation, after completeAnimationTime run out, it removess the popUp DOM element
 */
    fadeInAndOut() {
        setTimeout(() => {

            this.popUpContainer.classList.add('pop-up-animation');
        }, this.fadeInDuration * 1000);

        setTimeout(() => {
            this.popUpContainer.classList.remove('pop-up-animation');
        }, this.fadeOutDuration * 1000);

        setTimeout(() => {
            document.body.removeChild(this.popUpWrapper);
        }, this.completeAnimationTime * 1000);
    }

}