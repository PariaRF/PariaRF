
import { allData, search, mainCourseContainerDiv } from "../main.js";
const cartItemCount = document.querySelector(".cart-item-count");



class Menu {

    renderBanner() {
        return `
            <div class="menu-banner">
                <h1>لذت غذای سالم و گیاهی را با ترخینه تجربه کنید!</h1>
            </div>
        `;
    }

    renderTabContent(getMenuFromStorage) {

        return `
            <div class="tabs-container">
                <div class="tabs">
                    <button class="reset tab-button active" data-tab="main-course">غذای اصلی</button>
                    <button class="reset tab-button" data-tab="appetizer">پیش غذا</button>
                    <button class="reset tab-button" data-tab="dessert">دسر</button>
                    <button class="reset tab-button" data-tab="drink">نوشیدنی</button>
                </div>
            </div>
            <div class="tab-content-container">
                <div class="tab-content">
                    <div id="main-course" class="tab-pane active">
                        <div class="menu-actions">
                            <div class="menu-actions__filter">
                                <a href="#غذاهای ایرانی" class="menu-filter" data-filter>غذاهای ایرانی</a>
                                <a href="#غذاهای غیر ایرانی" class="menu-filter" data-filter>غذاهای غیر ایرانی</a>
                                <a href="#پیتزا ها" class="menu-filter" data-filter>پیتزا ها</a>
                                <a href="#ساندویچ ها" class="menu-filter" data-filter>ساندویچ ها</a>
                            </div>
                            <div class="menu-actions__search">
                                <input class="menu-actions__search__input reset" placeholder="جستجو"/>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#353535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M22 22L20 20" stroke="#353535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div class="main-course-container">
                            ${this.renderMainCourse(getMenuFromStorage, search)}
                        </div>
                    </div>
                    <div id="appetizer" class="tab-pane tab-pane-other">
                        ${this.renderOtherTab()}
                    </div>
                    <div id="dessert" class="tab-pane tab-pane-other">
                         ${this.renderOtherTab()}
                    </div>
                    <div id="drink" class="tab-pane tab-pane-other">
                        ${this.renderOtherTab()}
                    </div>
                </div>
            </div>
        `;
    }

