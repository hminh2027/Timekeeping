import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/common/config/config.module';
import { ConfigService } from 'src/common/config/config.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
      ({
        transport: {
          host: config.mailerHost,
          post: config.mailerPort,
          secure: true,
          auth: {
            user: config.mailerEmail,
            pass: config.mailerPassword
          }
        },
        defaults: {
          from: config.mailerEmail
        }
      } as MailerOptions),
    }),
  ],
})
export class MailModule { }
