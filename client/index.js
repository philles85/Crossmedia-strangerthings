// IMPORT VIEWS HERE
import "./views/startpage/StartpageView.js";
import "./views/podcast/PodCastView.js";
import "./views/timer/TimerView.js";


// IMPORT GLOBALCOMPONENTS HERE
import "./globalcomponents/headerComp/headerComp.js"


import { router } from "./core/router/Router.js";

router.updateUrl(window.location.pathname)
console.log(window.location.pathname)
