class User {
    constructor(name, mail, image, password) {
        this.name = name;
        this.mail = mail;
        this.password = password;

        this.setImage(image);
    };

    /**
     * This function sets the user's profile picture,
     * if empty it's set to empty-profile-picture.png
     * 
     * @param {*} image  - The image you want to use
     */
    setImage(image) {
        if (image) {
            this.image = image;
        } else {
            this.image = 'assets/empty-profile-picture.png';
        }
    }
};