    renderMainCourse(allData = MenuStorage.getMenuData(), search) {
        let menuCard = "";
        if (allData) {
            let menu = [];
            let getCartItms = JSON.parse(localStorage.getItem("cart")) || [];
            allData.filter(menuItem => {
                menu.push(...menuItem.items);
            });
            let filteredMenu = menu.filter(item => {
                let returnItems = item.name.includes(search.searchItem);
                return returnItems;
            })
            allData.forEach((item) => {
                menuCard += `
                  <div class="menu-card-container">
                    <div class="menu-card-title">
                      ${item.title == 'غذاهای ایرانی' ?
                        `<h2 id="${item.title}">${item.title}</h2> 
                      <button class="menu-card-button reset">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.19 17.75H7.53999C6.54999 17.75 5.59999 17.33 4.92999 16.6C4.25999 15.87 3.92 14.89 4 13.9L4.83 3.94C4.86 3.63 4.74999 3.33001 4.53999 3.10001C4.32999 2.87001 4.04 2.75 3.73 2.75H2C1.59 2.75 1.25 2.41 1.25 2C1.25 1.59 1.59 1.25 2 1.25H3.74001C4.47001 1.25 5.15999 1.56 5.64999 2.09C5.91999 2.39 6.12 2.74 6.23 3.13H18.72C19.73 3.13 20.66 3.53 21.34 4.25C22.01 4.98 22.35 5.93 22.27 6.94L21.73 14.44C21.62 16.27 20.02 17.75 18.19 17.75ZM6.28 4.62L5.5 14.02C5.45 14.6 5.64 15.15 6.03 15.58C6.42 16.01 6.95999 16.24 7.53999 16.24H18.19C19.23 16.24 20.17 15.36 20.25 14.32L20.79 6.82001C20.83 6.23001 20.64 5.67001 20.25 5.26001C19.86 4.84001 19.32 4.60999 18.73 4.60999H6.28V4.62Z" fill="#417F56"/>
                        <path d="M16.25 22.75C15.15 22.75 14.25 21.85 14.25 20.75C14.25 19.65 15.15 18.75 16.25 18.75C17.35 18.75 18.25 19.65 18.25 20.75C18.25 21.85 17.35 22.75 16.25 22.75ZM16.25 20.25C15.97 20.25 15.75 20.47 15.75 20.75C15.75 21.03 15.97 21.25 16.25 21.25C16.53 21.25 16.75 21.03 16.75 20.75C16.75 20.47 16.53 20.25 16.25 20.25Z" fill="#417F56"/>
                        <path d="M8.25 22.75C7.15 22.75 6.25 21.85 6.25 20.75C6.25 19.65 7.15 18.75 8.25 18.75C9.35 18.75 10.25 19.65 10.25 20.75C10.25 21.85 9.35 22.75 8.25 22.75ZM8.25 20.25C7.97 20.25 7.75 20.47 7.75 20.75C7.75 21.03 7.97 21.25 8.25 21.25C8.53 21.25 8.75 21.03 8.75 20.75C8.75 20.47 8.53 20.25 8.25 20.25Z" fill="#417F56"/>
                        <path d="M21 8.75H9C8.59 8.75 8.25 8.41 8.25 8C8.25 7.59 8.59 7.25 9 7.25H21C21.41 7.25 21.75 7.59 21.75 8C21.75 8.41 21.41 8.75 21 8.75Z" fill="#417F56"/>
                      </svg>
                      تکمیل خرید</button>` :
                        `<h2 id="${item.title}">${item.title}</h2>`}
                    </div>
                `;

                filteredMenu.forEach((singleItem) => {
                    let ExistInCart = getCartItms.find(findItem => parseInt(findItem.id) === parseInt(singleItem.id));

                    let mediaQuery = window.matchMedia('(max-width: 768px)');

                    const image = document.createElement("img");
                    image.id = "imageElement";
                    image.alt = "singleItem.name";
                    image.src = singleItem.thumbnail;

                    let imageDiv = document.createElement("div");
                    imageDiv.classList.add("image-container");

                    imageDiv.appendChild(image);

                    const addToCartButton = document.createElement('button');
                    addToCartButton.classList.add("reset", "main-courses-card__btn", ExistInCart ? "larg-screen-content-exist" : "larg-screen-content");
                    addToCartButton.classList.add(ExistInCart ? "exist-in-cart" : "nothing");
                    addToCartButton.dataset.id = singleItem.id;

                    ExistInCart ? addToCartButton.disabled = true : addToCartButton.disabled = false;

                    menuCard += `
                        ${singleItem.class == item.title ?
                            `<div class="menu-card-item">
                        ${imageDiv.outerHTML}
                        <div class="menu-card-item__info">
                          <div class="menu-card-item__row">
                            <h3 class="menu-card-item__name">${singleItem.name}</h3>
                          </div>
                          <div class="menu-card-item__row responsive-mode">
                                <span class="menu-card-item__ingredients">${singleItem.ingredients ? singleItem.ingredients.join('/ ') : ""}</span>
                                <div class="menu-card__price-details">
                                    <span class="menu-card__price">${singleItem.price == null ? "" : MenuLogic.formatter(singleItem.price)}</span>
                                    <span class="menu-card__percent">${singleItem.discount_percent == null ? "" : `%${persianJs(singleItem.discount_percent).englishNumber().toString()}`}</span>
                                    <span class="menu-card__amount">${MenuLogic.formatter(singleItem.discount_amount)} تومان</span>
                                </div>    
                          </div >
                          <div class="menu-card-item__row">
                              <img src="/pariarf/assets/images/star.png" class="menu-card-item__rate"/>
                              ${addToCartButton.outerHTML}
                          </div>
                        </div >
                      </div >
                          `
                            : ""
                        }`
                });

                menuCard += `</div > `;
                mainCourseContainerDiv ? mainCourseContainerDiv.innerHTML = menuCard : null;
            });
            return menuCard;
        }
    }

    renderOtherTab() {
        return `
            <img src="/pariarf/assets/images/maintnance.png"/>
        `
    }

    renderMenuPage = () => {
        let getMenuFromStorage = MenuStorage.getMenuData();

        return `
                <div class="menu-container">
                    ${this.renderBanner()}
                    ${this.renderTabContent(getMenuFromStorage)}
              </div >`
    }

    setCartValue(cart) {

        let tempCartItems = 0;
        if (cart.length > 0) {
            cart.forEach(item => {
                tempCartItems += item.quantity;
            })
            cartItemCount.textContent = tempCartItems >= 1 ? persianJs(tempCartItems).englishNumber().toString() : persianJs("0").englishNumber().toString();
        } else {
            const numTostring = String(tempCartItems);
            cartItemCount.textContent = persianJs(numTostring).englishNumber().toString();
        }
    }
}

class MenuLogic {
    static formatter(number) {
        let num = Number(number);
        return num.toLocaleString('fa-IR', {
            minimumFractionDigits: 0, maximumFractionDigits: 2
        });
    }
}

export class MenuStorage {
    static saveMenuData(data) {
        localStorage.setItem("menu", JSON.stringify(data));
    }

    static getMenuData() {
        let menuData = localStorage.getItem("menu") ? JSON.parse(localStorage.getItem("menu")) : [];
        return menuData;
    }

    static findMenuItem(id) {
        let findItem
        const savedMenuItems = JSON.parse(localStorage.getItem("menu"));
        savedMenuItems.forEach(item => {
            if (item.items.find(item => item.id === parseInt(id))) {
                findItem = item.items.find(item => item.id === parseInt(id))
                return findItem;

            }
        })
        return findItem;
    }

    static getCart() {
        return JSON.parse(localStorage.getItem("cart"));
    }
}

export default new Menu;
