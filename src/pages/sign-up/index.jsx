import Header from "@/components/Header";
import Axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import validations from "../../../public/global_functions/validations";
import { useRouter } from "next/router";

const SignUp = () => {

    const [firstName, setFirstName] = useState("");

    const [lastName, setLastName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [resultMsg, setResultMsg] = useState("");

    const [errors, setErrors] = useState({});

    const router = useRouter();

    const signUpNow = async (e) => {
        e.preventDefault();
        setErrors({});
        let errorsObject = validations.inputValuesValidation([
            {
                name: "firstName",
                value: firstName,
                rules: {
                    isRequired: {
                        msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                    },
                },
            },
            {
                name: "lastName",
                value: lastName,
                rules: {
                    isRequired: {
                        msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                    },
                },
            },
            {
                name: "email",
                value: email,
                rules: {
                    isRequired: {
                        msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                    },
                    isEmail: {
                        msg: "عذراً ، الإيميل الذي أدخلته غير صالح ، الرجاء إدخال إيميل صالح !!",
                    },
                },
            },
            {
                name: "password",
                value: password,
                rules: {
                    isRequired: {
                        msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                    },
                    isPassword: {
                        value: password,
                        msg: "عذراً ، يجب أن يكون عدد أحرف الكلمة 8 على الأقل ولا تحتوي محارف خاصة ، وتحتوي على أحرف",
                    },
                },
            },
            {
                name: "confirmPassword",
                value: confirmPassword,
                rules: {
                    isRequired: {
                        msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                    },
                    isMatch: {
                        value: password,
                        msg: "عذراً ، لا يوجد تطابق بين كلمة السر وتأكيدها !!",
                    },
                },
            },
        ]);
        setErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            try {
                setIsWaitStatus(true);
                const res = await Axios.post(`${process.env.BASE_API_URL}/users/create-new-user`, {
                    firstName,
                    lastName,
                    email,
                    password
                });
                setTimeout(async () => {
                    setIsWaitStatus(false);
                    const msg = await res.data;
                    if (msg === "Ok !!, Create New User Is Successfuly !!") {
                        setResultMsg(msg);
                        setTimeout(() => {
                            setResultMsg("");
                            router.push("/login");
                        }, 3000);
                    } else if (msg === "Sorry, Can't Create User Because it is Exist !!!") {
                        setTimeout(() => {
                            setErrorMsg(msg);
                            setTimeout(() => {
                                setErrorMsg("");
                            }, 3000);
                        }, 3000);
                    }
                }, 2000);
            } catch (err) {
                setErrorMsg(err);
            }
        }
    }

    return (
        // Start Sign Up Page
        <div className="sign-up">
            <Head>
                <title>Tavlorify Store - Sign Up</title>
            </Head>
            <Header />
            {/* Start Container */}
            <div className="custom-container pt-5 pb-5">
                <h4 className="welcome-msg border-success border-2 border p-3 mb-3">Welcome To You In Registeration Page</h4>
                <hr />
                <h5 className="p-3 text-center border border-2 border-secondary mb-5">Registeration</h5>
                <form
                    className="signup-form p-4"
                    style={{ boxShadow: "1px 1px 10px green" }}
                    onSubmit={signUpNow}
                >
                    {/* Start Grid System */}
                    <div className="row">
                        {/* Start Column */}
                        <div className="col-md-6">
                            {/* Start Input Field Box */}
                            <div className="input-field-box mb-5">
                                <h6>First Name: </h6>
                                <input
                                    type="text"
                                    placeholder="Please Enter Your First Name Here ."
                                    className={`form-control border-success border-2 ${errors["firstName"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors["firstName"] && <p className='error-msg text-danger m-0'>{errors["firstName"]}</p>}
                            </div>
                            {/* End Input Field Box */}
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            {/* Start Input Field Box */}
                            <div className="input-field-box mb-5">
                                <h6>Last Name: </h6>
                                <input
                                    type="text"
                                    placeholder="Please Enter Your Last Name Here ."
                                    className={`form-control border-success border-2 ${errors["lastName"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors["lastName"] && <p className='error-msg text-danger m-0'>{errors["lastName"]}</p>}
                            </div>
                            {/* End Input Field Box */}
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System */}
                    {/* Start Input Field Box */}
                    <div className="input-field-box mb-5">
                        {/* Start Grid System */}
                        <div className="row align-items-center">
                            {/* Start Column */}
                            <div className="col-md-2">
                                Email *
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    placeholder="Please Enter Your Email Here ."
                                    className={`form-control border-success border-2 ${errors["email"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors["email"] && <p className='error-msg text-danger m-0'>{errors["email"]}</p>}
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System */}
                    </div>
                    {/* End Input Field Box */}
                    {/* Start Input Field Box */}
                    <div className="input-field-box mb-5">
                        {/* Start Grid System */}
                        <div className="row align-items-center">
                            {/* Start Column */}
                            <div className="col-md-2">
                                Password *
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-10">
                                <input
                                    type="password"
                                    placeholder="Please Enter Your Password Here ."
                                    className={`form-control border-success border-2 ${errors["password"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors["password"] && <p className='error-msg text-danger m-0'>{errors["password"]}</p>}
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System */}
                    </div>
                    {/* End Input Field Box */}
                    {/* Start Input Field Box */}
                    <div className="input-field-box mb-5">
                        {/* Start Grid System */}
                        <div className="row align-items-center">
                            {/* Start Column */}
                            <div className="col-md-2">
                                Confirm Password *
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-10">
                                <input
                                    type="password"
                                    placeholder="Please Re-enter the Password Here ."
                                    className={`form-control border-success border-2 ${errors["confirmPassword"] ? "border border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {errors["confirmPassword"] && <p className='error-msg text-danger m-0'>{errors["confirmPassword"]}</p>}
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System */}
                    </div>
                    {/* End Input Field Box */}
                    {!isWaitStatus && !errorMsg && !resultMsg && <button className="btn btn-success mx-auto d-block mb-4">
                        <span className="me-2">Sign Up Now</span>
                        <FiLogIn />
                    </button>}
                    {isWaitStatus && <button className="btn btn-primary mx-auto d-block mb-4" type="button" disabled>
                        <span className="me-2">Loading</span>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    </button>}
                    {errorMsg && <p className="alert alert-danger mb-4">{errorMsg}</p>}
                    {resultMsg && <p className="alert alert-success mb-4">{resultMsg}</p>}
                    <div className="go-login-page-box text-center">
                        <span className="me-2">Already have account?</span>
                        <Link href="/login" className="btn">Login now</Link>
                    </div>
                </form>
            </div>
            {/* End Container */}
        </div>
        // End Sign Up Page
    );
}

export default SignUp;