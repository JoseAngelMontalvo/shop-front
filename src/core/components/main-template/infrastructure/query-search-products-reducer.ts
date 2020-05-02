import { Category as CategoryModel } from '../../../../features/store/home/domain/category'

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
}

export const querySearchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setKeywords':
      return {
        ...state,
        keywords: action.payload,
      }
    case 'setCategory':
      return {
        ...state,
        category: action.payload,
      }
    case 'setRangePrice':
      return {
        ...state,
        rangePrice: action.payload,
      }
    case 'setSort':
      return {
        ...state,
        sort: action.payload,
      }
  }
}
