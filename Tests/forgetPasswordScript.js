import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

   const resetEmail                     = Selector('#reset_input-email');
   const forgetPasswordLink             = Selector('#login_link-forgot-password');
   const getLocation                    = ClientFunction(() => document.location.href);
   const resetPassword                  = Selector('#reset_button-reset-password');
   const returnLogin                    = Selector('#reset_link-login');
   const validationMessage              = Selector('#reset_input-email').sibling('span');  


fixture `Plista Forgot Password Script`
   .page `https://login-test.plista.com/de/`;

// Verify Forgot Password Scenarios Valid EmailAddress
test('Verify Forgot Password Scenarios Valid EmailAddress', async t => {

   try {

   await t    

   // Click on forget Password Link
    .click(forgetPasswordLink)

   // Verify user is on forget password page
    .expect(getLocation()).contains('https://login-test.plista.com/de/forgot')

    // Enter valid email Id to reset userName
    .typeText(resetEmail, 'pramodkokadwar@gmail.com')

   // Click on reser password
    .click(resetPassword)
  
   // Verify return to login button is display when user submit reset password form
    .expect(returnLogin.innerText).eql('Return to login.', 'Verify return login button is displayed!', { timeout: 1000 })

   // Verify return to login link is present on reset your password page
   .expect(Selector('a').getAttribute('href')).contains('/de/');

} catch(error){
   console.error(error)
   // Taking screenshot on failure 
   .takeScreenshot();
}


});

// Verify Forgot Password Scenarios For Invalid EmailAddress
test('Verify Forgot Password Scenarios For Invalid EmailAddress', async t => {

try {

   await t    

   // Click on forget Password Link
    .click(forgetPasswordLink)

   // Verify user is on forget password page
    .expect(getLocation()).contains('https://login-test.plista.com/de/forgot')

    // Enter valid email Id to reset userName
    .typeText(resetEmail, 'Pramod123')

   // Click on reser password
    .click(resetPassword)
  
  // Validation error valid email address
  .expect(validationMessage.textContent).eql('Please provide a valid email address.', 'check element text', { timeout: 500 });

} catch(error){
   console.error(error)
   // Taking screenshot on failure 
   .takeScreenshot();
}
     
});
