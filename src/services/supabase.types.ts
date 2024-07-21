export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      brands: {
        Row: {
          id: number;
          insertedAt: string;
          name: string;
        };
        Insert: {
          id?: number;
          insertedAt?: string;
          name: string;
        };
        Update: {
          id?: number;
          insertedAt?: string;
          name?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: number;
          insertedAt: string;
          name: string;
        };
        Insert: {
          id?: number;
          insertedAt?: string;
          name: string;
        };
        Update: {
          id?: number;
          insertedAt?: string;
          name?: string;
        };
        Relationships: [];
      };
      colors: {
        Row: {
          hexValue: string;
          id: number;
          insertedAt: string;
          name: string;
        };
        Insert: {
          hexValue: string;
          id?: number;
          insertedAt?: string;
          name: string;
        };
        Update: {
          hexValue?: string;
          id?: number;
          insertedAt?: string;
          name?: string;
        };
        Relationships: [];
      };
      favorites: {
        Row: {
          id: number;
          insertedAt: string;
          productId: number | null;
          userId: string | null;
        };
        Insert: {
          id?: number;
          insertedAt?: string;
          productId?: number | null;
          userId?: string | null;
        };
        Update: {
          id?: number;
          insertedAt?: string;
          productId?: number | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'favorites_productid_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'favorites_productid_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'topSellingProducts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'favorites_userid_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      products: {
        Row: {
          brandId: number | null;
          categoryId: number | null;
          description: string | null;
          detailedDescription: string | null;
          discount: number | null;
          id: number;
          imgMainUrl: string | null;
          imgSecondUrl: string | null;
          insertedAt: string;
          manufacturerSKU: string | null;
          name: string;
          oldPrice: number | null;
          price: number;
          rating: number | null;
          reviewCount: number | null;
          stock: number;
        };
        Insert: {
          brandId?: number | null;
          categoryId?: number | null;
          description?: string | null;
          detailedDescription?: string | null;
          discount?: number | null;
          id?: number;
          imgMainUrl?: string | null;
          imgSecondUrl?: string | null;
          insertedAt?: string;
          manufacturerSKU?: string | null;
          name: string;
          oldPrice?: number | null;
          price: number;
          rating?: number | null;
          reviewCount?: number | null;
          stock: number;
        };
        Update: {
          brandId?: number | null;
          categoryId?: number | null;
          description?: string | null;
          detailedDescription?: string | null;
          discount?: number | null;
          id?: number;
          imgMainUrl?: string | null;
          imgSecondUrl?: string | null;
          insertedAt?: string;
          manufacturerSKU?: string | null;
          name?: string;
          oldPrice?: number | null;
          price?: number;
          rating?: number | null;
          reviewCount?: number | null;
          stock?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'products_brandid_fkey';
            columns: ['brandId'];
            isOneToOne: false;
            referencedRelation: 'brands';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_categoryid_fkey';
            columns: ['categoryId'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          }
        ];
      };
      productSales: {
        Row: {
          id: number;
          insertedAt: string;
          productId: number;
          userId: string | null;
        };
        Insert: {
          id?: number;
          insertedAt?: string;
          productId: number;
          userId?: string | null;
        };
        Update: {
          id?: number;
          insertedAt?: string;
          productId?: number;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'productSales_productId_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'productSales_productId_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'topSellingProducts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'productSales_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      productVariants: {
        Row: {
          colorId: number | null;
          id: number;
          insertedAt: string;
          productId: number | null;
          sizeId: number | null;
        };
        Insert: {
          colorId?: number | null;
          id?: number;
          insertedAt?: string;
          productId?: number | null;
          sizeId?: number | null;
        };
        Update: {
          colorId?: number | null;
          id?: number;
          insertedAt?: string;
          productId?: number | null;
          sizeId?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'productvariants_colorid_fkey';
            columns: ['colorId'];
            isOneToOne: false;
            referencedRelation: 'colors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'productvariants_productid_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'productvariants_productid_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'topSellingProducts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'productvariants_sizeid_fkey';
            columns: ['sizeId'];
            isOneToOne: false;
            referencedRelation: 'sizes';
            referencedColumns: ['id'];
          }
        ];
      };
      relatedProducts: {
        Row: {
          id: number;
          insertedAt: string;
          productId: number | null;
          relatedProductId: number | null;
        };
        Insert: {
          id?: number;
          insertedAt?: string;
          productId?: number | null;
          relatedProductId?: number | null;
        };
        Update: {
          id?: number;
          insertedAt?: string;
          productId?: number | null;
          relatedProductId?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'relatedproducts_productid_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relatedproducts_productid_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'topSellingProducts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relatedproducts_relatedproductid_fkey';
            columns: ['relatedProductId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'relatedproducts_relatedproductid_fkey';
            columns: ['relatedProductId'];
            isOneToOne: false;
            referencedRelation: 'topSellingProducts';
            referencedColumns: ['id'];
          }
        ];
      };
      reviews: {
        Row: {
          comment: string | null;
          id: number;
          insertedAt: string;
          productId: number | null;
          rating: number;
          userId: string | null;
        };
        Insert: {
          comment?: string | null;
          id?: number;
          insertedAt?: string;
          productId?: number | null;
          rating: number;
          userId?: string | null;
        };
        Update: {
          comment?: string | null;
          id?: number;
          insertedAt?: string;
          productId?: number | null;
          rating?: number;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_productid_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_productid_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'topSellingProducts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_userid_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      sizes: {
        Row: {
          id: number;
          insertedAt: string;
          name: string;
        };
        Insert: {
          id?: number;
          insertedAt?: string;
          name: string;
        };
        Update: {
          id?: number;
          insertedAt?: string;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      topSellingProducts: {
        Row: {
          brandId: number | null;
          categoryId: number | null;
          description: string | null;
          detailedDescription: string | null;
          discount: number | null;
          id: number;
          imgMainUrl: string | null;
          imgSecondUrl: string | null;
          insertedAt: string;
          manufacturerSKU: string | null;
          name: string;
          oldPrice: number | null;
          price: number;
          rating: number | null;
          reviewCount: number | null;
          stock: number;
          saleCount: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_brandid_fkey';
            columns: ['brandId'];
            isOneToOne: false;
            referencedRelation: 'brands';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_categoryid_fkey';
            columns: ['categoryId'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Functions: {
      getTopSellingProducts: {
        Args: {
          limitValue?: number;
        };
        Returns: {
          id: number;
          insertedAt: string;
          name: string;
          description: string;
          price: number;
          oldPrice: number;
          imgMainUrl: string;
          imgSecondUrl: string;
          categoryId: number;
          brandId: number;
          stock: number;
          rating: number;
          reviewCount: number;
          discount: number;
          detailedDescription: string;
          manufacturerSKU: string;
          saleCount: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
