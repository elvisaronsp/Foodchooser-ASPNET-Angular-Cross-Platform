import { CONFIGURATION } from './../../../shared/app.constants';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { FoodDataService } from './../../../core/services/food-data.service';
import { FoodItem } from './../../../shared/models/foodItem';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html'
})


export class HomeComponent implements OnInit {

    public randomFood: FoodItem;
    public errorMessage: string;

    constructor(
        private foodDataService: FoodDataService,
        public authenticationService: AuthenticationService) { }

    public ngOnInit() {
        this.getRandomFood();
    }

    public getRandomFood() {
        this.randomFood = null;
        this.foodDataService
            .GetRandomFood()
            .subscribe((response: FoodItem) => {
                this.randomFood = response;
                this.randomFood.ImageString = CONFIGURATION.baseUrls.server + this.randomFood.ImageString;
            }, error => {
                if (error.status == 404) {
                    this.errorMessage = 'No food found :-(';
                } else {
                    this.errorMessage = 'There was an error';
                }
            });
    }

    getRecipesWithGoogle(): void {
        window.open('https://www.google.de/search?q=' + this.randomFood.ItemName, '_blank');
    }

    getRecipesWithBing(): void {
        window.open('https://www.bing.com/search?q=' + this.randomFood.ItemName, '_blank');
    }
}