import classes from "./LoadingScreen.module.scss"

export default function LoadingScreen() {
    return (
        <div className={classes.loading}>
            <div className={classes.loader}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}