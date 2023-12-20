
import '../components/cartSideBar.scss'
const CartSideBar = ({ cartItems, onClose, removeFromCart }: any) => {

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Your Cart</h3>
                <button onClick={onClose}>Close</button>
            </div>
            <div className="sidebar-content">
                {cartItems.map((item: any, index: any) => (
                    <div key={index} className="cart-item">
                        <span>{item}</span>
                        <button onClick={() => removeFromCart(index)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CartSideBar;
