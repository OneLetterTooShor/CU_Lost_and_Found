# 101-7-stackoverflowers

The CU Boulder Lost & Found app is deployed on Heroku: https://cuboulder-lost-and-found.herokuapp.com/

Navigate to the website and create a new account or login with an existing account. 

New accounts are automatically created as non-admin and have limited functionality on the Account page.<br>
For testing purposes, we have already created an admin account and a non-admin account for you to login with.<br>
The credentials are as follows:<br>
<b>Admin:</b> Email: admin1234@colorado.edu Password: Password123<br>
<b>Non-Admin:</b> Email: stud1234@colorado.edu Password: Password012

Once logged in, users have the ability to post found items or search for lost items from the Lost & Found page.

Additionally, users may manage account information and active listings from their Account page. Admin accounts may mark items as Claimed, Deleted, or Restored from inactive status.

The repository structure includes two main folders: A locally working copy of the code, and the final code which has been deployed to Heroku.

While only the EJS files are actively being used, the views folder contains both EJS and HTML files in case a revert to HTML is needed for some reason.

The files are structured as:<br>
-<b>database (includes database files such as SQL to create tables and test entries, data model, and test queries)</b><br>
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
-package-lock.jason<br>
-package.json<br>
