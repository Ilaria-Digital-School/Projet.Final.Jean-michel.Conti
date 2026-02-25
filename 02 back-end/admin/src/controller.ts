import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class AdminController {
  @Get('dashboard')
  @Render('dashboard')
  getDashboard() {
    return {title: 'Admin Dashboard'};
  }
}
