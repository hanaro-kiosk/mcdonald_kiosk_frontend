/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
} from 'react';
import { Cart } from './cart';

type CartContextProp = {
    cart: Cart[];
    totalPrice: number;
    totalCount: number;
    removeItem: (itemId: number) => void;
    removeAllItem: () => void;
    saveItem: ({
        id,
        menuIdx,
        menuName,
        menuImg,
        menuPrice,
        menuCalory,
        totalCnt,
    }: Cart) => void;
};

const CartContext = createContext<CartContextProp>({
    cart: [],
    totalPrice: 0,
    totalCount: 0,
    removeItem: () => {},
    removeAllItem: () => {},
    saveItem: () => {},
});

type Action =
    | {
          type: 'set';
          payload: Cart[];
      }
    | {
          type: 'saveItem';
          payload: Cart;
      }
    | { type: 'removeItem'; payload: number }
    | { type: 'removeAllItem'; payload: null };

const reducer = (cart: Cart[], { type, payload }: Action): Cart[] => {
    let newer: Cart[];
    switch (type) {
        case 'set':
            newer = payload;
            break;
        case 'saveItem':
            {
                const { menuIdx, menuName, menuImg, menuPrice, menuCalory } =
                    payload;
                const foundItem = cart.findIndex(
                    (item: Cart) => item.menuIdx === menuIdx
                );
                if (foundItem === -1) {
                    const maxId = Math.max(
                        ...cart.map((item: Cart) => item.id),
                        0
                    );
                    newer = [
                        ...cart,
                        {
                            id: maxId + 1,
                            menuIdx,
                            menuName,
                            menuImg,
                            menuPrice,
                            menuCalory,
                            totalCnt: 1,
                        },
                    ];
                } else {
                    const updatedCart = [...cart];
                    updatedCart[foundItem].totalCnt += 1;
                    newer = updatedCart;
                }
            }
            break;
        case 'removeItem':
            newer = [...cart.filter((item) => item.id !== payload)];
            break;
        case 'removeAllItem':
            newer = [];
            break;
        default:
            return cart;
    }
    return newer;
};

export const CartProvider = ({ children }: PropsWithChildren) => {
    const [cart, dispatch] = useReducer(reducer, []);

    const totalPrice = useMemo(
        () =>
            cart.reduce(
                (sum: number, item: Cart) =>
                    sum + item.menuPrice * item.totalCnt,
                0
            ),
        [cart]
    );
    const totalCount = useMemo(
        () => cart.reduce((sum: number, item: Cart) => sum + item.totalCnt, 0),
        [cart]
    );

    const removeItem = useCallback((itemId: number) => {
        dispatch({
            type: 'removeItem',
            payload: itemId,
        });
    }, []);

    const removeAllItem = useCallback(() => {
        dispatch({
            type: 'removeAllItem',
            payload: null,
        });
    }, []);

    const saveItem = useCallback(
        ({
            id,
            menuIdx,
            menuName,
            menuImg,
            menuPrice,
            menuCalory,
            totalCnt,
        }: Cart) => {
            dispatch({
                type: 'saveItem',
                payload: {
                    id,
                    menuIdx,
                    menuName,
                    menuImg,
                    menuPrice,
                    menuCalory,
                    totalCnt,
                },
            });
        },
        []
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                totalPrice,
                totalCount,
                removeItem,
                removeAllItem,
                saveItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
