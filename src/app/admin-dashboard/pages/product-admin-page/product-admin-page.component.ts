import { Component, effect, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductServiceService } from '../../../products/services/products.service';

@Component({
  selector: 'app-product-admin-page',
  imports: [],
  templateUrl: './product-admin-page.component.html',
})
export class ProductAdminPageComponent { 

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductServiceService)

  productId = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['id'] )
    )
  )

  productResourse = rxResource({
    request: () => ({id: this.productId()}),
    loader: ({request})=> {
    return this.productService.getProductById(request.id);
    }
  })


  redirectEffect = effect(()=> {
    if(this.productResourse.error ()) {
      this.router.navigate(['/admin/products']);
    }
  })

}
