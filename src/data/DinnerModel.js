import ObservableModel from "./ObservableModel";
import { API_KEY } from "./api";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/36";
const httpOptions = {
  headers: {
    "X-Mashape-Key": API_KEY
  }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();

    this._numberOfGuests;
    if (document.cookie.indexOf('guests') == -1 ) {
      // Cookie does not exist, set to default 1
      this._numberOfGuests = 1;
      document.cookie = 'guests=1';
    }
    else {
      // Remove \ before = ?
      this._numberOfGuests = Number.parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)guests\s*\=\s*([^;]*).*$)|^.*$/, "$1"), 10);
    }

    this._menu = [];
    if (document.cookie.indexOf('menu') == -1 ) {
      // Cookie does not exist, set to default []
      document.cookie = 'menu=[]';
    }
    else {
      // Remove \ before = ?
      const ids = JSON.parse(document.cookie.replace(/(?:(?:^|.*;\s*)menu\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
      if(ids.length > 0) {
        this.getDishes(ids).then((dishes) => {
          this._menu = dishes;
          this.notifyObservers();
        });
      }
    }

    this._types = [
      "All",
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

    this._dishDetail;
  }

  /**
   * 
   */
  getDetailedDish() {
    // if to make sure it is a correct id? i.e not undefined
    return this._dishDetail;
  }

  /**
   * 
   */
  setDetailedDish(id) {
    this._dishDetail = id;
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
    if (num > 0) {
      this._numberOfGuests = num;
      document.cookie = 'guests=' + num;
      this.notifyObservers();
    }
  }

  /**
   * Get dish types 
   */
  getDishTypes() {
    return this._types;
  }

  /**
   * Add dish to menu stored in model
   * @param {number} id
   */
  addDish(id) {
    console.log("[dinnerModel] Added to menu, id:", id);

    // ==?
    if (this._menu.some(menuItem => menuItem.id === id)) {
      console.log("Dish already in menu");
      return;
    }

    this.getDish(id).then(dish => {
      this._menu.push(dish);

      const ids = this._menu.map(dish => dish.id).join(',');
      document.cookie = 'menu=[' + ids + ']';
      this.notifyObservers("menu");
    });
  }

  /**
   * Removes dish from menu
   * @param {number} id
   */
  removeDish(id) {
    this._menu = this._menu.filter(function(currentDish) {
      // !=?
      return currentDish.id !== id;
    });
    const ids = this._menu.map(dish => dish.id).join(',');
    document.cookie = 'menu=[' + ids + ']';
    this.notifyObservers("menu");
  }

  /**
   * Returns the current menu items
   */
  getMenu() {
    return this._menu;
  }

  /**
   * 
   */
  getMenuPrice() {
    let totPrice = 0;
    
    if(typeof this._menu === 'undefined') {
      return 0;
    }

    this._menu.forEach(dish => {
      totPrice += dish.pricePerServing;
    });
    return totPrice.toFixed(2);
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
	getAllDishes(type, filter) {
    if(typeof filter === 'undefined') {
      filter = "";
    }
		const params = {
			number: 15,
			includeIngredients: filter.split(' ').join(',')
		};

		if(type !== 'all') {
			params['type'] = type;
		}

		console.log("[getAllDishes] Searching for dishes with query: ", params);
		const url = BASE_URL + '/recipes/searchComplex?' + this.serialize(params);

		return fetch(url, httpOptions)
			.then(response => response.json())
			.then(data => data.results);
	}

  /**
	 * Returns an array of dishes and their info given their id's
	 * @param {Array Num} ids 
	 */
	getDishes(ids) {
		const idstring = encodeURIComponent(ids.join(","));
		const url = BASE_URL + "/recipes/informationBulk?ids=" + idstring;

		return fetch(url, httpOptions)
			.then(resp => resp.json())
			.then(data => data);
	}

  /**
   * API call to retrieve info about a certain dish
   *
   * @param {number} id
   */
  getDish(id) {
    return this.getDishes([id]).then(dishes => dishes[0]);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }

  getRandomDishes() {
    const url = BASE_URL + "/recipes/random?number=" + 15;

    return fetch(url, httpOptions)
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
