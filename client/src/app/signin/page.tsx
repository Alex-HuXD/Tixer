'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import './styles.css'

import { useRequest } from '@/hooks/useRequest'

type Inputs = {
    email: string
    password: string
}

const Signin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const [apiSuccess, setApiSuccess] = useState(false)
    const { apiCall, apiErrors } = useRequest()
    const router = useRouter()

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const response = await apiCall({ url: '/api/users/signin', method: 'post', body: data })
        if (response) {
            setApiSuccess(true)
            setTimeout(() => router.push('/'), 2000)
        } else {
            setApiSuccess(false)
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
                <input
                    {...register('password', { required: true, minLength: 6 })}
                    type="password"
                />
                {errors?.password && (
                    <p>This field is required, password need to be at least 6 characters long</p>
                )}

                <input type="submit" value={'Sign in'} />
            </form>
            {apiErrors}
            {apiSuccess && <h3 className="apiRes">Successfully signed up</h3>}
        </div>
    )
}

export default Signin
