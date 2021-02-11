import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

const EmailAddress         = Selector('#login_input-email');
const password             = Selector('#login_input-password');
const countrySelect        = Selector('#login_select-country');
const countryOption        = countrySelect.find('option');    
const accountType           = Selector('#user-type-ADVERTISER').sibling(0);
const loginButton          = Selector('#login_button-login');
const validationMessage    = Selector('#login_button-login').sibling('p'); 
const getLocation                    = ClientFunction(() => document.location.href); 


fixture `Plista Login Script`
   .page `https://login-test.plista.com/de/`;

   
// Login with valid credential
test('Login with valid credential', async t => {

try {

   await t    
      // Select a country from markeyt dropdown
        .click(countrySelect)
        .click(countryOption.withText('Germany'))
      
      // Click on account type   
      .click(accountType)

      // Enter valid Email Address and Password 
        .typeText(EmailAddress, 'pramodkokadwar@gmail.com')
        .expect(EmailAddress.value).contains('pramodkokadwar@gmail.com', 'input contains text "pramodkokadwar@gmail.com"')
        .typeText(password, 'Pramod@2')

       // Click on login button
        .click(loginButton)

        // Verify forgot password link is present on login page
        .expect(Selector('a').getAttribute('href')).contains('forgot')
       
        // Verify Create one link is present on login page for create account
        .expect(Selector('a').nth(1).getAttribute('href')).contains('create')
       
       // Validation error for email is already taken
        .expect(validationMessage.textContent).eql(' Account is not verified.  Resend verification', 'check element text', { timeout: 500 });

      } catch(error){
         console.error(error)
         // Taking screenshot on failure 
         .takeScreenshot();
      }
       

});


// Login with Invalid credential
test('Login with Invalid credential', async t => {

try {
   await t    
      // Select a country from markeyt dropdown
        .click(countrySelect)
        .click(countryOption.withText('Germany'))
      
      // Click on account type   
      .click(accountType)

      // Enter valid Email Address and Password 
        .typeText(EmailAddress, 'Pramod@gmail.com')
        .expect(EmailAddress.value).contains('Pramod@gmail.com', 'input contains text "Pramod@gmail.com"')
        .typeText(password, 'Test@2')

       // Click on login button
        .click(loginButton)
       
       // Validation error for email is already taken
        .expect(validationMessage.textContent).eql(' Invalid username or password ', 'check element text', { timeout: 500 });

      } catch(error){
         console.error(error)
         // Taking screenshot on failure 
         .takeScreenshot();
      }
       

});


// Verify the URL when user select different market 
test('Verify the URL when user select different market (Country)', async t => {

   try {
      await t    
         // Select a country from markeyt dropdown
           .click(countrySelect)
           .click(countryOption.withText('Germany'))

           // Verify user is on forget password page
           .expect(getLocation()).contains('https://login-test.plista.com/de/')
         
         } catch(error){
            console.error(error)
            // Taking screenshot on failure 
            .takeScreenshot();
         }
          
   
   });

    // Verify that account type radio button is display when user select “Germany” market (Country)
test('Verify that account type radio button is display when user select “Germany” market (Country)', async t => {
   const usertype           = Selector('#user-type-ADVERTISER').exists;
 
   try {
      await t    
         // Select a country from markeyt dropdown
           .click(countrySelect)
           .click(countryOption.withText('Germany'))

            // Validation radio button is displayed properly.
           .expect(usertype).ok();
            
         } catch(error){
            console.error(error)
            // Taking screenshot on failure 
            .takeScreenshot();
         }
            
   
   });