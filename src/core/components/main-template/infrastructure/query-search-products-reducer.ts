import { Category as CategoryModel } from '../../../../features/store/home/domain/category'
import { Product as ProductModel } from '../../../../features/store/product/domain/product'
import { Query } from '../../../../features/store/product/domain/query'

export type Action =
  | { type: 'setKeywords'; payload: string }
  | { type: 'setCategory'; payload: CategoryModel }
  | { type: 'setRangePrice'; payload: number[] }
  | { type: 'setSort'; payload: string }

export interface State {
  keywords: string
  category: CategoryModel
  rangePrice: number[]
  sort: string
  query: Query
  products: ProductModel[]
}

export const initialState: State = {
  keywords: '',
  category: {
    id: '10',
    text: 'Todas las categorias',
    link: '/',
    type: 'material-icons',
    content: 'category',
  },
  rangePrice: [0, 5000],
  sort: 'Del más barato al más caro',
  query: {
    keyWords: '',
    category: 'Todas las categorias',
    minPrice: 0,
    maxPrice: 5000,
    sort: 'Del más barato al más caro',
  },
  products: [],
}

export const querySearchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setKeywords':
      return {
        ...state,
        keywords: action.payload,
        query: {
          keyWords: action.payload,
          category: state.category.text,
          minPrice: state.rangePrice[0],
          maxPrice: state.rangePrice[1],
          sort: state.sort,
        },
      }
    case 'setCategory':
      return {
        ...state,
        category: action.payload,
        query: {
          keyWords: state.keywords,
          category: action.payload.text,
          minPrice: state.rangePrice[0],
          maxPrice: state.rangePrice[1],
          sort: state.sort,
        },
      }
    case 'setRangePrice':
      return {
        ...state,
        rangePrice: action.payload,
        query: {
          keyWords: state.keywords,
          category: state.category.text,
          minPrice: action.payload[0],
          maxPrice: action.payload[1],
          sort: state.sort,
        },
      }
    case 'setSort':
      return {
        ...state,
        sort: action.payload,
        query: {
          keyWords: state.keywords,
          category: state.category.text,
          minPrice: state.rangePrice[0],
          maxPrice: state.rangePrice[1],
          sort: action.payload,
        },
      }
  }
}
