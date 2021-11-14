import {Response, Request, NextFunction} from 'express'
import {validationResult} from 'express-validator'

const handleValidationErrorMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.sendStatus(400)
  }

  return next()
}

export default handleValidationErrorMiddleware