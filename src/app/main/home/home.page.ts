import { Component, OnInit, ViewChild } from '@angular/core';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM
import { LoadingController, IonInfiniteScroll, IonSlides } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { CartModalServiceService } from './product-detail/cart-modal/cart-modal-service.service';
import { Storage } from '@ionic/storage';
// import * as WC from 'woocommerce-api'


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
slideOpts = {
  initialSlide: 1,
  speed: 500
};

  cartItems:any[]=[];
  totalCartItems: any;
  currency = environment.currency;
  products: any[];
  images: any[];
  featuredImage: string;
  i:number;
  //productsList: any[];
  moreProducts: any[];
  productCategory: any[];
  isLoading: boolean = false;
  page:number;
  isSale:boolean = false;

  
  constructor(private loadingCtrl: LoadingController,  private storage: Storage) {
    
      this.countItems();

      this.isLoading=true;
      this.page = 2;
      //this.loadProducts();
      this.loadMoreProducts(null);
      this.loadCategory();
   }

   slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
   }
  ngOnInit() {
    this.countItems();
    
  }

  ionViewWillEnter(){
    this.countItems();
  }

      loadProducts() {
            const WooCommerce = new WooCommerceRestApi({
              url: environment.siteUrl,
              consumerKey: environment.consumerKey,
              consumerSecret: environment.consumerSecret,
              version: 'wc/v3',
              queryStringAuth: true // Force Basic Authentication as query string true and using under HTTPS
            });

            WooCommerce.get("products?per_page=20&orderby=date&order=asc")
            .then((response) => {
              console.log(response);
              this.products = response.data; 
              
              
            })
            .catch((error) => {
              console.log(error);
            });

    }

      loadMoreProducts(event) {
        console.log(event);

            const WooCommerce = new WooCommerceRestApi({
              url: environment.siteUrl,
              consumerKey: environment.consumerKey,
              consumerSecret: environment.consumerSecret,
              version: 'wc/v3',
              queryStringAuth: true // Force Basic Authentication as query string true and using under HTTPS
            });
            if(event == null){
              this.page = 2;
              this.moreProducts=[];
            }
            else {
              this.page = this.page+1;
            }

            WooCommerce.get("products?per_page=20&page="+this.page)
            .then((response) => {
              console.log(response);
              this.moreProducts = this.moreProducts.concat(response.data); 
  
              this.isLoading=false;
              
              if(event != null){
                event.target.complete();
                if(response.data.length<5){
                  event.target.disabled = true;
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
    }

    loadCategory(){
          const WooCommerce = new WooCommerceRestApi({
            url: environment.siteUrl,
            consumerKey: environment.consumerKey,
            consumerSecret: environment.consumerSecret,
            version: 'wc/v3',
            queryStringAuth: true // Force Basic Authentication as query string true and using under HTTPS
          });
            WooCommerce.get("products/categories?per_page=9")
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });

    }

    countItems(){
      this.storage.ready().then(() => {
        this.storage.get("cart").then(data=>{
          console.log(data);
          this.cartItems = data;
  
          this.totalCartItems = 0;
  
          if(this.cartItems.length>0){
            this.cartItems.forEach((item, index)=>{   
              this.totalCartItems += item.qty;
            });
          }
  
  
        });
  
      });
     }


}
