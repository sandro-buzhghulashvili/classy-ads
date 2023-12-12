import React, {useState, useEffect, useContext} from "react";
import userContext from "../store/user-context"

import { useNavigate } from "react-router-dom";

import classes from "./NewAdForm.module.scss"
import useInput from "../hooks/use-input"
import LoadingScreen from "./UI/LoadingScreen";

const NewAdForm = () => {
    const ctx = useContext(userContext)

    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()
    const [formIsValid,setFormIsValid] = useState(false)

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
    } = useInput(value => !(Number(value)))

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

    const addProduct = async (product) => {
        setLoading(true)
        try {
            const res = await fetch("https://classy-ads-8216b-default-rtdb.firebaseio.com/ads/-Nk5BEfJrNCg89tznfhP.json", {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(product)
            })

            if(!res.ok) {
                ctx.applyFlashMessage({status : 'error', message : 'Could not added new ad'})
                navigate('/')
            } else {
                ctx.applyFlashMessage({status : 'success', message : "Successfully added new ad"})
                navigate('/ads')
            }

            setLoading(false)
        } catch(e) {
            setLoading(false)
            ctx.applyFlashMessage({status : 'error', message : 'Could not added new ad'})
            navigate('/')
        }
    }

    const submitHandler = event => {
        event.preventDefault()

        const obj = {
            title : titleValue,
            type : typeValue,
            location : locationValue,
            img : imgValue,
            productQuantity : quantityValue,
            reviews : ratingValue,
            reviewQuantity : reviewQuantityValue
        }

        addProduct(obj)

        console.log(obj)
    }


    useEffect(() => {
        if(titleIsValid && locationIsValid && typeIsValid && imgIsValid && quantityIsValid && ratingIsValid && reviewQuantityIsValid) {
            setFormIsValid(true)
        } else {
            setFormIsValid(false)
        }
    }, [titleIsValid,typeIsValid,locationIsValid,imgIsValid,quantityIsValid,ratingIsValid,reviewQuantityIsValid])

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            {loading && <LoadingScreen />}
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
                <button className={classes.submit} disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    )
}

export default NewAdForm