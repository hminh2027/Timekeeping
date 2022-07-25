import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './repositories/permission.repository';
import { CommentPermission } from '../comment/enums/permission.enum';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async init() {
    const pms1 = await this.permissionRepository.create({
      id: 1,
      permission: CommentPermission.CreateComment,
    });
    await this.permissionRepository.save(pms1);
    return;
  }
  // create(createPermissionDto: CreatePermissionDto) {
  //   return 'This action adds a new permission';
  // }

  // update(id: number, updatePermissionDto: UpdatePermissionDto) {
  //   return `This action updates a #${id} permission`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} permission`;
  // }
}
