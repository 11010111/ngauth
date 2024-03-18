import { Component, OnInit, inject } from '@angular/core';
import { ProductData } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  productData?: ProductData;

  ngOnInit(): void {
    this.productService.all().subscribe({
      next: data => {
        this.productData = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
