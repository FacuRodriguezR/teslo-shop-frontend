import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '@products/services/products.service';
import { ProductCarouselComponent } from "../../../products/components/product-carousel/product-carousel.component";
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent, UpperCasePipe],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent { 

  activatedRout = inject(ActivatedRoute);
  productService = inject(ProductServiceService)

  productIdSlug: string = this.activatedRout.snapshot.params['idSlug'];


  productResource = rxResource({
    request: () => ({ idSlug: this.productIdSlug }),
    loader: ({ request }) =>
      this.productService.getProductByIdSlug(request.idSlug),
  });
}
