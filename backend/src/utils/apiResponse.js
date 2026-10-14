export const sendSuccess = (res, msg, statusCode, data = null) => {
    return res.status(statusCode).json({
        success: true,
        message: msg,
        data
    })

}


export const sendError = (res, msg, statusCode, data=null) => {
    return res.status(statusCode).json({
        success: false,
        message: msg,
        data
    })
}