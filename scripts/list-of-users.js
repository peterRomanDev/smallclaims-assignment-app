const formAddUser = document.querySelector('.form-add-user');
const listOfUsers = document.querySelector('.list-of-users__list');
const formAddUserInput = document.querySelector('.form-add-user__input');
const formAddUserMsg = document.querySelector('.form-add-user__msg');
let names = [];

export const highlightClickedUser = e => {
    const users = document.querySelectorAll('.list-of-users__user');
    users.forEach(user => user.classList.remove('user-active'));
    
    e.target.classList.add('user-active');
};

export const getUserInput = () => formAddUser.user.value;

export const checkUserInput = userInput => {
    const pattern = /^[a-zA-Z]{1,20}$/;

    return pattern.test(userInput);
};

export const showFeedbackNone = () => {
    formAddUserInput.classList.remove('border-success');
    formAddUserInput.classList.remove('border-error');

    formAddUserMsg.classList.add('transparent');
    setTimeout(() => formAddUserMsg.classList.add('d-none'), 125);
};

export const showFeedbackSuccess = () => {
    formAddUserInput.classList.remove('border-error');
    formAddUserInput.classList.add('border-success');

    formAddUserMsg.classList.add('transparent');
    setTimeout(() => formAddUserMsg.classList.add('d-none'), 125);
};

export const showFeedbackError = () => {
    formAddUserInput.classList.remove('border-success');
    formAddUserInput.classList.add('border-error');

    formAddUserMsg.classList.remove('d-none');
    setTimeout(() => formAddUserMsg.classList.remove('transparent'), 0);
};

export const clearUserInput = () => formAddUser.user.value = '';

export const displayListOfUsers = () => listOfUsers.classList.remove('d-none');

const removeTitle = name => {
    const pattern = /^(Mr\.?|Mrs\.?|Ms\.?)\s/i;
    const firstWord = name.slice(0, name.indexOf(' ') + 1);

    return pattern.test(firstWord) ? name.slice(name.indexOf(' ') + 1) : name;
};

const getFirstName = name => name.includes(' ') ? name.slice(0, name.indexOf(' ')) : name;

const formatName = name => `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

const pushName = name => names.push(name);

const updateListOfUsers = () => {
    const uniqueNames = [...new Set(names)].sort();
    const nameBtns = uniqueNames
        .map(name => `<li><button class="list-of-users__user">${name}</button></li>`)
        .join('');

    listOfUsers.innerHTML = nameBtns;
};

export const addUser = name => {
    const nameWithoutTitle = removeTitle(name);
    const firstName = getFirstName(nameWithoutTitle);
    const formattedName = formatName(firstName);
    
    pushName(formattedName);
    updateListOfUsers();
};