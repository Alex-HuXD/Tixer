'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRequest } from '@/hooks/useRequest'

const Signout = () => {
    const { apiCall } = useRequest()
    const router = useRouter()

    const onSignout = async () => {
        const response = await apiCall({ url: '/api/users/signout', method: 'post', body: {} })
        if (response) {
            setTimeout(() => {
                router.push('/')
            }, 2000)
        }
    }

    useEffect(() => {
        onSignout()
        router.refresh()
    })

    return <div>Signing you out...</div>
}

export default Signout
