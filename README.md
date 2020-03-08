# Legend of Iron

<br>

## Description

This is a visual novel video game, with a plot centering in a student's typical day at Ironhack. 

<br>

## User stories

- **Story:** As a user, I would like to interact with the story and feel part of it via sounds and effects.

- **Save/Load:** As a user, I would like to save my progress.
  - I would also like to load the save file whenever I want.

- **Backlog:** As a user, I would like to see a backlog to keep track of the dialogue and choices I make throughout the game.	

- **Settings:** As a user, I would like to have the settings menu available at all times.
- **NewPlayer:** As a user, I would like to create a new player and set the characteristics I want.

<br>

## Backlog

- **Less restrictive saving option:** give more option to the player to save whenever in the game they want.
- **More chapters!**
- **Playthrough comparison**: lets the user see the other player decisions in their playthroughs.

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                 | Component    | Permissions                | Behavior                                                     |
| -------------------- | ------------ | -------------------------- | ------------------------------------------------------------ |
| `/`                  | TitleScreen  | public `<Route>`           | Title page.                                                  |
| `/signup`            | SignUp       | anon only  `<AnonRoute>`   | Signup form, link to login, new player form, navigate to homepage after signup. |
| `/login`             | LogIn        | anon only  `<AnonRoute>`   | Login form, link to signup, navigate to homepage after login |
| `/logout`            | n/a          | user only `<PrivateRoute>` | Navigate to title screen after logout, expire session.       |
| `/home`              | MainScreen   | user only `<PrivateRoute>` | Shows the new game and load game options.                    |
| `/profile`           |              | user only `<PrivateRoute>` | Edits the player info.                                       |
| `/settings`          | SettingsMenu | user only `<PrivateRoute>` | Shows the settings menu, leading to Save, Load, and Edit Student. |
| `/settings`          |              |                            |                                                              |
| `/settings/saveload` | SaveLoadMenu | user only `<PrivateRoute>` | Shows the save slots available for saving new game into, or games previously saved to load from. |
| `/story`             |              | user only `<PrivateRoute>` | This is where the magic (game) happens!                      |
| `/story/choice`      | ChoicesMenu  | user only `<PrivateRoute>` | Gives the player the choices they have to make at a specific point of the story to carry on with it. |
| `/story/ending`      | EndingScreen | user only `<PrivateRoute>` | Screen that shows at the end of the story depending on the decisions taken by the player. |
| `/story/backlog`     | BackLog      | user only `<PrivateRoute>` | Dialogue receipt of the progress of the game and the choices taken by the player. |

## Components

- BackLog
- SettingsMenu
- SaveLoadMenu
- ChoicesMenu
- EndingScreen
- LogIn
- SignUp

<br>

## Services

no idea no idea no idea

<br>

# Server / Backend

## Models

```javascript
User {
  _id:
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
	studentName: {type: String, required: true},
	cohort: {type: String, required: true}, 
	saveSlots: [{type: Schema.types.ObjectId, ref: ‘SaveFile’}]
}

SaveFile {
  _id:
  user: {type: Schema.types.ObjectId, ref: ‘User’}
  gameState: [{choiceId}]
}

Playthrough {
  _id:
  username: {type: Schema.types.ObjectId, ref: ‘User’},
  choicesLog: []
}
```

<br>

## Endpoints (backend routes)

| HTTP Method | URL                              | Request Body                              | Success Status | Error Status | Description                                                  |
| ----------- | -------------------------------- | ----------------------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST        | `/auth/signup`                   | {studentName, username, password, cohort} | 201            | 404          |                                                              |
| POST        | `/auth/login`                    | {username, password}                      | 200            | 404          |                                                              |
| POST        | `/auth/logout`                   | (empty)                                   | 204            | 400          |                                                              |
| PUT         | `/settings/edituser/`            | {studentName, cohort}                     | 200            | 400          | Edits user info                                              |
| GET         | `/settings/saveload`             |                                           | 200            | 404          | Lists all saveFiles (saveSlots)                              |
| POST        | `/story/:saveloadId`             | {[choiceId]}                              | 201            | 400          | Saves story progress, that was temporarily stored in localStorage, in a saveFile |
| DELETE      | `/settings/saveload/:saveloadid` |                                           | 200            | 400          | Deletes a saveFile                                           |
| GET         | `/story/:saveloadId`             |                                           |                |              | Loads a saveFile                                             |

<br>

## Links

### Trello

[Go to Trello Board](https://trello.com/b/khs34Ott)

### Github

[Server Repository](https://github.com/valmgisbert/legend-of-iron-server)

[Client Repository](

[Deployed App Link](

### Slides

[GSlides](

