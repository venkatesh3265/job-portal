import {StatusCodes} from 'http-status-codes'

class CustomApiError extends Error{
    constructor(message){
        super(message)
       
    }

}

export default CustomApiError