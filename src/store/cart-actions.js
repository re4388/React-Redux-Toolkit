import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

// https://console.firebase.google.com/u/0/project/udmey-react-redux-advance/database/udmey-react-redux-advance-default-rtdb/data/~2Fcart

const fireBase_API =
  "https://udmey-react-redux-advance-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(fireBase_API);
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      return await response.json();
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!"
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!"
      })
    );

    const sendRequest = async () => {
      const response = await fetch(fireBase_API, {
        method: "PUT",
        body: JSON.stringify(cart)
      });
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!"
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!"
        })
      );
    }
  };
};
