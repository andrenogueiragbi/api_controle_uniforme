import validator from 'validator'

export default {
    email(email) {
        if(validator.isEmail(email)) return true
        return false
        
    },
    password(password) {
        if (validator.isLength(password,{min:8}) && (!validator.isUppercase(password)  && !validator.isLowercase(password)) && /[^a-zA-Z0-9]/.test(password)) return  true
        return false;
          
        
    }
}