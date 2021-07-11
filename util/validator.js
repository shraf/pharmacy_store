class Validator {
    constructor() {

    }
    static validateName = (name) => {
        const regex = /^[a-zA-Z]+(-[a-zA-Z]+)*$/;
        return regex.test(name);
    }
    static validateEmail = (email) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email)
    }
    static validatePhone = (phone) => {
        const regex = /^\d+$/;
        return regex.test(phone);
    }
};

module.exports = Validator;