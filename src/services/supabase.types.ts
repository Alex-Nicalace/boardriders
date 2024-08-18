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
          bgImgForDescrUrl: string | null;
          iconUrl: string | null;
          id: number;
          insertedAt: string;
          name: string;
          shortDescription: string | null;
        };
        Insert: {
          bgImgForDescrUrl?: string | null;
          iconUrl?: string | null;
          id?: number;
          insertedAt?: string;
          name: string;
          shortDescription?: string | null;
        };
        Update: {
          bgImgForDescrUrl?: string | null;
          iconUrl?: string | null;
          id?: number;
          insertedAt?: string;
          name?: string;
          shortDescription?: string | null;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          categoryTypeId: number | null;
          displayName: string;
          id: number;
          insertedAt: string;
          name: string;
          order: number | null;
          parentId: number | null;
        };
        Insert: {
          categoryTypeId?: number | null;
          displayName: string;
          id?: number;
          insertedAt?: string;
          name: string;
          order?: number | null;
          parentId?: number | null;
        };
        Update: {
          categoryTypeId?: number | null;
          displayName?: string;
          id?: number;
          insertedAt?: string;
          name?: string;
          order?: number | null;
          parentId?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'categories_categoryTypeId_fkey';
            columns: ['categoryTypeId'];
            isOneToOne: false;
            referencedRelation: 'categoryTypes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'categories_parentId_fkey';
            columns: ['parentId'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          }
        ];
      };
      categoryTypes: {
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
          productId: number;
          userId: string;
        };
        Insert: {
          id?: number;
          insertedAt?: string;
          productId: number;
          userId: string;
        };
        Update: {
          id?: number;
          insertedAt?: string;
          productId?: number;
          userId?: string;
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
            foreignKeyName: 'favorites_userid_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
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
      productAttributes: {
        Row: {
          id: number;
          insertedAt: string;
          name: string;
          productId: number;
          value: string;
        };
        Insert: {
          id?: number;
          insertedAt?: string;
          name: string;
          productId: number;
          value: string;
        };
        Update: {
          id?: number;
          insertedAt?: string;
          name?: string;
          productId?: number;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'productAttributes_productId_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };
      productDescriptionImages: {
        Row: {
          description: string | null;
          id: number;
          imageUrl: string;
          insertedAt: string;
          productId: number;
        };
        Insert: {
          description?: string | null;
          id?: number;
          imageUrl: string;
          insertedAt?: string;
          productId: number;
        };
        Update: {
          description?: string | null;
          id?: number;
          imageUrl?: string;
          insertedAt?: string;
          productId?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'productDescriptionImages_productId_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };
      productImages: {
        Row: {
          colorId: number;
          id: number;
          imageUrl: string;
          insertedAt: string;
          order: number;
          productId: number;
        };
        Insert: {
          colorId: number;
          id?: number;
          imageUrl: string;
          insertedAt?: string;
          order: number;
          productId: number;
        };
        Update: {
          colorId?: number;
          id?: number;
          imageUrl?: string;
          insertedAt?: string;
          order?: number;
          productId?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'productImages_colorId_fkey';
            columns: ['colorId'];
            isOneToOne: false;
            referencedRelation: 'colors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'productImages_productId_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };
      products: {
        Row: {
          brandId: number;
          description: string | null;
          detailedDescription: string | null;
          discount: number | null;
          id: number;
          insertedAt: string;
          manufacturerSKU: string | null;
          name: string;
          oldPrice: number | null;
          price: number;
        };
        Insert: {
          brandId: number;
          description?: string | null;
          detailedDescription?: string | null;
          discount?: number | null;
          id?: number;
          insertedAt?: string;
          manufacturerSKU?: string | null;
          name: string;
          oldPrice?: number | null;
          price: number;
        };
        Update: {
          brandId?: number;
          description?: string | null;
          detailedDescription?: string | null;
          discount?: number | null;
          id?: number;
          insertedAt?: string;
          manufacturerSKU?: string | null;
          name?: string;
          oldPrice?: number | null;
          price?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'products_brandid_fkey';
            columns: ['brandId'];
            isOneToOne: false;
            referencedRelation: 'brands';
            referencedColumns: ['id'];
          }
        ];
      };
      productSales: {
        Row: {
          id: number;
          insertedAt: string;
          productVariantId: number;
          userId: string | null;
        };
        Insert: {
          id?: number;
          insertedAt?: string;
          productVariantId: number;
          userId?: string | null;
        };
        Update: {
          id?: number;
          insertedAt?: string;
          productVariantId?: number;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'productSales_productVarintId_fkey';
            columns: ['productVariantId'];
            isOneToOne: false;
            referencedRelation: 'productVariants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'productSales_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
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
      productsCategories: {
        Row: {
          categoryId: number;
          id: number;
          insertedAt: string;
          productId: number;
        };
        Insert: {
          categoryId: number;
          id?: number;
          insertedAt?: string;
          productId: number;
        };
        Update: {
          categoryId?: number;
          id?: number;
          insertedAt?: string;
          productId?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'productsCategories_categoryId_fkey';
            columns: ['categoryId'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'productsCategories_productId_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };
      productVariants: {
        Row: {
          colorId: number | null;
          id: number;
          insertedAt: string;
          isPrimary: boolean;
          productId: number;
          sizeId: number | null;
          stockInit: number | null;
        };
        Insert: {
          colorId?: number | null;
          id?: number;
          insertedAt?: string;
          isPrimary?: boolean;
          productId: number;
          sizeId?: number | null;
          stockInit?: number | null;
        };
        Update: {
          colorId?: number | null;
          id?: number;
          insertedAt?: string;
          isPrimary?: boolean;
          productId?: number;
          sizeId?: number | null;
          stockInit?: number | null;
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
          productId: number;
          relatedProductId: number | null;
        };
        Insert: {
          id?: number;
          insertedAt?: string;
          productId: number;
          relatedProductId?: number | null;
        };
        Update: {
          id?: number;
          insertedAt?: string;
          productId?: number;
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
            foreignKeyName: 'relatedproducts_relatedproductid_fkey';
            columns: ['relatedProductId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };
      reviews: {
        Row: {
          comment: string | null;
          id: number;
          insertedAt: string;
          productId: number;
          rating: number;
          userId: string;
        };
        Insert: {
          comment?: string | null;
          id?: number;
          insertedAt?: string;
          productId: number;
          rating: number;
          userId: string;
        };
        Update: {
          comment?: string | null;
          id?: number;
          insertedAt?: string;
          productId?: number;
          rating?: number;
          userId?: string;
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
            foreignKeyName: 'reviews_userid_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
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
      productImagesPrimary: {
        Row: {
          colorId: number | null;
          id: number | null;
          imageUrl: string | null;
          insertedAt: string | null;
          order: number | null;
          productId: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'productImages_colorId_fkey';
            columns: ['colorId'];
            isOneToOne: false;
            referencedRelation: 'colors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'productImages_productId_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };
      productSalesCount: {
        Row: {
          productId: number | null;
          saleCount: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'productvariants_productid_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          fullname: string | null;
          id: string | null;
        };
        Insert: {
          fullname?: never;
          id?: string | null;
        };
        Update: {
          fullname?: never;
          id?: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      getAvailableCategories: {
        Args: {
          categoriesList: string[];
        };
        Returns: {
          id: number;
          name: string;
          displayName: string;
          countProduct: number;
        }[];
      };
      getAvailableColors: {
        Args: {
          categoriesList: string[];
        };
        Returns: {
          id: number;
          name: string;
          hexValue: string;
          countProduct: number;
        }[];
      };
      getAvailableSizes: {
        Args: {
          categoriesList: string[];
        };
        Returns: {
          id: number;
          name: string;
          countProduct: number;
        }[];
      };
      getMainMenu: {
        Args: {
          categoryGender: string;
        };
        Returns: {
          id: number;
          name: string;
          displayName: string;
          subMenu:
            | {
                id: number;
                name: string;
                displayName: string;
              }[]
            | null;
          brands: { id: number; name: string }[] | null;
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
