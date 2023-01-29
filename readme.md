# Register App

## Installing dependency :
I use vite to do "create-react-app" to make the creating time faster
React icons to add icons into the Register Page
React Router to navigate between pages
React Redux to store the Global State

## Creating Component
### Register Page 

Here i create a form which include : 
- Company to Apply which data populated from Global State using Redux
- Position to Apply which data also populated from Global State using Redux
- Full Name which is input with type text
- Phone Number which is input with type text, here i also add +62 in the state so after submitting automatically +62 in front of the phone Number. 
- Password and Confirm password. I add toggle button which using state to change type of input from 
password to text so the password will be visible
- Terms checkbox, which have validation when user not clicking the Register button will not able to be clicked

### User List Page
Here i call data from global State, which after user submit the register form the data will be stored in global state and will passed to this component. Here I create some element like table to populate the data 

## Validation
1. Company to apply i use onChange function and react State to determine whetever the input is selected or not
2. Position to apply i make an array of String to do the check all and filter them when checkbox "Check all" is not checked
3. Full Name i use onChange function and react state and regex to determine if the input is valid
4. Phone Number i use onChange function and react state and regex to determine if input is valid. also after validation data will be stored into local state called "registerData"
5. Password and confirm password i use normal javascript validation and react state to determine if password and confirm is match

I create state called error to show error message and change styling based on the state of the input


Please do an NPM install before trying the app, and also npm run dev to run the app on port 5173 (based on vite)
