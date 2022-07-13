import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailModule } from './modules/mail/mail.module';
import { CheckinModule } from './modules/checkin/checkinout.module';
import { ConfigModule } from './common/config/config.module';
import { AwsModule } from './common/aws/aws.module';
import { ConfigService } from './common/config/config.service';
import { join } from 'path';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    AuthModule,
    MailModule,
    ConfigModule,
    DatabaseModule,
    CommentModule,
    TicketModule,
    CheckinModule,
    AwsModule.register(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
    }),
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
