import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: "Ноутбук",
      price: 75000,
      category: "Электроника",
    },
    {
      id: 2,
      name: "Смартфон",
      price: 45000,
      category: "Электроника",
    },
    {
      id: 3,
      name: "Наушники",
      price: 8000,
      category: "Аксессуары",
    },
  ];

  private nextId = 4;

  findAll(category?: string): Product[] {
    if (category) {
      return this.products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase(),
      );
    }

    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException(`Товар с id ${id} не найден`);
    }

    return product;
  }

  create(createProductDto: CreateProductDto): Product {
    const product: Product = {
      id: this.nextId++,
      name: createProductDto.name,
      price: createProductDto.price,
      category: createProductDto.category,
    };

    this.products.push(product);

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id);

    if (updateProductDto.name !== undefined) {
      product.name = updateProductDto.name;
    }

    if (updateProductDto.price !== undefined) {
      product.price = updateProductDto.price;
    }

    if (updateProductDto.category !== undefined) {
      product.category = updateProductDto.category;
    }

    return product;
  }

  remove(id: number): Product {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new NotFoundException(`Товар с id ${id} не найден`);
    }

    const deletedProduct = this.products[index];

    this.products.splice(index, 1);

    return deletedProduct;
  }
}
