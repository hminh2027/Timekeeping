import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /* GET request to get all users*/
    /* @param id: id of user */
    @Get()
    getAll() {
        return this.userService.findAll();
    }

    /* GET request to get an user*/
    /* @param id: id of user */
    @Get(':id')
    getUser(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) { 
        return this.userService.findOneById(id);
    }

    /* POST request to create a new user*/
    /* @body data: user' information payload */
    @Post()
    async createUser(@Body() data: UserDto) {
        await this.userService.create(data)
        return {
            statusCode: HttpStatus.OK,
            message: 'User created successfully'
        }
    }

    /* PATCH request to update an existing user*/
    /* @param id: id of user */
    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateUser(@Param('id') id: number, @Body() data: UserDto) {
        return {
            statusCode: HttpStatus.OK,
            message: 'User updated successfully',
            data: await this.userService.update(id, data)
        }
    }

    /* DELETE request to delete an user*/
    /* @param id: id of user */
    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
            data: await this.userService.remove(id)
        }
    }
}
