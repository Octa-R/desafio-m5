import { initWelcomePage } from "./pages/welcome";
import { initInstructionsPage } from "./pages/instructions";
import { initGamePage } from "./pages/game";
import { initGameOverPage } from "./pages/game-over";

const routes = [
  {
    path: /\//,
    component: initWelcomePage,
  },
  {
    path: /\/instructions/,
    component: initInstructionsPage,
  },
  {
    path: /\/game/,
    component: initGamePage,
  },
  {
    path: /\/game-over/,
    component: initGameOverPage,
  },
];

export function initRouter(container: Element) {
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route) {
    console.log("handle route manejo la ruta: ", route);
    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.component({ goTo: goTo });

        if (container.firstChild) {
          container.firstChild.remove();
        }

        container.appendChild(el);
      }
    }
  }

  handleRoute(location.pathname);
}
