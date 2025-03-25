import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTableComponent } from '@products/components/product-table/product-table.component';
import { ProductServiceService } from '@products/services/products.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, PaginationComponent],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  
productsService = inject(ProductServiceService);
paginationService = inject(PaginationService);
// activatedRoute = inject(ActivatedRoute);
productPerPage = signal(10);
// currentPage = toSignal(this.activatedRoute.queryParamMap.pipe(
//   map(params => (params.get('page') ? +params.get('page')! : 1)), map((page) => (isNaN(page) ? 1 : page))
// ),{
//   initialValue: 1
// })

productsResource = rxResource({
  request: () => ({page: this.paginationService.currentPage() - 1, limit: this.productPerPage()}),
  loader: ({request}) => {
    return this.productsService.getProducts({
      offset: request.page * 9,
      limit: request.limit
    });
  }
});
 }
