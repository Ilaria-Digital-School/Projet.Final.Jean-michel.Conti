import { Controller, Get, Render } from "@nestjs/common";

@Controller() 
export class TestController {
  @Get('test')
  @Render('Home')
  test() {
    return {message: 'NestJS + EJS fonctionne !'};
  }
}