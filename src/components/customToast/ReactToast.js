
import React, { useState, forwardRef, useImperativeHandle } from "react"
import './CustomToast.css';

function ReactToast({ timeout = 1500 }, ref) {
    const [show, setShow] = useState(false)
    const [toastMsg, setToastMsg] = useState(false)
    console.log("toastMsg", toastMsg);

    useImperativeHandle(ref, () => ({
        showToast(msg = "") {
            setShow(true)
            setToastMsg(msg)
            setTimeout(() => {
                setShow(false)
            }, timeout)
        },
    }))

    return <div className={`react-toast-container ${show ? "show" : ""}`}>{toastMsg}</div>
}
export default forwardRef(ReactToast)
