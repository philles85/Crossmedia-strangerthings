// IMPORT VIEWS HERE
import "./core/localstorageAPI/LocalStorage.js";

import "./views/startpage/StartpageView.js";
import "./views/podcastFas1/PodFas1View.js";
import "./views/timer/TimerView.js";
import "./views/endpage/endView.js";
import "./views/podcastFas4/PodFas4View.js";
import "./views/lastVideo/lastVideoView.js";
import "./views/navigation/navigationView.js";
import "./views/gameover/gameOverView.js";
import "./globalcomponents/headerComp/headerComp.js"

// import "./views/popups/PopupView.js";

// IMPORT GLOBALCOMPONENTS HERE



import "./views/timer/globalTimerFunc.js";

import { router } from "./core/router/Router.js";

router.urlHistoryNavigate();

router.updateUrl(window.location.search)

console.log(window.location.pathname)


// localStorageService.storageUpdateState();
// localStorageService.clearStorage();

// TEMPORARY, FIX LATER!!!
// import "./views/timer/globalTimerFunc.js";



