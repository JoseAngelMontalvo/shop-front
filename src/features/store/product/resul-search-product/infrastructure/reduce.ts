export type Action =
  | { type: 'openCategory' }
  | { type: 'openPrice' }
  | { type: 'openShort' }
  | { type: 'closeAll' }

export interface State {
  category: boolean
  price: boolean
  short: boolean
}

export const initialState: State = {
  category: false,
  price: false,
  short: false,
}

export const modalFilterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'openCategory':
      return { category: true, price: false, short: false }
    case 'openPrice':
      return { category: false, price: true, short: false }
    case 'openShort':
      return { category: false, price: false, short: true }
    case 'closeAll':
      return initialState
  }
}
