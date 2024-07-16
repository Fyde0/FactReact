import config from "../config/config"

export interface IPageTitleProps {
    title: string | undefined
}

function PageTitle(props: IPageTitleProps) {
    let newTitle = config.appTitle

    if (props.title !== "" && props.title !== undefined) {
        newTitle = newTitle + " - " + props.title
    }

    document.title = newTitle

    return null
}

export default PageTitle;