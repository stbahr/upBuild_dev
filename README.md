# Upbuild
## Description
This project is being created by Stephen Bahr as a part of Utat State's Internet Development course (ITLS 6265).

Success is most readily available when consistent efforts are made towards the same goal over time. The purpose of Upbuild is to create a site where users can create and track goals in a way that allows them to focus on their Ultimate Goal. This Ultimate Goal can pertain to any aspect of life, and can be as broad or specific as the user desires. To help the user remain focused on this Ultimate Goal, other goal levels are created. Annual, Monthly, and Weekly goals all exist to help the user be mindful of their progress. Users have the opportunity to come to the site each day and reflect on their growth. They can then make plans that will allow them to take the next step forward.

## Visuals
### Landing Page
<img src="Screenshots/Landing Page.png" alt="Landing Page">
<img src="Screenshots/Landing Modal.png" alt="Sign Up Modal">
The landing page provides a large logo, Upbuild's motto ("Always Look Up - Build Every Day"), and buttons that allow the user to either Sign Up or Log In. Each button opens the appropriate modal. (The modal for the Sign Up button is shown above.)
<br></br>
Users who sign up with a new account are taken to the Ultimate Goal page. Users who log in with an existing account are taken to the Existing User page, unless it is time for them to create a new Weekly, Monthly, or Annual Goal. In this case, they are taken to the appropriate input screens.

### Introduction and Ultimate Goal
<img src="Screenshots/Introduction Page.png" alt="Introduction Page">
<img src="Screenshots/Ultimate Goal Entry.png" alt="Ultimate Goal Entry Page">
The introduction page provides an overview of Upbuild to the user. The user uses the buttons at the bottom of the modal to cycle through the introduction screens.
<br></br>
Once the introduction is finished, the user adds their personal Ultimate goal to the entry box. They then select "Save and Continue", which directs them to the Annual goal entry page.

### Annual Goal Entry
<img src="Screenshots/Annual Entry.png" alt="Annual Goal Entry Page">
At the top of the screen is displayed the recently created Ultimate Goal. The user can create up to 4 separate Annual goals. Each goal is given a name and a description. The user must provide a name and a description for the 1st Annual Goal in order to continue on to the Monthly Goal page.

### Monthly Goal Entry
<img src="Screenshots/Monthly Entry.png" alt="Monthly Goal Entry Page">
At the top of the screen is displayed the first of the recently created Annual Goals. The user can create up to 3 separate Monthly goals for this Annual goal. Each goal is given a name and an description. The user must provide a name and a description for the 1st Monthly Goal in order to continue on to the Weekly Goal page.

### Weekly Goal Entry
<img src="Screenshots/Weekly Entry.png" alt="Weekly Goal Entry Page">
At the top of the screen is displayed the first of the recently created Monthly Goals. The user can create up to 2 Weekly goals for each Monthly goal. As with the other goals, each one is given a name and description. The weekly goals also are given "Days to Complete", which indicate which days the goals will be completed during the week. Buttons with a black background indicate the selected days. The user must provide a name and a description for the 1st Weekly Goal in order to continue on to the next page.
<br></br>
The next page depends upon the number of Annual and Monthly goals created by the user. The system will first check to see if there are any other Monthly goals that were created under the current Annual goal. If so, a new Weekly Goal Entry screen will open with the name of the new Monthly Goal.
<br></br>
If there are no more Montly goals for the current Annual goal, the system will check to see if there is another Annual goal. If so, the system will open the Montly Goal Entry page with the appropriate Annual Goal showing on the screen. If there are no more Annual Goals, the screen will go to the Existing Goal page.

### Existing Goals
<img src="Screenshots/Existing - Annual.png" alt="Existing Annual Goals">
<img src="Screenshots/Existing - Month.png" alt="Existing Month Goals">
<img src="Screenshots/Existing - Week.png" alt="Existing Week Goals">
The Existing screen begins by showing all of the user's Annual Goals. Selecting an Annual goal changes the screen to show all of the Monthly goals underneath the sslected Annual Goal. Selecting an Monthly goal changes the screen to show all of the Weekly goals underneath the selected Montly goal. With the Weekly goals visible, the user can indicate which days the Weekly goals have been completed using the sliders. (Sliders are not available for the days on which the user did not indicate the goal would be completed. See the Weekly Goal Entry for more details.)
<br></br>
The user can return to the Annual or Montly view by clicking on the name of the selected Monthly or Annual Goal.


## Current Dev Status
#### August 10, 2022
As of today, all of the input screens for a new user have been created. A screen for existing users to mark the completion of Weekly Goals also exists. The site begins on the landing page, with prompts to Sign Up or Log In. *Currently, there is no user authentication, so there is no need to enter Username or password.*

## Next Steps
1. Create the screen for users to mark the completion of Monthly and Annual Goals.
2. Finalize desired color scheme.
3. Integrate Firebase Auth.
4. Continue fixing formatting and styling issues.
5. Make the site mobile friendly.
6. Create Progress screens where users can track their performance over time.
7. Create "Inspiration" pop-ups that show daily inspirational quotes.
8. User testing.