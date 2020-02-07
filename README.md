# PWA- Budget Tracker

This progressive web application is designed to allow a user to track their finances both on and offline.

## Interface
A user can input capital gains or expenditures in the forms at the top of the page. Upon submission, the transaction is saved to a database, listed on the page, and represented graphically. This works whether the app is on or offline. If offline, the user's data is stored in IndexedDB until the app comes back online. Then, it pushes all saved data to MongoDB for future retrieval.


![BudgetTracker](public/assets/images/BudgetTracker.gif "UI for Budget Tracker")


## Technologies
This site was written using:
* Node.js
* MongoDB
* IndexedDB
* Javascript
* HTML
* CSS
* Bootstrap


## Credits
In setting up this project, I closely followed the guidelines provided by the [UCF Coding Bootcamp](https://github.com/UCF-Coding-Boot-Camp/UCF-ORL-FSF-FT-11-2019-U-C).