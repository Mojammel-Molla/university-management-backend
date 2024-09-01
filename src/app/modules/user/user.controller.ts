import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { password, student } = req.body
    console.log(password, student)
    //  const validatedUser = userValidationSchema.parse(userData)
    const result = await UserServices.createStudentIntoDB(password, student)
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
