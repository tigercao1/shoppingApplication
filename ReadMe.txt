DISCLAIMER:

THIS REPO IS FOR SCHOOL ASSIGNMENT PURPOSE ONLY! ABOUT 70% CODE IS NOT ORIGINAL WORK!!!!! 
PROVIDED BY PROFESSOR LOUIS NEL and the <3 of COMP 2406 students

##########################################################################

README

Yizhang Cao 101038053
Elaine Deng 101034510

Version:
node - v8.9.4
npm - v5.8.0

Install:
npm install

Launch:
npm start / node bin/www

Testing:
localhost:3000

Website login
Username:
test
Password:
test

Paypal Login
Username:
c359247377-buyer@hotmail.com
Password:
123456

##############################################################################################

The Goal of this assignment is to implement the Paypal Restful API into this shopping website.

Work Done By Me and Elaine Deng:
Implemented Paypal checkout using paypal-rest-sdk
modified code to accomplish redirection to purchase success page / cancel page depending on the paypal payment.
Emptying the shopping bag after the completion of current transaction.
Implemented seed/populate-for-startup.js for populating the MongoDB associated with the app

##############################################################################################

To run this app you need a personal Paypal Account
You can create on at paypal.com
When you create the account you don't need to link a credit card or bank account at that
time. I just ignored that step when prompted and it created the account anyway. I received confirmation by email.

1) Changing paypal account
Visit app.js file then change client_id and client_secret with your 
paypal sandbox account. 

You can create a sandbox account from below link
https://developer.paypal.com/

3) Setup project
Before starting application please run the populate-for-startup.js 
file inside the seed directory to populate the mongodb database.
You can basically run the file with below command (after locating in the terminal)
node populate-for-startup.js

Install the npm module depedencies in package.json by exectuing:
npm install

4) Run the application
In the application folder execute:
npm start 
then you can access from localhost at
http://localhost:3000

5) Login to the app using the dummy user for project:
username : admin@admin.com
password : admin

5) Important
Before starting application please make sure your mongo database runs.

6) Features
Add product
Delete product
Update product
Buy item
Shopping cart
Order history
Multiple search with comma => itemName,ItemName2
Filters
