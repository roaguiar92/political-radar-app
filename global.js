import { renderRoute } from "./routes.js";

window.addEventListener('DOMContentLoaded', renderRoute);
window.addEventListener('hashchange', renderRoute);