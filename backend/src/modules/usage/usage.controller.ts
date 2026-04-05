import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsageService } from './usage.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('usage')
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Get('summary')
  getSummary(@CurrentUser() user: any) {
    return this.usageService.getSummary(user.tenantId);
  }

  @Get('overview')
  getOverview(@CurrentUser() user: any) {
    return this.usageService.getOverview(user.tenantId);
  }
}