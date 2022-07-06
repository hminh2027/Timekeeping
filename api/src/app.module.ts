import { Module } from '@nestjs/common';
import { AwsModule } from './common/aws/aws.module';
import { ConfigModule } from './common/config/config.module';
import { ConfigService } from './common/config/config.service';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CheckinModule } from './modules/checkin/checkinout.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    AuthModule,
    MailModule,
    ConfigModule, 
    DatabaseModule, 
    TicketModule, 
    CheckinModule, 
    AwsModule.register(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images')
    })
  ],
})
export class AppModule {
  static port: string | number;
  static isDev: boolean;

  constructor(private readonly config: ConfigService) {
    AppModule.port = config.get('PORT') ?? 3000;
    AppModule.isDev = config.isDev;
  }
}
