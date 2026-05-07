// IMPORT VIEWS HERE
import "./views/startpage/StartpageView.js";
import "./views/podcastFas1/PodFas1View.js";
import "./views/timer/TimerView.js";
import "./views/endpage/endView.js";
import "./views/lastVideo/lastVideoView.js";

import "./views/navigation/navigationView.js";

// IMPORT GLOBALCOMPONENTS HERE
import "./globalcomponents/headerComp/headerComp.js"


import { router } from "./core/router/Router.js";

router.updateUrl(window.location.search)
router.urlHistoryNavigate();
console.log(window.location.pathname)
