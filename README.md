# Crossmedia Stranger Things

## An interactive crossmedia experience inspired by Stranger Things.

# Start the server

> Make sure you have Deno installed or php to be able to host the frontend

> Run the following command:
> deno -A server.js

# Open the project

> Navigate to 

> http://localhost:<port>/client


# Navigation

> The project uses a search param as navigation through the pages as test:

> ?page=

# Available Endpoints

| Page        | Endpoint          |
| ----------- | ----------------- |
| Startpage   | ?page=startpage   |
| Podcast     | ?page=podcast     |
| Timer       | ?page=timer       |
| Navigation  | ?page=navigation  |
| Ending      | ?page=ending      |
| Podcastfas4 | ?page=podcastfas4 |
| Lastpage    | ?page=lastpage    |


# Architecture

- Pubsub
    > Used for communication between modules and components.

- State Management
    > Handles UI updates depending on user state.

- Store Architecture
    > Data handling for application state management.

- Javascripts webcomponents
    > Reusable custom HTML elements to organize the application logic and UI structure.


