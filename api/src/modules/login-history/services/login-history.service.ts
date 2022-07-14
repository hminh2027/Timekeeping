import { Injectable } from '@nestjs/common';
import { LoginHistoryPayload } from '../payloads/login-history.payload';
import { LoginHistoryRepository } from '../repositories/login-history.repository';

@Injectable()
export class LoginHistoryService {
  constructor(
    private readonly loginHistoryRepository: LoginHistoryRepository,
  ) {}

  async create(data: LoginHistoryPayload) {
    const loginHistory = await this.loginHistoryRepository.create(data);
    return await this.loginHistoryRepository.save(loginHistory);
  }

  async deleteExpiredToken() {
    // return await this.loginHistoryRepository
  }
}
