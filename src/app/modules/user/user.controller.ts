import { Request, Response } from 'express'
import { UserServices } from './user.service'
import userValidationSchema from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const { userData } = req.body
    // const validatedUser = userValidationSchema.parse(userData)
    const result = await UserServices.createUserIntoDB(userData)
    // console.log('This is user data', userData)
    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}
export const UserControllers = {
  createUser,
}
