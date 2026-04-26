const regForm = document.querySelector('#regForm')
const regName = document.querySelector('#regName')
const regPhone = document.querySelector('#regPhone')
const regEmail = document.querySelector('#regEmail')
const regPassword = document.querySelector('#regPassword')

const messageP = document.querySelector('.message')

//список пользователей из LS

const usersList = JSON.parse(localStorage.getItem('users')) || []
const clearP = () => {
  setTimeout(() => {
    messageP.textContent = ''
  }, 3000)
}

//функция обработчик reg
const handleRegister = (e) => {
  e.preventDefault()
    if (regName.value.length < 2 || regName.value.length > 24) {
        messageP.textContent = 'Минимальное количество символов в имени - 2, максимальное - 24';
        messageP.style.color = 'red';
        clearP();
        return;
    }
    if(regEmail.value.length <= 7){
        messageP.textContent = 'Минимальное количество символов в email - 7';
        messageP.style.color = 'red';
        clearP();
        return;
    }
    if (!/^\+\d{8,12}$/.test(regPhone.value)) {
        messageP.textContent = 'Номер должен начинаться с + и содержать от 8 до 12 цифр';
        messageP.style.color = 'red';
        clearP();
        return;
    }
    if(!/^.{5,26}$/.test(regPassword.value)){
        messageP.textContent = 'Пароль должен быть от 5 и до 26 символов';
        messageP.style.color = 'red';
        clearP();
        return;
    }



  if (
    regName.value.trim() === '' ||
    regPhone.value.trim() === '' ||
    regEmail.value.trim() === '' ||
    regPassword.value.trim() === ''
  ) {
    messageP.textContent = 'Все поля обязательны'
    messageP.style.color = 'red'
    clearP()
    return
  }
  let isError = false
  usersList.forEach((el) => {
    if (el.email === regEmail.value) {
      isError = true
    }
  })
  if (isError) {
    messageP.textContent = 'Пользователь с таким email уже существует'
    messageP.style.color = 'red'
    clearP()
    return
  } else {
    const userData = {
      name: regName.value.trim(),
      phone: regPhone.value.trim(),
      email: regEmail.value.trim(),
      password: regPassword.value.trim(),
    }
    usersList.push(userData)
    localStorage.setItem('users', JSON.stringify(usersList))
    regForm.reset()
    messageP.textContent =
      'Регистрация прошла успешно, письмо отправлено на почту! '
    messageP.style.color = 'green'
    clearP()
  }
}

regForm.addEventListener('submit', handleRegister)

// событие авторизации
const authForm = document.querySelector('#authForm')
const authEmail = document.querySelector('#authEmail')
const authPassword = document.querySelector('#authPassword')

const handleAuth = (e) => {
    e.preventDefault()
    if(authEmail.value.length <= 7){
        messageP.textContent = 'Минимальное количество символов в email - 7';
        messageP.style.color = 'red';
        clearP();
        return;
    }
    if(!/^.{5,26}$/.test(authPassword.value)){
        messageP.textContent = 'Пароль должен быть от 5 и до 26 символов';
        messageP.style.color = 'red';
        clearP();
        return;
    }


    let isError = true
    usersList.forEach(el => {
        if(el.email === authEmail.value.trim() && el.password === authPassword.value.trim()){
            isError = false
        }
    })
    if(isError){
        if (authEmail.value === '' || authPassword.value === '') {
            messageP.textContent = 'заполните все поля'
            messageP.style.color = 'red'
            clearP()
            return
        }else{
            messageP.textContent = 'Не правильный email или пароль'
            messageP.style.color = 'red'
            clearP()
            return
        }
    }else{
    const currentUser = usersList.find((el) => el.email === authEmail.value)

    authEmail.value = ''

    authPassword.value = ''

    regForm.style.display = 'none'

    authForm.style.display = 'none'

    const logoutButton = document.createElement('button')
    logoutButton.textContent = 'Выйти'

    messageP.insertAdjacentHTML('beforeend',
      `
      <h4>Имя: ${currentUser.name}</h4>
      <p>Телефон: ${currentUser.phone}</p>
      `,
    )
    messageP.style.color = 'black'
    messageP.append(logoutButton)
    logoutButton.addEventListener('click', () => {
      regForm.style.display = 'block'
      authForm.style.display = 'block'
      messageP.innerHTML = ''
    })
  }
}
authForm.addEventListener('submit', handleAuth)

