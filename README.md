# 101-7-stackoverflowers

The CU Boulder Lost & Found app is deployed on Heroku: https://cuboulder-lost-and-found.herokuapp.com/

Navigate to the website and create a new account or login with an existing account. 

New accounts are automatically created as non-admin and have limited functionality on the Account page.
For testing purposes, we have already created an admin account and a non-admin account for you to login with. 
The credentials are as follows:
Admin: Email: admin1234@colorado.edu Password: Password123
Non-Admin: Email: stud1234@colorado.edu Password: Password012

Once logged in, users have the ability to post found items or search for lost items from the Lost & Found page.

Additionally, users may manage account information and active listings from their Account page. Admin accounts may mark items as Claimed, Deleted, or Restored from inactive status.

The repository structure includes two main folders: A locally working copy of the code, and the final code which has been deployed to Heroku.

While only the EJS files are actively being used, the views folder contains both EJS and HTML files in case a revert to HTML is needed for some reason.

The files are structured as:
-database (includes database files such as SQL to create tables and test entries, data model, and test queries)
-resources
  -css (includes css for each page)
  -images (includes all photos used for entire application)
-views
  -about.ejs
  -about.html (not used)
  -account.ejs
  -account.html (not used)
  -index.html (not used)
  -login.ejs
  -login.html (not used)
  -Lost_and_Found_test.ejs
-node_modules
-server.js
-login.js
-editAcount.js
-editListing.js
-addItemCard.js (not used)
-package-lock.jason
-package.json
