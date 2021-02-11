import { Selector } from 'testcafe';

const countrySelect        = Selector('#create_select-country');
const countryOption        = countrySelect.find('option');    
const firstName            = Selector('#create_input-first-name');
const lastName             = Selector('#create_input-last-name');
const emailAddress         = Selector('#create_input-email');
const password             = Selector('#create_input-password');
const termAndCondition     = Selector('#legal').sibling(0);
const newsLetters          = Selector('#newsletter').sibling(0);
const createAccount        = Selector('#create_button-create-account');
const loginLink            = Selector('#create_link-login');
const validationMessage    = Selector('#create_input-email').sibling(1);

fixture `Create Account Script`
   .page `https://login-test.plista.com/de/create`;

// Create An Account
test('Create An Account', async t => {
  
   try{
   
   await t    

   // Select a country from markeyt dropdown
   .click(countrySelect)
   .click(countryOption.withText('Germany'))

   // Enter your FirstName
   .typeText(firstName, 'Pramod')
   .expect(firstName.value).contains('Pramod', 'input contains text "Pramod"')

   // Enter your LastName
   .typeText(lastName, 'Kokadwar')
   .expect(lastName.value).contains('Kokadwar', 'input contains text "Kokadwar"')

   // Enter your email address and Passowrd
   .typeText(emailAddress, 'pramodkokadwar@gmail.com')
   .expect(emailAddress.value).contains('pramodkokadwar@gmail.com', 'input contains text "pramodkokadwar@gmail.com"')
   .typeText(password, 'Pramod@2')

   // Click on term And Condistion  and news letter link
   .click(termAndCondition)
   .click(newsLetters)

   // Click on create account button
   .click(createAccount)
   
    //// Verify forget password link is present on login page
    .expect(loginLink.innerText).eql('Login', 'Verify Login link is display on Create Account link is display', { timeout: 500 })

   // Validation error for email is already taken
    .expect(validationMessage.textContent).eql('This email address is already taken. Please try another one.', 'check element text', { timeout: 500 })
    
   } catch(error){
      console.error(error)
      // Taking screenshot on failure 
      .takeScreenshot();
   }
    
      
});
