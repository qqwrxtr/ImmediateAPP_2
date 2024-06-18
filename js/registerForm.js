//intlTelInput
let input1 = document.querySelector(".phone"),
    inputFirstname = document.querySelectorAll('input[name="firstname"]'),
    inputEmail = document.querySelectorAll('input[name="email"]'),
    phoneHidden = document.querySelectorAll('input[name=full-phone]'),
    country = document.querySelectorAll('input[name=country]'),
    countryFull = document.querySelectorAll('input[name=full-country]'),
    userIp = document.querySelectorAll('input[name=ip]'),
    prefixCountry = document.querySelectorAll('input[name=prefix]'),
    userAddr = document.querySelectorAll('input[name=domain]');

    let iti = window.intlTelInput(input1, {
        utilsScript: 'js/registerForm/intlTelInput/js/utils.js',
        nationalMode: true,
        defaultCountry: 'auto',
        preferredCountries: ["cz"],
        separateDialCode: true,
        initialCountry: "auto",
        geoIpLookup: function (callback) {
            $.getJSON('https://api.country.is', function (data) {
                let country = data.country;
                callback(country);
                getUserIp(data);
            });
        }
    });



const getUserIp = data => {
    userIp.forEach(item => item.setAttribute('value', data.ip));
}

userAddr.forEach(item => item.setAttribute('value', window.location.hostname));


let valueFirstname = /firstname=([^&]+)/i,
    valueEmail = /email=([^&]+)/i,
    GetValue = '';
if (!!valueFirstname.exec(document.location.search)) {
    GetValue = valueFirstname.exec(document.location.search)[1];
    inputFirstname.forEach(item => {
        item.setAttribute('value', decodeURIComponent(GetValue.replace(/\+/g, ' ')))
    })
    GetValue = valueEmail.exec(document.location.search)[1];
    inputEmail.forEach(item => {
        item.setAttribute('value', decodeURIComponent(GetValue))
    })
}


// Validation
function checkValidation(target, itemForm) {
    let element = target,
        validType = element.dataset.validation_type,
        val = element.value;

    switch (validType) {

        case 'firstname':
        case 'lastname':
            let rv_name = /^[a-zA-Zа-яА-Я\s]+$/; // Updated regex
            val = val.split(' ').join('');
            if (val !== '' && rv_name.test(val)) {
                validInput(element);
            } else {
                invalidInput(element, validType);
            }
            break;

        case 'email':
            // Email field no longer validates for specific content, always valid
            validInput(element);
            break;

        case 'phone':
            let checkNum = (iti.isValidNumber());
            let numPrefix = (iti.getSelectedCountryData().dialCode);
            let getNum = (iti.getNumber());
            let getCountry = (iti.defaultCountry.toUpperCase());
            let fullNameCountry = (iti.getSelectedCountryData().name.split(' ')[0]);

            phoneHidden.forEach(item => item.setAttribute('value', getNum));
            country.forEach(item => item.setAttribute('value', getCountry));
            countryFull.forEach(item => item.setAttribute('value', fullNameCountry));
            prefixCountry.forEach(item => item.setAttribute('value', numPrefix));
            element.setAttribute('data-bool', checkNum);

            check(itemForm);
            if (checkNum) {
                validInput(element);
            } else {
                invalidInput(element, 'phone');
            }
            break;

        case 'password':
            let rv_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/;
            if (val !== '' && rv_password.test(val)) {
                validInput(element);
            } else {
                invalidInput(element, 'password');
            }
            break;

        default:
            if (element.length > 0 && val !== '') {
                validInput(element);
            } else {
                invalidInput(element, validType);
            }
            break;
    }
}

function check(element) {
    let submit = element.querySelector('.send-form');
    let checkTel = element.querySelector('input[type="tel"]').dataset.bool;

    if (checkTel === 'true') {
        submit.removeAttribute('disabled');
    } else {
        submit.setAttribute('disabled', '');
    }
}

function validInput(element) {
    element.classList.add('valid');
    element.classList.remove('invalid');
}

function invalidInput(element, name) {
    element.classList.add('invalid');
    element.classList.remove('valid');
}
let form_container = document.querySelectorAll('.form-container')
form_container.forEach(item => {
    item.addEventListener('input', (event) => {
        checkValidation(event.target, item)
    })
})

