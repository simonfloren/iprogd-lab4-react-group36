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
    if (document.cookie.indexOf('samplename') == -1 ) {
      // Cookie does not exist, set to default 1
      this._numberOfGuests = 1;
      document.cookie = 'guests=1';
    }
    else {
      // Remove \ before = ?
      this._numberOfGuests = Number.parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)guests\s*\=\s*([^;]*).*$)|^.*$/, "$1"), 10);
    }

    this._menu = [];
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

    // Change to -1 later
    this._dishDetail = 97;
  }

  /**
   * 
   */
  getDetailedDish() {
    // if to make sure it is a correct id? i.e not -1
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
   *
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
      this.notifyObservers("menu");
    });
  }

  /**
   *
   * @param {number} id
   */
  removeDish(id) {
    this._menu = this._menu.filter(function(currentDish) {
      // !=?
      return currentDish.id !== id;
    });
  }

  /**
   *
   */
  getMenu() {
    return this._menu;
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
