'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import './styles.css'
import { useState } from 'react'

type Inputs = {
    email: string
    password: string
}

type ApiError = {
    errors: { message: string; field?: string }[]
}

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const [apiError, setApiErrors] = useState<ApiError | null>(null)
    const [apiSuccess, setApiSuccess] = useState(undefined)

    const onSubmit: SubmitHandler<Inputs> = async data => {
        try {
            const response = await axios.post('/api/users/signup', data)
            console.log(response.data)
            setApiErrors(null)
            setApiSuccess(response.data)
        } catch (error) {
            axios.isAxiosError(error) && setApiErrors(error.response?.data)
        }
    }

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input
                    {...register('email', {
                        required: true,
                    })}
                    type="email"
                />
                {errors?.email && <p>This field is required</p>}
                <label>Password</label>
                <input {...register('password', { required: true })} type="password" />
                {errors?.password && <p>This field is required</p>}

                <input type="submit" value={'Sign Up'} />
            </form>

            {apiError && (
                <div className="apiRes">
                    <h3>Backend Errors</h3>
                    <ul>
                        {apiError.errors.map((err, index) => {
                            return <li key={index}>{err.message}</li>
                        })}
                    </ul>
                </div>
            )}
            {apiSuccess && <h3 className="apiRes">Successfully signed up</h3>}
        </div>
    )
}

export default Signup
