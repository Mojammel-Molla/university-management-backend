import { Request, Response } from 'express'
import { UserServices } from './user.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body

    const result = await UserServices.createUserIntoDB(userData)
    res.status(400).json({
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
