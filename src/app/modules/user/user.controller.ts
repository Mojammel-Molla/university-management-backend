import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createUser = catchAsync(async (req, res, next) => {
  const { password, student } = req.body

  //  const validatedUser = userValidationSchema.parse(userData)
  const result = await UserServices.createStudentIntoDB(password, student)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  })
})
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getUsersFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieve successfully',
    data: result,
  })
})
export const UserControllers = {
  createUser,
  getAllUsers,
}
