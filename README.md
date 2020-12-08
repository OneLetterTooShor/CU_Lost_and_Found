# 101-7-stackoverflowers

In our repository, there are 2 folders of code pertaining to our project, CU_Lost_Found and cuboulder-lost-and-found-heroku. The CU_Lost_Found contains our final code used to host our app and updated database files. The cuboulder-lost-and-found-heroku contains the same code files, non-updated database files, and is a direct pull from the live version of our web-app on heroku. 

The CU Boulder Lost & Found app is deployed on Heroku: https://cuboulder-lost-and-found.herokuapp.com/

Navigate to the website and create a new account or login with an existing account. 

New accounts are automatically created as non-admin and have limited functionality on the Account page.<br>
For testing purposes, we have already created an admin account and a non-admin account for you to login with.<br>
The credentials are as follows:<br>
<b>Admin:</b> Email: admin1234@colorado.edu Password: Password123<br>
<b>Non-Admin:</b> Email: stud1234@colorado.edu Password: Password012

Once logged in, users have the ability to post found items or search for lost items from the Lost & Found page.

Additionally, users may manage account information and active listings from their Account page. Admin accounts may mark items as Claimed, Deleted, or Restored from inactive status.

While only the EJS files are actively being used, the views folder contains both EJS and HTML files in case a revert to HTML is needed for some reason.

Within CU_Lost_Found and cuboulder-lost-and-found-heroku, the files are structured as:<br>
-<b>database</b> (includes data model, SQL to create tables, and test queries)<br>
-<b>resources</b><br>
&nbsp;&nbsp;-css (includes css for each page)<br>
&nbsp;&nbsp;-images (includes all photos used for entire application)<br>
-<b>views</b><br>
&nbsp;&nbsp;-about.ejs<br>
&nbsp;&nbsp;-about.html (not used)<br>
&nbsp;&nbsp;-account.ejs<br>
&nbsp;&nbsp;-account.html (not used)<br>
&nbsp;&nbsp;-index.html (not used)<br>
&nbsp;&nbsp;-login.ejs<br>
&nbsp;&nbsp;-login.html (not used)<br>
&nbsp;&nbsp;-Lost_and_Found_test.ejs<br>
-<b>node_modules</b><br>
-server.js<br>
-login.js<br>
-editAcount.js<br>
-editListing.js<br>
-addItemCard.js (not used)<br>
-package-lock.json<br>
-package.json<br>

Testing:
To test our application, we used User Acceptance Testing to make sure our application was working and ready to deploy. Beacuse of this, there is nothing needed to run in order to test our app.
