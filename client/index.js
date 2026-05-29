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


// IMPORT GLOBAL COMPONENTS HERE
import "./globalcomponents/headerComp/headerComp.js"
import "./views/timer/globalTimerFunc.js";


// ROUTER HERE
import { router } from "./core/router/Router.js";
router.urlHistoryNavigate();
router.updateUrl(window.location.search)



