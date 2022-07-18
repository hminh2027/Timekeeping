import { Injectable } from '@nestjs/common';
import { RolePayload } from '../payloads/role.payload';
import { RoleRepository } from '../repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
  async findAll() {
    return await this.roleRepository.find();
  }

  async create(data: RolePayload) {
    return await this.roleRepository.create(data);
  }

  async update(id: number, data: RolePayload) {
    return await this.roleRepository.update(id, data);
  }

  async remove(id: number) {
    return await this.roleRepository.delete(id);
  }
}
