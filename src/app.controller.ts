import { Controller, Get, Res, Req, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('*')
  static(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    if (req.path === '/graphql') return next();
    const handle = this.appService.getNextRequestHandler();
    handle(req, res);
  }
}
