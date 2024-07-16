import { StrictMode } from "react";
import ReactDOM from "react-dom/client"
import {
    RouterProvider, createRoutesFromElements,
    createBrowserRouter, Route
} from "react-router-dom";
//
import config from "./config/config";
import routes from "./config/routes"
// Components
import PageTitle from "./components/PageTitle";
import Error from "./components/Error";

const router = createBrowserRouter(
    createRoutesFromElements(
        routes.map((route, i) => {
            return (
                <Route
                    key={i}
                    path={route.path}
                    element={
                        <>
                            <PageTitle title={route.title} />
                            <route.element />
                        </>
                    }
                    loader={route.loader}
                    errorElement={<Error />}
                />
            )
        })
    ), { basename: config.basename }
)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)