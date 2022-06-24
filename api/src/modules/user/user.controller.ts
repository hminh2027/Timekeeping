import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    @UsePipes(ValidationPipe)
    async createUser(@Body() data: CreateUserDto) {
        return {
            statusCode: HttpStatus.OK,
            message: 'User created successfully',
            data: await this.userService.create(data)
        }
    }

    /* PATCH request to update an existing user*/
    /* @param id: id of user */
    @Patch(':id')
    async updateUser(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() data: UpdateUserDto) {
        return {
            statusCode: HttpStatus.OK,
            message: 'User updated successfully',
            data: await this.userService.update(id, data)
        }
    }

    /* DELETE request to delete an user*/
    /* @param id: id of user */
    @Delete(':id')
    async deleteUser(@Param('id',  new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
            data: await this.userService.remove(id)
        }
    }
}
