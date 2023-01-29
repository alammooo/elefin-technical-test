import { useEffect } from "react"
import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import {
  applyPosition,
  companyList,
  dispatchData,
} from "../stores/actions/actionCreator"
import { BiCheck } from "react-icons/bi"
import { MdOutlineDangerous } from "react-icons/md"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const { registerReducer, positionReducer } = useSelector((state) => state)
  const nav = useNavigate()
  const dispatch = useDispatch()

  const [position, setPosition] = useState([])
  const [checked, setChecked] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const [validName, setValidName] = useState(false)

  const [validPhone, setValidPhone] = useState(false)

  const [showPassConfirm, setShowPassConfirm] = useState(false)
  const [registerData, setRegisterData] = useState({
    company: "",
    position: [],
    fullName: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
  })

  const [error, setError] = useState({
    invalidPhone: "",
    invalidName: "",
    invalidPassword: "",
  })

  const [matchPassword, setMatchPassword] = useState(false)

  useEffect(() => {
    dispatch(companyList())
    dispatch(applyPosition())
  }, [dispatch])

  function onChangeHandler(e) {
    const toUpdate = { ...registerData, [e.target.name]: e.target.value }
    setRegisterData(toUpdate)
  }

  function handleChangePosition(e) {
    const { value, checked } = e.target
    if (value === "Check All") {
      setPosition(checked ? positionReducer : [])
      setRegisterData(
        checked
          ? { ...registerData, position: positionReducer }
          : { ...registerData, position: [] }
      )
    } else {
      setPosition(
        checked
          ? [...position, value]
          : position.filter((item) => item !== value)
      )
      setRegisterData(
        checked
          ? { ...registerData, position: [...position, value] }
          : {
              ...registerData,
              position: position.filter((item) => item !== value),
            }
      )
    }
  }

  function changeNameHandler(e) {
    const { value } = e.target
    const regex = /^[a-zA-Z\s]+$/g
    if (regex.test(value) && value.split(" ").length >= 2 && value.length > 3) {
      setValidName(true)
      setError({ ...error, invalidName: "" })
      setRegisterData({ ...registerData, fullName: value })
    } else {
      setValidName(false)
      setError({
        ...error,
        invalidName:
          "Must be a text with a minumum of 3 characters and a maximum of 2 words representing First Name and Last Name",
      })
      setRegisterData({ ...registerData, fullName: "" })
    }
  }

  function changePhoneHandler(e) {
    const { value } = e.target
    const regex = /^\d{11}$/g
    if (regex.test(value) === true && value.length === 11) {
      setValidPhone(true)
      setError({ ...error, invalidPhone: "" })
      setRegisterData({ ...registerData, phoneNumber: "+62" + value })
    } else {
      setValidPhone(false)
      setError({
        ...error,
        invalidPhone: "Must be a mobile number with minumum of 11 digits",
      })
      setRegisterData({ ...registerData, phoneNumber: "" })
    }
  }

  // function validatePhone(e) {
  //   const { value } = e.target
  //   if (value.search(/[^\d]/ === -1 && value <= 11)) {
  //     setInvalidPhone(true)
  //   } else {
  //     setInvalidPhone(false)
  //   }
  // }

  function changePasswordHandler(e) {
    const { value, name } = e.target
    if (name === "password") {
      setRegisterData({ ...registerData, password: value })
    } else if (name === "passwordConfirm") {
      setRegisterData({ ...registerData, passwordConfirm: value })
    }
  }

  useEffect(() => {
    if (registerData.password === registerData.passwordConfirm) {
      setError({ ...error, invalidPassword: "" })
      setMatchPassword(true)
    } else {
      setError({ ...error, invalidPassword: "Password does not match" })
      setMatchPassword(false)
    }
  }, [registerData.password, registerData.passwordConfirm])

  function handleSubmit(e) {
    e.preventDefault()
    if (registerData) {
      dispatch(dispatchData(registerData))
      nav("user-list")
    } else return
  }

  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <div className="border shadow-lg flex flex-col md:w-1/3 rounded-lg overflow-hidden sm:w-full">
        <section className="w-full bg-zinc-100 py-2 border-b shadow-sm">
          <h1 className="text-lg px-4">Join Us!</h1>
        </section>

        <form
          className="px-4 py-3 flex flex-col gap-4"
          onSubmit={handleSubmit}
          autoComplete="off">
          <section>
            <label htmlFor="company" className="block mb-2">
              Company to Apply
            </label>
            <div className="relative w-full">
              <select
                id="company"
                name="company"
                onChange={onChangeHandler}
                className={`border-gray-300 bg-transparent rounded-lg block w-full outline-none p-2 border ${
                  registerData.company ? "border-green-500" : ""
                }`}>
                <option disabled selected hidden>
                  Select Company
                </option>
                {registerReducer?.map((company, i) => (
                  <option value={company} key={i}>
                    {company}
                  </option>
                ))}
              </select>
              {registerData.company && (
                <div className="absolute inset-0 -z-10 flex h-full items-center justify-end pr-7">
                  <BiCheck className="w-8 h-8 inset-0 fill-green-500" />
                </div>
              )}
            </div>

            <h1
              className={`text-green-500 mt-1 ${
                registerData.company ? "block" : "hidden"
              }`}>
              Looks good!
            </h1>
          </section>

          <section>
            <h1 className="mb-2">Position to Apply</h1>
            {positionReducer?.map((data, i) => (
              <div className="flex items-center mb-1" key={i}>
                <input
                  id={`position-checkbox${i}`}
                  type="checkbox"
                  name={data}
                  value={data}
                  checked={
                    position.includes(data) ||
                    position.length === positionReducer.length
                  }
                  onChange={handleChangePosition}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor={`position-checkbox${i}`} className="ml-2">
                  {data}
                </label>
              </div>
            ))}
          </section>

          <section>
            <label htmlFor="full-name" className="block mb-2">
              Full Name
            </label>
            <div className="relative w-full">
              <input
                autoComplete="off"
                type="text"
                id="full-name"
                name="fullName"
                className={`border bg-transparent outline-none border-gray-300 rounded-lg block w-full p-2 ${
                  error.invalidName ? "border-red-500" : ""
                } ${validName ? "border-green-500" : ""}`}
                placeholder="Paul Hughes"
                onChange={changeNameHandler}
              />

              <div className="absolute inset-0 -z-10 flex h-full items-center justify-end pr-3">
                <MdOutlineDangerous
                  className={`w-8 h-8 inset-0 fill-red-500 ${
                    error.invalidName ? "block" : "hidden"
                  }`}
                />
              </div>

              <div className="absolute inset-0 -z-10 flex h-full items-center justify-end pr-3">
                <BiCheck
                  className={`w-8 h-8 inset-0 fill-green-500 ${
                    validName ? "block" : "hidden"
                  }`}
                />
              </div>
            </div>
            <p
              className={`mt-1 text-green-500 ${
                validName ? "block" : "hidden"
              }`}>
              Looks good!
            </p>
            <p className={`mt-1 text-red-500`}>{error.invalidName}</p>
          </section>

          <section className="flex flex-col">
            <label htmlFor="phone-number" className="block mb-2">
              Phone Number
            </label>
            <div className="flex relative">
              <span className="inline-flex items-center px-3.5 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                +62
              </span>
              <input
                autoComplete="off"
                id="phone-number"
                name="phoneNumber"
                onChange={changePhoneHandler}
                type="text"
                maxLength={11}
                className={`outline-none rounded-none bg-transparent rounded-r-lg border block flex-1 min-w-0 w-full border-gray-300 p-2 ${
                  validPhone ? "border-green-500" : ""
                } ${error.invalidPhone ? "border-red-500" : ""}`}
                placeholder="815-wxyz-1234"
              />
              {validPhone && registerData.phoneNumber && (
                <div className="absolute inset-0 -z-10 flex h-full items-center justify-end pr-3">
                  <BiCheck className="w-8 h-8 inset-0 fill-green-500" />
                </div>
              )}
              {!validPhone && error.invalidPhone && (
                <div className="absolute inset-0 -z-10 flex h-full items-center justify-end pr-3">
                  <MdOutlineDangerous className="w-8 h-8 inset-0 fill-red-500" />
                </div>
              )}
            </div>
            {!validPhone && error.invalidPhone && (
              <h1 className="text-red-500">{error.invalidPhone}</h1>
            )}

            {validPhone && registerData.phoneNumber && (
              <h1 className="text-green-500 mt-1">Looks good!</h1>
            )}
          </section>

          <section className="flex flex-col">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <div className="flex relative">
              <input
                autoComplete="off"
                id="password"
                name="password"
                onChange={changePasswordHandler}
                type={showPass ? "text" : "password"}
                required
                className={`outline-none rounded-none bg-transparent rounded-l-lg border block flex-1 w-full border-gray-300 p-2 ${
                  registerData.password ? "border-green-500" : ""
                }`}
                placeholder="•••••••••"
              />
              {registerData.password && (
                <div className="absolute inset-0 -z-10 flex h-full items-center justify-end pr-16">
                  <BiCheck className="w-8 h-8 inset-0 fill-green-500" />
                </div>
              )}
              <span className="inline-flex items-center px-4 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md">
                {showPass ? (
                  <AiFillEyeInvisible
                    className="w-6 h-6 cursor-pointer select-none"
                    onClick={() => setShowPass(!showPass)}
                  />
                ) : (
                  <AiFillEye
                    className="w-6 h-6 cursor-pointer select-none"
                    onClick={() => setShowPass(!showPass)}
                  />
                )}
              </span>
            </div>
            {registerData.password && (
              <h1 className="text-green-500">
                Looks good! Don't worry, we won't tell anyone.
              </h1>
            )}
          </section>

          <section className="flex flex-col">
            <label htmlFor="passwordConfirm" className="block mb-2">
              Confirm Password
            </label>
            <div className="flex relative">
              <input
                autoComplete="off"
                id="passwordConfirm"
                name="passwordConfirm"
                type={showPassConfirm ? "text" : "password"}
                onChange={changePasswordHandler}
                required
                className={`outline-none rounded-none bg-transparent rounded-l-lg border block flex-1 min-w-0 w-full border-gray-300 p-2 ${
                  matchPassword && registerData.passwordConfirm
                    ? "border-green-500"
                    : ""
                } ${
                  error.invalidPassword && registerData.passwordConfirm
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="•••••••••"
              />
              {matchPassword && registerData.passwordConfirm && (
                <div className="absolute inset-0 -z-10 flex h-full items-center justify-end pr-16">
                  <BiCheck className="w-8 h-8 inset-0 fill-green-500" />
                </div>
              )}
              {error.invalidPassword && registerData.passwordConfirm && (
                <div className="absolute inset-0 -z-10 flex h-full items-center justify-end pr-16">
                  <MdOutlineDangerous className="w-8 h-8 inset-0 fill-red-500" />
                </div>
              )}
              <span className="inline-flex items-center px-4 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md">
                {showPassConfirm ? (
                  <AiFillEyeInvisible
                    className="w-6 h-6 cursor-pointer select-none"
                    onClick={() => setShowPassConfirm(!showPassConfirm)}
                  />
                ) : (
                  <AiFillEye
                    className="w-6 h-6 cursor-pointer select-none"
                    onClick={() => setShowPassConfirm(!showPassConfirm)}
                  />
                )}
              </span>
            </div>
            {error.invalidPassword && registerData.passwordConfirm && (
              <h1 className="text-red-500">{error.invalidPassword}</h1>
            )}
            {matchPassword && registerData.passwordConfirm && (
              <h1 className="text-green-500">Looks good!</h1>
            )}
          </section>

          <section className="flex items-center">
            <input
              id="link-checkbox"
              type="checkbox"
              name="terms"
              onChange={(e) => setChecked(!checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label htmlFor="link-checkbox" className="ml-2">
              Agree to terms and conditions
            </label>
          </section>

          <button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center active:scale-95 duration-200 cursor-pointer disabled:active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={checked ? false : true}>
            Register
          </button>
        </form>
      </div>
    </section>
  )
}
