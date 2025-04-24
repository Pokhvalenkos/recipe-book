import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RecipesController } from "./controllers/recipes.controller";
import { RecipesService } from "./services/recipes.service";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class AppModule {}
