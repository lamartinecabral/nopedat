// @ts-check

import { initEventListeners, initStateListeners } from "./control";
import { initCss } from "./css";
import { initHtml } from "./html";
import { initAuthListener, initConfig } from "./service";

initHtml();
initCss();
initStateListeners();
initEventListeners();
initAuthListener();
initConfig();
