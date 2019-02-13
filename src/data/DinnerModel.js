import ObservableModel from "./ObservableModel";

const BASE_URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com";
const httpOptions = {
  headers: {
    "X-Mashape-Key": "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767"
  }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 1;
    this.getNumberOfGuests();

    this._menu = [];
    this._types = [
      "Main Course",
      "Side Dish",
      "Dessert",
      "Appetizer",
      "Salad",
      "Bread",
      "Breakfast",
      "Soup",
      "Beverage",
      "Sauce",
      "Drink"
    ];
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    this.notifyObservers();
  }

  /**
   * Add dish to menu stored in model
   *
   * @param {number} id
   */
  addDish(id) {
    console.log("[dinnerModel] Added to menu, id:", id);

    if (this._menu.some(menuItem => menuItem.id == id)) {
      console.log("Dish already in menu");
      return;
    }

    this.getDish(id).then(dish => {
      this._menu.push(dish);
      this.notifyObservers("menu");
    });
  }

  /**
   *
   * @param {number} id
   */
  removeDish(id) {
    this._menu = this._menu.filter(function(currentDish) {
      return currentDish.id != id;
    });
  }

  /**
   *
   */
  getMenu() {
    return this._menu;
  }

  /**
   *
   */
  getDishTypes() {
    return this._types;
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes() {
    const url = `${BASE_URL}/recipes/search`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  /**
   * API call to retrieve info about a certain dish
   *
   * @param {number} id
   */
  getDish(id) {}

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }

  getRandomDishes() {
    const url = BASE_URL + "/recipes/random?number=" + 12;

    return fetch(url, /* {
      method: "GET",
      headers: {
        "X-Mashape-Key": API_KEY,
        Accept: "application/json"
      }
    } */httpOptions)
      .then(response => response.json())
      .then(data => data.recipes);
  }

  /**
   * Serialize an object into an url encoded string
   * @param {Object object} params
   */
  serialize(params) {
    var query = "";
    for (let key in params) {
      query +=
        encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
    return query;
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
