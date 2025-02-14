import axios from 'axios'

const commonAPI = async (httpMethod, url, reqBody, options={}) => {
    const reqConfig = {
        method: httpMethod,
        url,
        data: reqBody,
        headers: options.headers || {}
    }
    return await axios(reqConfig).then(res => {
        return res
    }).catch(err => {
        return err
    })
}

export default commonAPI