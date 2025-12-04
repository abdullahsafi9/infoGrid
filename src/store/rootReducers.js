import authReducer from './Reducers/authReducer'
import categoryReducer from './Reducers/categoryReducer'
import productReducer from './Reducers/productReducer'
import sellerReducer from './Reducers/sellerReducer'
import chatReducer from './Reducers/chatReducer'
import OrderReducer from './Reducers/OrderReducer'
import PaymentReducer from './Reducers/PaymentReducer'
import dashboardIndexReducer from './Reducers/dashboardIndexReducer'
import bannerReducer from './Reducers/bannerReducer'
import megamenuReducer from './Reducers/megamenuReducer'
import subcategoryReducer from './Reducers/subcategoryReducer'

const rootReducer = {
    auth: authReducer,
    megamenu: megamenuReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer,
    product: productReducer,
    seller: sellerReducer,
    chat: chatReducer,
    order: OrderReducer,
    payment: PaymentReducer,
    dashboardIndex: dashboardIndexReducer,
    banner : bannerReducer
}
export default rootReducer