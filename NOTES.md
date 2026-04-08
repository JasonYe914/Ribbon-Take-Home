## Structure of Components 

Firstly, I structured the steps into 4 different components so I could conditionally render them inside the App.tsx file instead of having to Link them to another page. 
I moved these 4 steps to a new folder called "steps" for organizational purposes, this should let help other programmers locate the file. 
Secondly, I created another folder called "assescory" for the other components like: the progress bar, the error messgae, the small help button. Since these components are not nessacarily the main "thing" and more like side items I uploaded them separate from App.tsx and steps. 
Lastly, I made one more folder called utils for validation testing. 

## Managed State Across Steps 

I used the App.tsx file to basically keep track of everything. Inside App.tsx there are useStates for every field and more. For example, there is a useState for Business name and Owner name. 
I pass these variables and functions as props into their corresponding step components. E.g. Business name is passed in Step 1 and payment method is passed into Step 2. Once these states are updated (when a user types in the field) it will also change in the App.tsx file which stores everything. 

## Rejection Flow 

The rejection flow occurs when sometimes there is a conflict in business names. For this specific assignment I made it so that the first time the user tries to register it will encounter the scenario. When they do, it brings them back to the first page with a red highlight around only the business name field. 
When the user changes the business name they can continue to payment, which is still saved so they don't pay again, and continue back to the review/submit step. 

## Review and Submit 

I chose to show the user their email, business name, owner name, business address, payment method, card number (mostly blurred out), amount charged, and status of payment. I mainly chose to do this because incase the owner decides that there is a spelling error in name, or address they can quickly fix it. 
And the payment details just to futher confirm with the client this is all correct. 

## Validate 

Aside from the initial requirements of the assignment I chose to validate the owner name and buisness name ensuring there are no special characters inside them and to make sure the business name is not solely numbers. 
I also chose to validate the payment details: making sure the credit card is only numbers (as there should be no characters or letters) and the length is 16 characters with spaces and 12 of the characters are numbers. 
I also made it to check the expiry date of the card used, anything list before the current time will be no accepted as payment. And I also limited the CVV to be 3-4 characters long. 

## Tracking Internally 

I decided to track the time of payment, CVV number and expiry date of the card internally, this will be helpful later for stuff like payment history, auto-filling information, etc. I did not show this publically because this is confidential information. 

## Improve With More Time 

- Add a rate limitor so users can accidentally double click on a button and to prevent spamming of a button. 
- Add a function that can validate if the address is correct.
- Change progress bar style to more of a bar that is colored in as the user progresses
- Making wallet payment (Apple pay, Google pay) possible

