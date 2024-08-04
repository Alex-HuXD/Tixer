import axios from 'axios'
import { headers } from 'next/headers'

const baseUrl =
    typeof window === 'undefined'
        ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
        : ''
const headersList = headers()
const headersObj = Object.fromEntries(headersList.entries())

export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/users/currentuser`, {
            headers: { ...headersObj },
        })
        return response.data.currentUser
    } catch (err) {
        console.log(err)
    }
}
