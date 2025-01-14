describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
          });

    afterEach('Конец теста', function () {
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя
       });

    it('Верный логин и верный пароль', function () {
         cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
         cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
         cy.get('#loginButton').click(); // Нажали кнопку войти

         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяю, что после авт. вижу текст
         cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
     })

     it('Верный логин и неверный пароль', function () {
        cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio5'); // Ввели неверный пароль
        cy.get('#loginButton').click(); // Нажали кнопку войти
        
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после авт. вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
    })

    it('Неверный логин и верный пароль', function () {
        cy.get('#mail').type('german@dolnkov.ru'); // Ввели неверный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажали кнопку войти
        
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после авт. вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
    })

    it('Проверка, что в логине есть @', function () {
        cy.get('#mail').type('germandolnikov.ru'); // Ввели логин без @
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажали кнопку войти
        
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверяю, что после авт. вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
    })

    it('Проверка восстановления пароля', function () {
        cy.get('#forgotEmailButton').click(); // Нажимаем кнопку восстановить пароль

        cy.get('#mailForgot').type('german@dolnikov.ru'); // водим почту для восстановления
        cy.get('#restoreEmailButton').click(); // Нажимаем отправить код
        
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверяю на совпадение текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
    })

    it('Проверка строчных букв в логине', function () {
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввели логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажали кнопку войти
        
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после авт. вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
    })
 })


 // запуск через теринал: npx cypress run --spec cypress/e2e/login.cy.js --browser chrome 