export interface EeImpression {
  id: number | string,
  name: string,
  list?: string,
  brand?: string,
  category?: string,
  variant?: string,
  price?: string,
  position: number
}

export interface EeProductData {
  id: number | string,
  name: string,
  sku?: string,
  brand?: string,
  category?: string,
  variant?: string,
  price?: string,
  quantity?: number,
  position?: number
}

export interface EePromotionData {
  id: number | string,
  name: string,
  creative?: string,
  position?: string
}

export interface EeActionData {
  id: number | string,
  affiliation?: string,
  revenue?: number,
  tax?: number,
  shipping?: number,
  coupon?: string,
  list?: string,
  step?: number,
  option?: string
}

export interface VueAnalytics {
  addImpression: (eventData: EeImpression) => void,
  addProduct: (eventData: EeProductData) => void,
  addTransaction: (eventData: EeActionData) => void,
  addItem: (eventData: EeProductData) => void,
  addPromo: (eventData: EePromotionData) => void,
  setAction: (action: string, eventData?: EeActionData) => void,
  send: (...args: any) => void,
  set: (fieldName: string, fieldValue: any) => void
}