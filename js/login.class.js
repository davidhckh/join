let login;

/**
 * check if user is not logged in and on login.html. If so, init login.html,
 * otherwise open index.html
 */
window.addEventListener('load', () => {
    if(window.location.pathname == '/login.html' && !localStorage.getItem('user')) {
        login = new Login();
    } else if(window.location.pathname == '/login.html') {
        window.open("index.html","_self");
    }
})

/**
 * Check if User is logged in. open login.html otherwise
 */
checkLogin();
function checkLogin() {
    if(window.location.pathname != '/login.html' && !localStorage.getItem('user')) {
        window.open("login.html","_self");
    }
}

/**
 * init login.html
 */
class Login {
    constructor() {
        this.helper = new Helper;

        setURL('http://gruppe-142.developerakademie.net/smallest_backend_ever');

        this.defineElements();
    }

    defineElements() {
        this.signUpContainer = document.getElementById('sign-up-container');
        this.imageSelector = document.getElementById('image-selector');
        this.imageSelectorContainer = document.getElementById('image-selector-container');
        this.nameInput = document.getElementById('name-input');
        this.mailInput = document.getElementById('mail-input');
        this.signUpButton = document.getElementById('sign-up-button');
        this.guestButton = document.getElementById('guest-login-button');
        this.form = document.getElementById('form');
    }

    /**
     * create new user if email is not taken
     * if email is alrady taken login with existing user and
     * 
     * open index.html afterwards
     */
    async signUp() {
        await this.helper.getDataFromServer();

        if(!this.emailIsTaken()) {
            await this.helper.createNewUser(
                this.nameInput.value,
                this.mailInput.value,
                this.imageSelector.getAttribute('src')
            )

        }

        localStorage.setItem('user', JSON.stringify(this.helper.allUsers.find((user) => user.mail === this.mailInput.value)))

        window.open("index.html","_self");
    }

    /**
     * 
     * @returns If email is already taken
     */
    emailIsTaken() {
        if(this.helper.allUsers.find((user) => user.mail === this.mailInput.value)) {
            return true;
        }
    }

    openImageSelector() {
        this.signUpContainer.classList.add('hide');
        this.imageSelectorContainer.classList.remove('hide');
    }

    closeImageSelector() {
        this.signUpContainer.classList.remove('hide');
        this.imageSelectorContainer.classList.add('hide');
    }
    
    /**
     * set image selector image and close image selector container
     */
    setProfilePicture(number) {
        this.imageSelector.src = 'assets/profilePictures/' + number + '.png'

        this.closeImageSelector()
    }
}