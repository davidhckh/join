let login;

/**
 * check if user is not logged in and on login.html. If so, init login.html,
 * otherwise open index.html
 */
window.addEventListener('load', () => {
    let location = window.location.pathname.split('/');
    if (location[location.length - 1] == 'login.html' && !localStorage.getItem('user')) {
        login = new Login();
    } else if (location[location.length - 1] == 'login.html') {
        window.open("index.html", "_self");
    }
})

/**
 * Check if User is logged in. open login.html otherwise
 */
checkLogin();

function checkLogin() {
    let location = window.location.pathname.split('/');
    if (location[location.length - 1] != 'login.html' && !localStorage.getItem('user')) {
        window.open("login.html", "_self");
    }
}

/**
 * Setup user details (profile picture and name) in menu
 */
function setupMenuUserDetails() {
    setTimeout(() => {
        document.getElementById('profile-picture').src = JSON.parse(localStorage.getItem('user')).image;
        document.getElementById('user-name').innerHTML = JSON.parse(localStorage.getItem('user')).name;
    }, 200);
}

function logout() {
    localStorage.setItem('user', '');
    window.open("login.html", "_self");
}

/**
 * init login.html
 * if login is open
 */
class Login {
    constructor() {
        this.helper = new Helper();
        this.mode = 'signup'

        setURL('http://gruppe-142.developerakademie.net/smallest_backend_ever');

        this.defineElements();
    }

    defineElements() {
        this.signUpContainer = document.getElementById('sign-up-container');
        this.imageSelector = document.getElementById('image-selector');
        this.imageSelectorContainer = document.getElementById('image-selector-container');
        this.nameInput = document.getElementById('name-input');
        this.mailInput = document.getElementById('mail-input');
        this.passwordInput = document.getElementById('password-input');
        this.passwordError = document.getElementById('password-error');
        this.signUpButton = document.getElementById('sign-up-button');
        this.guestButton = document.getElementById('guest-login-button');
        this.form = document.getElementById('form');
        this.mailError = document.getElementById('mail-error');
        this.header = document.getElementById('header');
        this.openLoginLabel = document.getElementById('open-login-label');
        this.registerSuccessContainer = document.getElementById('register-success-container');
    }

    /**
     * This function performs after the form is submitted
     * Signs up or logs in after
     */
    async formFilledOut() {
        await this.helper.getDataFromServer();

        if (this.mode == 'signup') {
            this.signUp();
        } else {
            this.login();
        }
    }

    /**
     * Create new user if email is not taken
     * if email is already taken, show error message
     * 
     * open index.html afterwards
     */
    async signUp() {
        if (this.helper.mailExists(this.mailInput.value)) {
            this.mailError.classList.remove('hide');
            return;
        }

        await this.helper.createNewUser(
            this.nameInput.value,
            this.mailInput.value,
            this.imageSelector.getAttribute('src'),
            this.passwordInput.value,
        );

        localStorage.setItem('user', JSON.stringify(this.helper.allUsers.find((user) => user.mail === this.mailInput.value)));

        this.showRegistrationCompletion();
    }

    /**
     * This function show the registration completion container
     * with 'Continue' button
     */
    showRegistrationCompletion() {
        this.signUpContainer.classList.add('hide');
        this.registerSuccessContainer.classList.remove('hide');
    }

    /**
     * Close login and open the board
     */
    closeLogin() {
        window.open("index.html", "_self");
    }

    /**
     * Check if mail exists and if password is correct, if so, open index.html
     * show error otherwise
     */
    login() {
        if (this.helper.mailExists(this.mailInput.value)) {
            const password = this.helper.allUsers.find((user) => user.mail == this.mailInput.value).password
            if (password == this.passwordInput.value) {
                localStorage.setItem('user', JSON.stringify(this.helper.allUsers.find((user) => user.mail === this.mailInput.value)));

                window.open("index.html", "_self");
            } else {
                this.passwordError.classList.remove('hide');
            }
        } else {
            this.mailError.classList.remove('hide');
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
     * Updates image selector's image to the selected image, after a selection
     * @param {*} number - The images number the image should be set to
     */
    setProfilePicture(number) {
        this.imageSelector.src = 'assets/profilePictures/' + number + '.png';

        this.closeImageSelector();
    }

    /**
     * Login as guest
     * set local storage to guest details
     * and open index aftewards
     */
    guestLogin() {
        localStorage.setItem('user', JSON.stringify({
            image: 'assets/empty-profile-picture.png',
            mail: 'none',
            name: 'Guest'
        }));

        window.open("index.html", "_self");
    }

    /**
     * Open login or signup container
     * depending on current location
     */
    loginLabelClick() {
        if (this.mode == 'signup') {
            this.openLogin();
        } else {
            this.openSignUp();
        }
    }

    /**
     * Change all elements to login form
     */
    openLogin() {
        this.mode = 'login';

        this.imageSelector.classList.add('hide');
        this.nameInput.classList.add('hide');
        this.nameInput.required = false;
        this.signUpButton.innerHTML = 'Login';
        this.header.innerHTML = 'Login';
        this.openLoginLabel.innerHTML = 'Sign up';
        this.mailError.innerHTML = `This email doesn't exist. Sign up <a onclick="login.loginLabelClick()">here</a> instead.`;
        this.mailError.classList.add('hide');
        this.passwordError.classList.add('hide');
    }

    /**
     * Change all elements for sign up form
     */
    openSignUp() {
        this.mode = 'signup';

        this.imageSelector.classList.remove('hide');
        this.nameInput.classList.remove('hide');
        this.nameInput.required = true;
        this.signUpButton.innerHTML = 'Sign Up';
        this.header.innerHTML = 'Sign Up';
        this.mailError.innerHTML = 'This email is already taken. Log in <a onclick="login.loginLabelClick()">here</a> instead.';
        this.openLoginLabel.innerHTML = 'Already registered? Log in instead.';
        this.mailError.classList.add('hide');
        this.passwordError.classList.add('hide');
    }
}