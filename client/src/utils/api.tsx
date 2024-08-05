import axios from 'axios'
import { headers } from 'next/headers'

const baseUrl =
    typeof window === 'undefined'
        ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
        : ''

export const getCurrentUser = async () => {
    const headersList = headers()
    const headersObj = Object.fromEntries(headersList.entries())
    try {
        const response = await axios.get(`${baseUrl}/api/users/currentuser`, {
            headers: { ...headersObj },
        })
        return response.data.currentUser
    } catch (err) {
        console.log(err)
    }
}
