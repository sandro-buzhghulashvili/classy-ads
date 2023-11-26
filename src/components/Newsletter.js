import classes from "./Newsletter.module.scss"

export default function Newsletter() {
    return (
        <div className={classes.newsletter}>
            <div className={classes.container}>
                <div className={classes.caption}>
                    <h2>Newsletter</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className={classes.input}>
                    <input type="email" placeholder="Email" />
                </div>
            </div>
        </div>
    )
}