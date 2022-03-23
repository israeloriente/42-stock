import { Injectable } from "@angular/core";
import { Parse } from "parse";
import { environment } from "../../environments/environment";
import { Mail } from "../interface/mail";
import { Product } from "../interface/product";
import { Report } from "../interface/report";
import { User } from "../interface/user";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(
    private global: GlobalService,
  ) {
    this.initializeDatabase();
  }

  private initializeDatabase() {
    Parse.serverURL = environment.Parse.serverURL;
    Parse.initialize(
      environment.Parse.applicationId,
      environment.Parse.jsKey
    );
    Parse.CoreManager.set('REQUEST_ATTEMPT_LIMIT', 0);
  }

  //                           @@@@@@@@@@@@@@@@@@@@ Parse CLOUD @@@@@@@@@@@@@@@@@@@@
  async userIsAdm() { return await Parse.Cloud.run('userIsAdm') }
  /**  
  * Create User from Database.
  * @returns Parse Object User Created.
  */
  public async createUser(usr: User) { return await Parse.Cloud.run('createUser', {
    name: usr.name,
    email: usr.email,
  }) }
  /**  
  * Send email report for 42 staff.
  * @param report - Report Object
  * @returns OK.
  */
  public async reportFromStudent(report: Report) { return await Parse.Cloud.run('reportFromStudent', {
    selected: report.selected.map((item) => item.get('name')),
    description: report.description
  }) }
  /**  
  * Send email report for 42 staff (systemReport).
  * * @param report - Report Object
  * @returns OK.
  */
  public async reportFromSystem(report: Report) { return await Parse.Cloud.run('reportFromSystem', {
    selected: report.selected.map((item) => item.get('name'))
  * Destroy User from Database.
  * @returns Parse Object User destroyed.
  */
  public async deleteUserCloud(usr: User) { return await Parse.Cloud.run('destroyUser', {userId: usr.id}) }

  //                           @@@@@@@@@@@@@@@@@@@@ AUTH @@@@@@@@@@@@@@@@@@@@
  /**  
    * Returns the average of two numbers.
    * @param username - Username passed by loginComponent.
    * @param password - Password passed by loginComponent.
    * @returns Promise of User object.
  */
  public async login(username: string, password: string) {
    const user = await Parse.User.logIn(username, password);
    const query = new Parse.Query(new Parse.User());
    query.include('*');
    query.equalTo('objectId', user.id)
    return await query.first();
  }
  /**  
    * Email address for password recovery.
    * @param email - Email address.
    * @returns Promise with Parse Object.
  */
  async resetPassword(email) {
    // Pass the username and password to logIn function
    return await Parse.User.requestPasswordReset(email);
  }
  /**  
    * Remove user data / session.
    * @param confirm - Decide whether or not to ask the user to exit (Optional).
    * @returns NULL.
  */
  async logout(confirm?) {
    if (confirm) {
      this.global.confirmAlert('Are you sure?', 'Your session will be terminated', 'Leave', 'Cancel').then((response: boolean) => {
        if (response) {
          Parse.User.logOut();
          this.global.goTo('login');
          this.global.resetStorage();
        }
      });
    } else {
      Parse.User.logOut();
      this.global.goTo('login');
      this.global.resetStorage();
    }
  }

  //                           @@@@@@@@@@@@@@@@@@@@ GLOBAL CLASS @@@@@@@@@@@@@@@@@@@@
  /**  
    * Function delete objects globally (any class)
    * @returns Parse Object deleted.
  */
  public async deleteObject(className: string, obj: Mail | Product | User) {
    const query = new Parse.Query(className);
    const object = await query.get(obj.id);
    return await object.destroy();
  }

  //                           @@@@@@@@@@@@@@@@@@@@ EMAIL @@@@@@@@@@@@@@@@@@@@
  /**  
    * Email list from Database.
    * @returns Parse List Email.
  */
  public async getEmails() {
    const query = await new Parse.Query(Parse.Object.extend("Mail"));
    return await query.find();
  }
  /**  
    * Create a new email object to Database.
    * @returns Parse new email object.
  */
  public async createEmail(mail: Mail) {
    const newProduct = new Parse.Object("Mail");
    newProduct.set("email", mail.email);
    return await newProduct.save();
  }

  //                           @@@@@@@@@@@@@@@@@@@@ PRODUCT @@@@@@@@@@@@@@@@@@@@
  /**  
    * Product list from Database.
    * @returns Parse List Product class.
  */
  public async getProduct() {
    const query = await new Parse.Query(Parse.Object.extend("Product"));
    return await query.find();
  }
  /**  
    * Create a new product object to Database.
    * @returns Parse new object.
  */
  public async createProduct(product: Product) {
    const newProduct = new Parse.Object("Product");
    newProduct.set("name", product.name);
    newProduct.set("barcodeId", product.barcodeId);
    return await newProduct.save();
  }
  /**  
    * Update an existing product object.
    * @returns Parse object.
  */
  public async updateProduct(product: Product) {
    const query: Parse.Query = new Parse.Query('Product');
    const object: Parse.Object = await query.get(product.id);
    object.set('name', product.name);
    object.set('barcodeId', product.barcodeId);
    return await object.save();
  }
  /**
    * Delete product object from database.
    * @returns Object destroyed.
  */
  public async deleteProduct(product: Product) {
    const query = new Parse.Query('Product');
    const object = await query.get(product.id);
    return await object.destroy();
  }
  /**  
    * Count quantity of products.
    * @returns Number result.
  */
  public async countProduct(product: Product) {
    const query = await new Parse.Query(Parse.Object.extend("Stock"));
    query.equalTo('product', { __type: "Pointer", className: "Product", objectId: product.id });
    return await query.count();
  }


  //                           @@@@@@@@@@@@@@@@@@@@ STOCK @@@@@@@@@@@@@@@@@@@@
  /**  
  * Create a new stock object with object associated and who user created to database.
  * @params product object.
  * @returns Parse new object.
  */
  public async createStock(product: Product) {
    const newStock = new Parse.Object("Stock");
    newStock.set("product", { __type: "Pointer", className: "Product", objectId: product.id });
    newStock.set("addedBy", await this.getCurrentUser());
    return await newStock.save();
  }
  /**  
  * Destroy first stock found at database.
  * @params product object to filter.
  * @returns Object destroyed.
  */
  public async deleteFirstStock(product: Product) {
    const query = await new Parse.Query(Parse.Object.extend("Stock"));
    query.equalTo("product", { __type: "Pointer", className: "Product", objectId: product.id });
    const stock = await query.first();
    return await stock.destroy();
  }
  /**  
    * All stock list from Database.
    * @returns Parse List Stock class.
  */
   public async getStock() {
    const query = await new Parse.Query(Parse.Object.extend("Stock"));
    return await query.find();
  }
  /**  
    * Count quantity of products.
    * @params product object to filter.
    * @returns Quantity result.
  */
   public async countStock(product: Product) {
    const query = await new Parse.Query(Parse.Object.extend("Stock"));
    query.equalTo('product', { __type: "Pointer", className: "Product", objectId: product.id });
    return await query.count();
  }

  //                    @@@@@@@@@@@@@@@@@@@@ Parse Users @@@@@@@@@@@@@@@@@@@@
  async getCurrentUser() {
    return await Parse.User.current();
  }
  /**  
  * User list from Database.
  * @returns Parse List User class.
  */
  public async getUsers() {
    const query = await new Parse.Query(Parse.Object.extend("User"));
    // Ignore current user
    query.notEqualTo('objectId', (await this.getCurrentUser()).id);
    return await query.find();
  }
  /**  
  * Update User Object.
  * @returns User updated.
  */
  public async UpdateUser(usr: User) {
    const User: Parse.User = new Parse.User();
    const query: Parse.Query = new Parse.Query(User);
    let user: Parse.Object = await query.get(usr.id);
    user.set('username', usr.email);
    user.set('email', usr.email);
    user.set('name', usr.name);
    return await user.save();
  }


  /**  
    * Get any config data from db.
    * @params Key config
    * @returns Value of key param.
  */
  // @@@@@@@@@@@@@@@@@@@@ Parse Config @@@@@@@@@@@@@@@@@@@@
  public async getParseConfig(key: string) {
    const config = await Parse.Config.get();
    return config.get(key);
  }


  // @@@@@@@@@@@@@@@@@@@@ Parse Validators @@@@@@@@@@@@@@@@@@@@
  public erroValidators(error: any) {
    // retornamos o valor porque podemos querer mostrar alem do toast
    switch (error.message) {
      case 'XMLHttpRequest failed: "Unable to connect to the Parse API"':
        return 'Unable to connect';
      case 'you must provide an email':
        return 'You need to enter an email address.';
      case 'Invalid username/password.':
        return 'Invalid username/password.';
      case 'username/email is required.':
        return 'Email is mandatory';
      case 'password is required.':
        return 'Password is mandatory';
      case 'Account already exists for this username.':
        return 'Account already exists for this username.';
      case 'Permission denied, user needs to be authenticated.':
        return 'You must be logged in';
      case 'no_session':
        this.logout(false);
        return 'You must be logged in';
      default:
        if (error.code == 119) return 'Permission denied 😅';
        return error.message;
    }
  }

}
