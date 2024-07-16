import IRoute from "../interfaces/route"
import Intro from "../pages/Intro"
import Game, { loader as gameLoader } from "../pages/Game"

const routes: IRoute[] = [
    {
        path: "/",
        element: Intro,
    },
    {
        path: "/game",
        element: Game,
        title: "Game",
        loader: gameLoader
    }
]

export default routes