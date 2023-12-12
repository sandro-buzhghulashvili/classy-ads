import React, {useState} from "react";

import classes from "./NewAdForm.module.scss"
import useInput from "../hooks/use-input"

const NewAdForm = () => {
    const {
        value : titleValue,
        hasError : titleHasError,
        valueChangeHandler : titleChangeHandler,
        blurHandler : titleBlurHandler,
        isValid : titleIsValid
    } = useInput(value => !(value.trim().length > 0))

    const {
        value : typeValue,
        hasError : typeHasError,
        valueChangeHandler : typeChangeHandler,
        blurHandler : typeBlurHandler,
        isValid : typeIsValid
    } = useInput(value => !(value.trim().length > 0))

    const {
        value : locationValue,
        hasError : locationHasError,
        valueChangeHandler : locationHandler,
        blurHandler : locationBlurHandler,
        isValid : locationIsValid
    } = useInput(value => !(value.trim().length > 0))

    const {
        value : imgValue,
        hasError : imgHasError,
        valueChangeHandler : imgChangeHandler,
        blurHandler : imgBlurHandler,
        isValid : imgIsValid
    } = useInput(value => !(value.trim().length > 0))

    const {
        value : quantityValue,
        hasError : quantityHasError,
        valueChangeHandler : quantityChangeHandler,
        blurHandler : quantityBlurHandler,
        isValid : quantityIsValid
    } = useInput(value => !(value.trim().length > 0))

    const {
        value : ratingValue,
        hasError : ratingHasError,
        valueChangeHandler : ratingChangeHandler,
        blurHandler : ratingBlurHandler,
        isValid : ratingIsValid
    } = useInput(value => !(Number(value) > 0 && Number(value) <= 5))

    const {
        value : reviewQuantityValue,
        hasError : reviewQuantityHasError,
        valueChangeHandler : reviewQuantityChangeHandler,
        blurHandler : reviewQuantityBlurHandler,
        isValid : reviewQuantityIsValid
    } = useInput(value => !(Number(value)))


    return (
        <form className={classes.form}>
            <div className={`${classes['form-control']} ${titleHasError ? classes.error : undefined}`}>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" value={titleValue} onChange={titleChangeHandler} onBlur={titleBlurHandler}/>
            </div>
            <div className={`${classes['form-control']} ${typeHasError ? classes.error : undefined}`}>
                <label htmlFor="type">Type</label>
                <input id="type" name="type" type="text" value={typeValue} onChange={typeChangeHandler} onBlur={typeBlurHandler}/>
            </div>
            <div className={`${classes['form-control']} ${locationHasError ? classes.error : undefined}`}>
                <label htmlFor="location">Location</label>
                <input id="location" name="location" type="text" value={locationValue} onChange={locationHandler} onBlur={locationBlurHandler} />
            </div>
            <div className={`${classes['form-control']} ${imgHasError ? classes.error : undefined}`}>
                <label htmlFor="img">Image</label>
                <input id="img" name="img" type="text" value={imgValue} onChange={imgChangeHandler} onBlur={imgBlurHandler} />
            </div>
            <div className={`${classes['form-control']} ${quantityHasError ? classes.error : undefined}`}>
                <label htmlFor="quantity">Quantity</label>
                <input id="quantity" name="quantity" type="text" value={quantityValue} onChange={quantityChangeHandler} onBlur={quantityBlurHandler} />
            </div>
            <div className={`${classes['form-control']} ${ratingHasError ? classes.error : undefined}`}>
                <label htmlFor="reviewRate">Review rating (1-5)</label>
                <input id="reviewRate" name="reviewRate" type="text" value={ratingValue} onChange={ratingChangeHandler} onBlur={ratingBlurHandler} />
            </div>
            <div className={`${classes['form-control']} ${reviewQuantityHasError ? classes.error : undefined}`}>
                <label htmlFor="reviewQuantity">Review's Quantity</label>
                <input id="reviewQuantity" name="reviewQuantity" type="text" value={reviewQuantityValue} onChange={reviewQuantityChangeHandler} onBlur={reviewQuantityBlurHandler} />
            </div>
            <div className={classes['form-control']}>
                <button className={classes.submit}>Submit</button>
            </div>
        </form>
    )
}

export default NewAdForm