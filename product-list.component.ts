import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductListmodel } from '../productListModel';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  /**
   * Variable for binding the data
   */
  searchText? : any ;

  /**
   * Variable for page size
   */
  pageSize = 5;

  /**
   * variable for current page
   */
  currentPage = 1;

  /**
   * variable for total pages
   */
  totalPages : any =1;

  /**
   * Variable for storing the response from api
   */
  products:  ProductListmodel[] = new Array();
  

  searchpro: any;
  
  filteredProducts:ProductListmodel[] = new Array();

  constructor( private api: ProductService){}

  ngOnInit(){
    this.getProductList().then(()=>{
      this.filterProducts();
    });
    
  }

/**
 * Function for the list of products
 */
// searchList(data:number){
//   if(!data){
//     this.searchText =data;
//    this.filterProducts();
//   }else{
//     this.searchText =data;
//     this.filterProducts();
//   }

// }
// search() {
//   this.currentPage = 1;
//   this.list = this.searchText == null || this.searchText == '' ? this.productList : this.productList.filter((element) => {
//     return element.id == this.searchText ;
//   });
// }

/**
 * Function for showing filtered list
 */
filterProducts() {
  this.currentPage = 1;
  this.filteredProducts = this.searchText == '' ? this.products :this.filteredProducts.filter((p) =>{
   return p.title?.toLowerCase().includes(this.searchText.toLowerCase())
  }
 );
  this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
}

/**
 * Function for get the list of products from api
 */
getProductList(){
  let promise =new Promise((resolve, reject)=>{
    this.api.getProducts().subscribe((response: ProductListmodel[])=>{
      this.products = response;
      this.filteredProducts = response; 
      this.totalPages = Math.ceil(response.length / this.pageSize);
      resolve(true);    
})
  })
  return promise; 
}

/**
 * function for update the row
 */
update(){

}

/**
 *  function for delete the row
 */
delete(event:any, id:any){
let deleteRow = this.filteredProducts.findIndex((i)=>i.id == id);
this.filteredProducts.splice(deleteRow,1);
}

/**
 *  Function for next page
 */
goToPage(pageNumber: number): void {
  this.currentPage = pageNumber;
}

/**Function for pervious page */
goToPreviousPage(pageNumber:number): void{
  this.currentPage = pageNumber
}
}
