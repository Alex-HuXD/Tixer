import axios from 'axios'
import React, { ReactElement, useState } from 'react'

interface RequestProps {
    url: string
    method: 'post' | 'get' | 'delete' | 'patch'
    body?: any
}

type ApiError = { message: string; field?: string }

export const useRequest = () => {
    const [apiErrors, setApiErrors] = useState<null | ReactElement>(null)

    const apiCall = async ({ url, method, body }: RequestProps) => {
        try {
            setApiErrors(null)
            const response = await axios[method](url, body)
            return response.data
        } catch (err) {
            axios.isAxiosError(err) &&
                setApiErrors(
                    <div className="apiRes">
                        <h3>Backend Errors</h3>
                        <ul>
                            {err.response?.data?.errors.map((err: ApiError) => {
                                return <li key={err.message}>{err.message}</li>
                            })}
                        </ul>
                    </div>
                )
        }
    }

    return { apiCall, apiErrors }
}
