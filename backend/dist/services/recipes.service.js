"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let RecipesService = class RecipesService {
    constructor() {
        this.BASE_URL = process.env.RECIPE_API_BASE;
    }
    async fetchRecipes(query) {
        let url = `${this.BASE_URL}/search.php?s=`;
        if (query.i)
            url = `${this.BASE_URL}/filter.php?i=${query.i}`;
        else if (query.a)
            url = `${this.BASE_URL}/filter.php?a=${query.a}`;
        else if (query.c)
            url = `${this.BASE_URL}/filter.php?c=${query.c}`;
        return (await axios_1.default.get(url)).data;
    }
    async fetchRecipeInfo(id) {
        return (await axios_1.default.get(`${this.BASE_URL}/lookup.php?i=${id}`)).data;
    }
};
RecipesService = __decorate([
    (0, common_1.Injectable)()
], RecipesService);
exports.RecipesService = RecipesService;
