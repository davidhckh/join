class User {
    constructor(name, mail, image) {
        this.name = name,
            this.mail = mail,

            this.setImage(image);
    };

    setImage(image) {
        if(image) {
            this.image = image
        } else {
            this.image = 'assets/empty-profile-picture.png';
        }
    }
};