import { Component, inject, input, OnInit } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarouselComponent } from "../../../../products/components/product-carousel/product-carousel.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';

@Component({
  selector: 'app-product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit { 

  ngOnInit(): void {
  this.setFormValue(this.product());
  }
  
  setFormValue(formLike:Partial<Product>){
    this.productForm.reset(this.product() as any)
    this.productForm.patchValue(formLike as any)
    this.productForm.patchValue({tags: formLike.tags?.join(',')});
  }

  product = input.required<Product>();

  fb = inject(FormBuilder);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: ['0', [Validators.required, Validators.min(0)]],
    stock: ['0', [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: ['men',[Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  })

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  onSizeClicked(size: string){
    const currentSizes = this.productForm.value.sizes ?? [];

    if(currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size),1);
    }else{
      currentSizes.push(size)
    }

    this.productForm.patchValue({sizes: currentSizes})
  }

  onSubmit(){
    console.log(this.productForm.value)
  }
}
