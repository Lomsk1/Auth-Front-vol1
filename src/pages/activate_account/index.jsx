import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { signUpVerification } from "../../auth/authApi";

function ActivateAccount() {
    const dispatch = useDispatch();
    const {handleSubmit} = useForm()
  
    const requiredItems = useParams();
  

    const activateHandler = () => {
        const formData = new FormData()

        formData.append('uid', requiredItems.uid)
        formData.append('token', requiredItems.token)

        dispatch(signUpVerification({
            uid: requiredItems.uid,
            token: requiredItems.token,
        }))
    }

    return ( 
        <Fragment>
            <h1>Activate Account</h1>
            <form onSubmit={handleSubmit(activateHandler)}>
            <button>activate here</button>
            </form>
            
        </Fragment>
     );
}

export default ActivateAccount;